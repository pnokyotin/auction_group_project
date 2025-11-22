export default function Button_LR({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 mt-2 bg-gradient-to-r from-[#B936EE] via-[#3BACE2] to-[#FF56F6] text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#FF56F6] transition"
    >
      {children}
    </button>
  );
}
