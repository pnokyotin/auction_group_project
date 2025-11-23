// src/hooks/useApproveProduct.js
import { useState } from "react";

export default function useApproveProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const approveProduct = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("employeeToken");
      const res = await fetch(
        `http://localhost:5000/api/products/${productId}/approve`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to approve");
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { approveProduct, loading, error };
}
