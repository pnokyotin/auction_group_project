// src/pages/EmployeeDashboard/index.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import useProducts from "../../hooks/UseProducts";
import useWarehouses from "../../hooks/useWarehouses";
import useRooms from "../../hooks/useRooms";

import EmployeeLayout from "../../layouts/EmployeeLayout";
import ProductFilters from "../../components/ProductFilters";
import ProductTable from "../../components/ProductTable";

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

  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  const handleApprove = async (productId) => {
    try {
      const token = localStorage.getItem("employeeToken");
      if (!token) throw new Error("Not authenticated");

      const res = await fetch(`http://localhost:5000/api/products/approve/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ approval: 1 })
      });

      if (!res.ok) {
        console.error("Server response:", await res.text());
        return;
      }

      const data = await res.json();
      if (data.success) {
        setLocalProducts((prev) =>
          prev.map((p) =>
            p.product_id === productId ? { ...p, approval: 1 } : p
          )
        );
      } else {
        console.error("Approve failed:", data.message);
      }
    } catch (err) {
      console.error("Error approving product:", err);
    }
  };

  // Filter logic
  const filteredProducts = localProducts.filter((product) => {
    const warehouseName =
      warehouses.find((w) => w.warehouse_id === product.warehouse_id)?.warehouse_name ||
      "No warehouse";

    const roomName =
      rooms.find((r) => r.room_id === product.room_id)?.room_name ||
      "None";

    return (
      product.product_detail.toLowerCase().includes(search.toLowerCase()) &&
      (filterWarehouse === "" || warehouseName === filterWarehouse) &&
      (filterRoom === "" || roomName === filterRoom) &&
      (filterApproval === "" || product.approval == filterApproval)
    );
  });

  const warehouseOptions = ["No warehouse", ...warehouses.map((w) => w.warehouse_name)];
  const roomOptions = ["None", ...rooms.map((r) => r.room_name)];

  return (
    <EmployeeLayout title="Employee Dashboard">
      {/* ========= Page Header ========= */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Employee Dashboard</h1>
        <p className="text-white/60 mt-1">Manage rooms, products and approvals</p>
      </div>

      {/* ========= Action Buttons ========= */}
      <div className="bg-white/10 p-4 w-full rounded-lg mb-6 flex gap-3 backdrop-blur-md">
        <button
          onClick={() => navigate("/manage-room")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Manage Room
        </button>

        <button
          onClick={() => navigate("/manage-product")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Manage Product
        </button>
      </div>

      {/* ========= Filter Section ========= */}
      <div className="bg-white/10 px-2 rounded-lg mb-2 backdrop-blur-md">
        <ProductFilters
          search={search} setSearch={setSearch}
          filterWarehouse={filterWarehouse} setFilterWarehouse={setFilterWarehouse}
          filterRoom={filterRoom} setFilterRoom={setFilterRoom}
          filterApproval={filterApproval} setFilterApproval={setFilterApproval}
          warehouseOptions={warehouseOptions}
          roomOptions={roomOptions}
        />
      </div>

      {/* ========= Table Section ========= */}
      <div className="bg-white/5 p-4 rounded-lg backdrop-blur-md">
        {!loading && !error && filteredProducts.length > 0 && (
          <ProductTable
            products={filteredProducts}
            warehouses={warehouses}
            rooms={rooms}
            onApprove={handleApprove} // ส่งฟังก์ชัน handleApprove
          />
        )}

        {loading && <p className="text-white">Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && filteredProducts.length === 0 && (
          <p className="text-white">No products found.</p>
        )}
      </div>

      {/* ========= Logout ========= */}
      <div className="mt-6">
        <button
          onClick={() => {
            localStorage.removeItem("employeeToken");
            navigate("/employee-login");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </EmployeeLayout>
  );
}
