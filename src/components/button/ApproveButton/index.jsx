// src/components/button/ApproveButton.jsx
import useApproveProduct from "../../../hooks/useApproveProduct";

export default function ApproveButton({ productId, onApproved }) {
  const { approveProduct, loading, error } = useApproveProduct();

  const handleClick = async () => {
    try {
      await approveProduct(productId);
      onApproved(); // อัปเดต state ใน parent ให้เป็น approved
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded text-sm transition"
      >
        {loading ? "Approving..." : "Approve"}
      </button>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
}
