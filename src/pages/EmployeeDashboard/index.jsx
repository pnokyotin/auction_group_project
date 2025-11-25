// src/pages/EmployeeDashboard/index.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import useProducts from "../../hooks/UseProducts";
import useWarehouses from "../../hooks/useWarehouses";
import useRooms from "../../hooks/useRooms";

import EmployeeLayout from "../../layouts/EmployeeLayout";
import ProductFilters from "../../components/ProductFilters";
import ProductTable from "../../components/ProductTable";
import Modal from "../../components/Modal";

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  const warehouses = useWarehouses();
  const rooms = useRooms();

  const [localProducts, setLocalProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filterWarehouse, setFilterWarehouse] = useState("");
  const [filterRoom, setFilterRoom] = useState("");
  const [filterApproval, setFilterApproval] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => setLocalProducts(products), [products]);

  // Approve
  const handleApprove = async (productId) => {
    try {
      const token = localStorage.getItem("employeeToken");
      const res = await fetch(`http://localhost:5000/api/products/approve/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ approval: 1 })
      });

      if (!res.ok) throw new Error("Approve failed");

      const data = await res.json();
      if (data.success) {
        // update localProducts ทันที
        setLocalProducts(prev =>
          prev.map(p =>
            p.product_id === productId ? { ...p, approval: 1 } : p
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete
  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("employeeToken");
      const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Delete failed");

      const data = await res.json();
      if (data.success) setLocalProducts(prev => prev.filter(p => p.product_id !== productId));
    } catch (err) {
      console.error(err);
    }
  };

  // Filter
  const filteredProducts = localProducts.filter(product => {
    const warehouseName = warehouses.find(w => w.warehouse_id === product.warehouse_id)?.warehouse_name || "No warehouse";
    const roomName = rooms.find(r => r.room_id === product.room_id)?.room_name || "None";
    return (
      product.product_detail.toLowerCase().includes(search.toLowerCase()) &&
      (filterWarehouse === "" || warehouseName === filterWarehouse) &&
      (filterRoom === "" || roomName === filterRoom) &&
      (filterApproval === "" || product.approval == filterApproval)
    );
  });

  return (
    <EmployeeLayout title="Employee Dashboard">
      <div className="mb-6">
        <h1 className="text-2xl text-white font-bold">Employee Dashboard</h1>
      </div>

      <div className="bg-white/10 p-4 rounded-lg mb-6 flex gap-3">
        <button onClick={() => navigate("/manage-room")} className="bg-blue-500 text-white px-4 py-2 rounded">Manage Room</button>
        <button onClick={() => navigate("/manage-product")} className="bg-green-500 text-white px-4 py-2 rounded">Manage Product</button>
      </div>

      <div className="bg-white/10 p-2 rounded-lg mb-2">
        <ProductFilters
          search={search} setSearch={setSearch}
          filterWarehouse={filterWarehouse} setFilterWarehouse={setFilterWarehouse}
          filterRoom={filterRoom} setFilterRoom={setFilterRoom}
          filterApproval={filterApproval} setFilterApproval={setFilterApproval}
          warehouseOptions={["No warehouse", ...warehouses.map(w => w.warehouse_name)]}
          roomOptions={["None", ...rooms.map(r => r.room_name)]}
        />
      </div>

      <div className="bg-white/5 p-4 rounded-lg">
        {!loading && !error && filteredProducts.length > 0 && (
          <ProductTable
            products={filteredProducts}
            warehouses={warehouses}
            rooms={rooms}
            onApprove={handleApprove}
            onDelete={handleDelete}
            onRowClick={(product) => {
              setSelectedProduct(product);
              setShowModal(true);
            }}
          />
        )}
        {loading && <p className="text-white">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && filteredProducts.length === 0 && <p className="text-white">No products found.</p>}
      </div>

      {/* ========= Logout ========= */}
      <div className="mt-6">
        <button
          onClick={() => {
            localStorage.removeItem("employeeToken");
            navigate("/login");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

    {/* ========= Modal ========= */}
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      {selectedProduct && (
        <div>
          {selectedProduct.image_url && (
            <img
              src={`http://localhost:5000/${selectedProduct.image_url}`}
              alt={selectedProduct.product_detail}
              className="w-full h-64 object-cover rounded mb-4"
            />
          )}
          <h2 className="text-xl font-bold mb-2">{selectedProduct.product_name}</h2> {/* <-- เพิ่ม */}
          <p><strong>Product Detail:</strong> ${selectedProduct.product_detail}</p>
          <p><strong>Tracking Number:</strong> {selectedProduct.tracking_number || "N/A"}</p>
          <p><strong>Start Price:</strong> ${selectedProduct.starting_price}</p>
          <p><strong>Bid Increment:</strong> ${selectedProduct.bid_increment}</p>
          <p><strong>Room:</strong> {rooms.find(r => r.room_id === selectedProduct.room_id)?.room_name || "None"}</p>
          <p><strong>Warehouse:</strong> {warehouses.find(w => w.warehouse_id === selectedProduct.warehouse_id)?.warehouse_name || "No warehouse"}</p>
          <p><strong>Note:</strong> {selectedProduct.note || "N/A"}</p>

          {selectedProduct.approval === 0 && (
            <button
              onClick={async () => {
                try {
                  const token = localStorage.getItem("employeeToken");
                  const res = await fetch(`http://localhost:5000/api/products/approve/${selectedProduct.product_id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                    body: JSON.stringify({ approval: 1 })
                  });
                  if (!res.ok) throw new Error("Approve failed");
                  const data = await res.json();
                  if (data.success) {
                    // อัปเดต state ของ table
                    setLocalProducts(prev =>
                      prev.map(p => p.product_id === selectedProduct.product_id ? { ...p, approval: 1 } : p)
                    );
                    // อัปเดต selectedProduct ใน modal
                    setSelectedProduct(prev => ({ ...prev, approval: 1 }));
                  }
                } catch (err) {
                  console.error(err);
                  alert("Approve failed");
                }
              }}
              className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Approve
            </button>
          )}
        </div>
      )}
    </Modal>

    </EmployeeLayout>
  );
}
