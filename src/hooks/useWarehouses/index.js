// src/hooks/useWarehouses.js
import { useState, useEffect } from "react";

export default function useWarehouses() {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/warehouses")
      .then((res) => res.json())
      .then((data) => setWarehouses(data.warehouses || []))
      .catch((err) => console.error(err));
  }, []);

  return warehouses;
}
