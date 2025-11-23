// src/components/form/search/search_result.jsx
export default function SearchResults({ filteredProducts }) {
  if (!filteredProducts || filteredProducts.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mt-2 bg-white/10 backdrop-blur-md rounded-lg p-4 flex flex-col gap-2">
      {filteredProducts.map((p) => (
        <div
          key={p.product_id}
          className="flex items-center gap-4 p-2 hover:bg-white/20 rounded transition cursor-pointer"
        >
          <img
            src={p.image_url ? `http://localhost:5000/${p.image_url}` : "https://via.placeholder.com/50"}
            alt={p.product_detail}
            className="w-12 h-12 object-cover rounded"
          />
          <div>
            <p className="text-white font-semibold">{p.product_detail}</p>
            <p className="text-white/80 text-sm">ราคาเริ่มต้น: {p.starting_price} บาท</p>
          </div>
        </div>
      ))}
    </div>
  );
}
