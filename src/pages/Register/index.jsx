// src/pages/Register/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/form/InputField";
import Button from "../../components/button/Button_LR";
import AuthLayout from "../../layouts/AuthLayout";

export default function Register() {
  const navigate = useNavigate();

  // state ของ form
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "customer", // default เป็น customer
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "เกิดข้อผิดพลาด");
      } else {
        alert(`Register success! Your ID: ${data.user.user_id}`);
        navigate("/login"); // ไปหน้า login
      }
    } catch (err) {
      console.error(err);
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
    }

    setLoading(false);
  };

  return (
    <AuthLayout>
      <div className="hidden md:flex w-1/2 bg-white/20 items-center justify-center">
        {/* โลโก้ */}
        <img
          src="/logo.png"
          alt="Logo"
          className="w-3/4 h-auto object-contain"
        />
      </div>

      <div className="w-full md:w-1/2 p-8 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputField
            label="Username"
            name="username"
            value={values.username}
            onChange={handleChange}
            placeholder="Your username"
            required
          />
          <InputField
            label="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="********"
            required
          />
          <InputField
            label="First Name"
            name="first_name"
            value={values.first_name}
            onChange={handleChange}
            placeholder="John"
            required
          />
          <InputField
            label="Last Name"
            name="last_name"
            value={values.last_name}
            onChange={handleChange}
            placeholder="Doe"
            required
          />

          {/* Role selector */}
          <div>
            <label className="text-white mb-1 block">Role</label>
            <select
              name="role"
              value={values.role}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="customer">Customer</option>
              <option value="supplier">Supplier</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          <Button disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <p className="text-white/60 text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#3BACE2] hover:underline">
            Login
          </a>
        </p>
      </div>
    </AuthLayout>
  );
}
