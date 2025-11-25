// src/components/ProductTable.jsx
import ApproveButton from "../button/ApproveButton";

export default function ProductTable({ products, warehouses, rooms, onApprove }) {
  return (
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
          {products.map((product) => {
            const warehouseName =
              warehouses.find((w) => w.warehouse_id === product.warehouse_id)?.warehouse_name ||
              "No warehouse";

            const roomName =
              rooms.find((r) => r.room_id === product.room_id)?.room_name || "None";

            return (
              <tr
                key={product.product_id}
                className="text-white border-b border-white/20 hover:bg-white/10 transition"
              >
                <td className="px-4 py-2">{product.product_detail}</td>
                <td className="px-4 py-2">${product.starting_price}</td>
                <td className="px-4 py-2">${product.bid_increment}</td>
                <td className="px-4 py-2">{roomName}</td>
                <td className="px-4 py-2">{warehouseName}</td>

                <td className="px-4 py-2">
                  {product.approval == 1 ? (
                    <span>Approved</span>
                  ) : (
                    <ApproveButton
                      productId={product.product_id}
                      onApproved={() => onApprove(product.product_id)}
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
