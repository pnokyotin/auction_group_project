import { useState } from "react";

export default function InsertProduct() {
  const [form, setForm] = useState({
    product_detail: "",
    starting_price: "",
    bid_increment: "",
    approval: 0, // default เป็น 0
    note: "",
    warehouse_id: "",
    supplier_id: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("กรุณาเลือกไฟล์รูปสินค้า");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();

      // แปลง empty string เป็น null
      Object.keys(form).forEach((key) => {
        data.append(key, form[key] === "" ? null : form[key]);
      });

      data.append("image", imageFile);

      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("เพิ่มสินค้าเรียบร้อย!");
        setForm({
          product_detail: "",
          starting_price: "",
          bid_increment: "",
          approval: 0, // reset เป็น 0
          note: "",
          warehouse_id: "",
          supplier_id: "",
        });
        setImageFile(null);
      } else {
        const resData = await response.json();
        alert("เกิดข้อผิดพลาด: " + resData.message);
      }
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-40 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">เพิ่มสินค้าใหม่</h2>
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
        {/* ซ่อน approval input เพราะ default เป็น 0 */}
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
          type="number"
          name="warehouse_id"
          value={form.warehouse_id}
          onChange={handleChange}
          placeholder="Warehouse ID"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="supplier_id"
          value={form.supplier_id}
          onChange={handleChange}
          placeholder="Supplier ID"
          className="w-full border p-2 rounded"
          required
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
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "กำลังเพิ่ม..." : "เพิ่มสินค้า"}
        </button>
      </form>
    </div>
  );
}
