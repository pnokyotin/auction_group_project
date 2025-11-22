export default function InputField({ label, name, type = "text", value, onChange, placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-white mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-md text-black"
      />
    </div>
  );
}
