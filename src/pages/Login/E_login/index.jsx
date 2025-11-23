import InputField from "../../../components/form/InputField";
import Button from "../../../components/button/Button_LR";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../../assets/images/logo.png"; // path โลโก้
import useForm from "../../../hooks/useForm";

export default function EmployeeLogin() {
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit, loading, error } = useForm(
    {
      username: "",
      password: "",
    },
    async (formData) => {
      // เรียก API สำหรับ Employee login
      const res = await fetch("http://localhost:5000/api/employee/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      // เก็บ token ไว้ localStorage
      localStorage.setItem("employeeToken", data.token);

      alert("Login success! Welcome " + data.employee.username);
      navigate("/employee-dashboard"); // ไปหน้า Employee Dashboard

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
          <h2 className="text-2xl font-bold text-white text-center mb-6">Employee Login</h2>

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
            <Button disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <p className="text-white/60 text-sm text-center mt-4">
            Are you a customer?{" "}
            <Link to="/login" className="text-[#3BACE2] hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
