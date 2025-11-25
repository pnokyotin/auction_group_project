// src/pages/InsertProduct/index.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "../../layouts/FormLayout";

export default function InsertProduct() {
  const navigate = useNavigate();

  // state ของ form (เอา warehouse_id ออก)
  const [form, setForm] = useState({
    product_detail: "",
    starting_price: "",
    bid_increment: "",
    approval: 0,
    note: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("กรุณาเลือกไฟล์รูปสินค้า");

    // ดึง customer_id จาก localStorage
    const user_id = localStorage.getItem("user_id");
    if (!user_id) return alert("ไม่พบ customer_id กรุณา login ใหม่");

    setLoading(true);
    try {
      const data = new FormData();

      // ใส่ field จาก form
      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      // ใส่รูปสินค้า
      data.append("image", imageFile);

      // ส่ง user_id ให้ backend
      data.append("user_id", user_id);

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        alert("เพิ่มสินค้าเรียบร้อย!");
        setForm({
          product_detail: "",
          starting_price: "",
          bid_increment: "",
          approval: 0,
          note: "",
        });
        setImageFile(null);

        navigate("/main"); // เพิ่มสินค้าเรียบร้อย → กลับหน้า main
      } else {
        const resData = await res.json();
        alert("เกิดข้อผิดพลาด: " + resData.message);
      }
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
    }

    setLoading(false);
  };

  return (
    <FormLayout title="เพิ่มสินค้าใหม่">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="product_detail"
          value={form.product_detail}
          onChange={handleChange}
          placeholder="รายละเอียดสินค้า"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="starting_price"
          value={form.starting_price}
          onChange={handleChange}
          placeholder="ราคาตั้งต้น"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="bid_increment"
          value={form.bid_increment}
          onChange={handleChange}
          placeholder="เพิ่มราคาประมูล"
          className="w-full border p-2 rounded"
          required
        />

        <input type="hidden" name="approval" value={form.approval} />

        <input
          type="text"
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="หมายเหตุ"
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? "กำลังเพิ่ม..." : "เพิ่มสินค้า"}
        </button>
      </form>
    </FormLayout>
  );
}
