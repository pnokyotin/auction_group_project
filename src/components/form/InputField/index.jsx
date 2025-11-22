export default function InputField({ label, type = "text", placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-white/80 text-sm mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-white/50 backdrop-blur-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#3BACE2]"
      />
    </div>
  );
}
