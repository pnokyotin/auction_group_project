export default function Button({ children, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full py-2 rounded-md text-white font-bold ${
        disabled ? "bg-gray-400" : "bg-[#3BACE2] hover:bg-[#36a0d5]"
      }`}
    >
      {children}
    </button>
  );
}
