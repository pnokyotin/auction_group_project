import { useNavigate } from "react-router-dom";

export default function GoToInsertButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/insert-product");
  };

  return (
    <button
      onClick={handleClick}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      เพิ่มสินค้าใหม่
    </button>
  );
}
