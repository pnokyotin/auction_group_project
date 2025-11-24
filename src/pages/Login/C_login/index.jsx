import InputField from "../../../components/form/InputField";
import Button from "../../../components/button/Button_LR";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../../assets/images/logo.png";
import useForm from "../../../hooks/useForm";
import AuthLayout from "../../../layouts/AuthLayout";


{/* node : เดี้ยวต้อง รวม customer ,employees และ admin อยู่ใน table เดียวกัน */}
export default function Login() {
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit, loading, error } = useForm(
    {
      username: "",
      password: "",
    },
    async (formData) => {
      const res = await fetch("http://localhost:5000/api/customer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      localStorage.setItem("token", data.token);

      alert("Login success! Welcome " + data.user.username);
      navigate("/main");
    }
  );

  return (
    <AuthLayout>
      {/* ฝั่งซ้าย: Logo */}
      <div className="hidden md:flex w-1/2 bg-white/20 items-center justify-center">
        <img src={logoImage} alt="Logo" className="w-3/4 h-auto object-contain" />
      </div>

      {/* ฝั่งขวา: Form */}
      <div className="w-full md:w-1/2 p-8 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputField
            label="Username"
            name="username"
            value={values.username}
            onChange={handleChange}
            placeholder="Your username"
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="********"
          />
          <Button disabled={loading}>{loading ? "Logging in..." : "Login"}</Button>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <p className="text-white/60 text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#FF56F6] hover:underline">
            Register
          </Link>
        </p>
        <p className="text-white/60 text-sm text-center mt-2">
          Are you an employee?{" "}
          <Link to="/employee-login" className="text-[#3BACE2] hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
