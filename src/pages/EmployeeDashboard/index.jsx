// src/pages/EmployeeDashboard/index.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../../hooks/UseProducts";
import ApproveButton from "../../components/button/ApproveButton";

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();

  const [search, setSearch] = useState("");
  const [filterWarehouse, setFilterWarehouse] = useState("");
  const [filterRoom, setFilterRoom] = useState("");
  const [filterApproval, setFilterApproval] = useState("");
  const [localProducts, setLocalProducts] = useState([]);

  // Sync products จาก hook
  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  const handleLogout = () => {
    localStorage.removeItem("employeeToken");
    navigate("/employee-login");
  };

  // กรองสินค้า
  const filteredProducts = localProducts.filter((product) => {
    return (
      product.product_detail.toLowerCase().includes(search.toLowerCase()) &&
      (filterWarehouse === "" || product.warehouse_id == filterWarehouse) &&
      (filterRoom === "" || (product.room_id || "None") == filterRoom) &&
      (filterApproval === "" || product.approval == filterApproval)
    );
  });

  const warehouseOptions = [...new Set(localProducts.map((p) => p.warehouse_id))];
  const roomOptions = [...new Set(localProducts.map((p) => p.room_id || "None"))];

  return (
    <div className="min-h-screen animated-gradient flex flex-col items-center p-6">
      <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 w-full max-w-6xl text-center">
        <h1 className="text-4xl font-extrabold text-white mb-4">Employee Dashboard</h1>
        <p className="text-white/80 text-lg mb-6">Welcome, employee!</p>

        {/* Search & Filter */}
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
            {warehouseOptions.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
          <select
            value={filterRoom}
            onChange={(e) => setFilterRoom(e.target.value)}
            className="p-2 rounded text-black"
          >
            <option value="">All Rooms</option>
            {roomOptions.map((r) => (
              <option key={r} value={r}>{r}</option>
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

        {loading && <p className="text-white">Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && filteredProducts.length === 0 && (
          <p className="text-white">No products found.</p>
        )}

        {/* ตารางสินค้า */}
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
                {filteredProducts.map((product) => (
                  <tr
                    key={product.product_id}
                    className="text-white border-b border-white/20 hover:bg-white/10 transition"
                  >
                    <td className="px-4 py-2">{product.product_detail}</td>
                    <td className="px-4 py-2">${product.starting_price}</td>
                    <td className="px-4 py-2">${product.bid_increment}</td>
                    <td className="px-4 py-2">{product.room_id || "None"}</td>
                    <td className="px-4 py-2">{product.warehouse_id}</td>
                    <td className="px-4 py-2 flex items-center gap-2">
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
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
