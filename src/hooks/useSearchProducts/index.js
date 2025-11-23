// src/hooks/useSearchProducts.js
import { useState, useMemo } from "react";

export default function useSearchProducts(products) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return [];
    return products.filter((p) =>
      p.product_detail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);

  return { searchTerm, setSearchTerm, filteredProducts };
}
