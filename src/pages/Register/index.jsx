import { Link, useNavigate } from "react-router-dom"; // ← เพิ่ม useNavigate
import InputField from "../../components/form/InputField";
import Button from "../../components/button/Button_LR";
import useForm from "../../hooks/useForm";
import logoImage from "../../assets/images/logo.png";

export default function Register() {
  const navigate = useNavigate(); // ← ต้องเพิ่มตรงนี้

  const { values, handleChange, handleSubmit, loading, error } = useForm(
    {
      username: "",
      email: "",
      password: "",
      first_name: "",
      last_name: "",
    },
    async (formData) => {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      alert("Register success! ID: " + data.customer_id);

      navigate("/login"); // ← ใช้ได้เลยหลังเพิ่ม useNavigate()
    }
  );

  return (
    <div className="min-h-screen flex items-center justify-center animated-gradient">
      <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/20 flex w-full max-w-4xl overflow-hidden">
        {/* ฝั่งซ้าย: Logo / ภาพ */}
        <div className="hidden md:flex w-1/2 bg-white/20 items-center justify-center">
          <img src={logoImage} alt="Logo" className="w-3/4 h-auto object-contain" />
        </div>

        {/* ฝั่งขวา: Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Register</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputField label="Username" name="username" value={values.username} onChange={handleChange} placeholder="Your username" />
            <InputField label="Email" name="email" value={values.email} onChange={handleChange} placeholder="you@example.com" />
            <InputField label="Password" type="password" name="password" value={values.password} onChange={handleChange} placeholder="********" />
            <InputField label="First Name" name="first_name" value={values.first_name} onChange={handleChange} placeholder="John" />
            <InputField label="Last Name" name="last_name" value={values.last_name} onChange={handleChange} placeholder="Doe" />
            <Button disabled={loading}>{loading ? "Registering..." : "Register"}</Button>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <p className="text-white/60 text-sm text-center mt-4">
            Already have an account? <Link to="/login" className="text-[#3BACE2] hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
