// src/pages/EmployeeDashboard/index.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../../hooks/UseProducts";
import ApproveButton from "../../components/button/ApproveButton";
import EmployeeLayout from "../../layouts/EmployeeLayout";

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();

  const [search, setSearch] = useState("");
  const [filterWarehouse, setFilterWarehouse] = useState("");
  const [filterRoom, setFilterRoom] = useState("");
  const [filterApproval, setFilterApproval] = useState("");
  const [localProducts, setLocalProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [rooms, setRooms] = useState([]);

  // Fetch warehouses & rooms
  useEffect(() => {
    fetch("http://localhost:5000/api/warehouses")
      .then((res) => res.json())
      .then((data) => setWarehouses(data.warehouses))
      .catch((err) => console.error(err));

    fetch("http://localhost:5000/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data.rooms))
      .catch((err) => console.error(err));
  }, []);

  // Sync products
  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  const handleLogout = () => {
    localStorage.removeItem("employeeToken");
    navigate("/employee-login");
  };

  // Filter products
  const filteredProducts = localProducts.filter((product) => {
    const warehouseName = warehouses.find(w => w.warehouse_id === product.warehouse_id)?.warehouse_name || "No warehouse";
    const roomName = rooms.find(r => r.room_id === product.room_id)?.room_name || "None";

    return (
      product.product_detail.toLowerCase().includes(search.toLowerCase()) &&
      (filterWarehouse === "" || warehouseName === filterWarehouse) &&
      (filterRoom === "" || roomName === filterRoom) &&
      (filterApproval === "" || product.approval == filterApproval)
    );
  });

  // Get filter options
  const warehouseOptions = ["No warehouse", ...warehouses.map(w => w.warehouse_name)];
  const roomOptions = ["None", ...rooms.map(r => r.room_name)];

  return (
    <EmployeeLayout title="Employee Dashboard">
      <p className="text-white/80 text-lg mb-6">Welcome, employee!</p>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded text-black flex-1"
        />
        <select
          value={filterWarehouse}
          onChange={(e) => setFilterWarehouse(e.target.value)}
          className="p-2 rounded text-black"
        >
          <option value="">All Warehouses</option>
          {warehouseOptions.map((w, i) => (
            <option key={i} value={w}>{w}</option>
          ))}
        </select>
        <select
          value={filterRoom}
          onChange={(e) => setFilterRoom(e.target.value)}
          className="p-2 rounded text-black"
        >
          <option value="">All Rooms</option>
          {roomOptions.map((r, i) => (
            <option key={i} value={r}>{r}</option>
          ))}
        </select>
        <select
          value={filterApproval}
          onChange={(e) => setFilterApproval(e.target.value)}
          className="p-2 rounded text-black"
        >
          <option value="">All Approval</option>
          <option value="0">Not Approved</option>
          <option value="1">Approved</option>
        </select>
      </div>

      {/* Manage buttons */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => navigate("/manage-room")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Manage Room
        </button>

        <button
          onClick={() => navigate("/manage-product")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Manage Product
        </button>
      </div>

      {/* Products Table */}
      {!loading && !error && filteredProducts.length > 0 && (
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-white/10 backdrop-blur-md rounded-lg text-left">
            <thead>
              <tr className="text-white border-b border-white/30">
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Start Price</th>
                <th className="px-4 py-2">Bid Increment</th>
                <th className="px-4 py-2">Room</th>
                <th className="px-4 py-2">Warehouse</th>
                <th className="px-4 py-2">Approval</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const warehouseName = warehouses.find(w => w.warehouse_id === product.warehouse_id)?.warehouse_name || "No warehouse";
                const roomName = rooms.find(r => r.room_id === product.room_id)?.room_name || "None";

                return (
                  <tr key={product.product_id} className="text-white border-b border-white/20 hover:bg-white/10 transition">
                    <td className="px-4 py-2">{product.product_detail}</td>
                    <td className="px-4 py-2">${product.starting_price}</td>
                    <td className="px-4 py-2">${product.bid_increment}</td>
                    <td className="px-4 py-2">{roomName}</td>
                    <td className="px-4 py-2">{warehouseName}</td>
                    <td className="px-4 py-2 flex flex-col gap-1">
                      {product.approval == 1 ? (
                        <span>Approved</span>
                      ) : (
                        <ApproveButton
                          productId={product.product_id}
                          onApproved={() =>
                            setLocalProducts((prev) =>
                              prev.map((p) =>
                                p.product_id === product.product_id
                                  ? { ...p, approval: 1 }
                                  : p
                              )
                            )
                          }
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {loading && <p className="text-white">Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && filteredProducts.length === 0 && (
        <p className="text-white">No products found.</p>
      )}

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
      >
        Logout
      </button>
    </EmployeeLayout>
  );
}
