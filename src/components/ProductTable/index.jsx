// src/components/ProductTable/index.jsx
export default function ProductTable({ products, warehouses, rooms, onApprove, onDelete, onRowClick }) {
  return (
    <div className="overflow-x-auto overflow-y-auto max-h-[24rem] rounded-lg">
      <table className="min-w-full bg-white/10 backdrop-blur-md rounded-lg text-left">
        <thead>
          <tr className="text-white border-b border-white/30">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Tracking Number</th>
            <th className="px-4 py-2">Start Price</th>
            <th className="px-4 py-2">Bid Increment</th>
            <th className="px-4 py-2">Room</th>
            <th className="px-4 py-2">Warehouse</th>
            <th className="px-4 py-2">Approval</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const warehouseName = warehouses.find(w => w.warehouse_id === product.warehouse_id)?.warehouse_name || "No warehouse";
            const roomName = rooms.find(r => r.room_id === product.room_id)?.room_name || "None";

            return (
              <tr
                key={product.product_id}
                className="text-white border-b border-white/20 hover:bg-white/10 transition cursor-pointer"
                onClick={() => onRowClick(product)}
              >
                <td className="px-4 py-2">{product.product_name}</td>
                <td className="px-4 py-2">{product.product_detail}</td>
                <td className="px-4 py-2">{product.tracking_number || "N/A"}</td>
                <td className="px-4 py-2">${product.starting_price}</td>
                <td className="px-4 py-2">${product.bid_increment}</td>
                <td className="px-4 py-2">{roomName}</td>
                <td className="px-4 py-2">{warehouseName}</td>
                <td className="px-4 py-2">
                  {product.approval === 1 ? (
                    <span className="text-green-400 font-semibold">Approved</span>
                  ) : (
                    <span className="text-red-400 font-semibold">Not Approved</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(product.product_id); }}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

  );
}
