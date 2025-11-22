import { useState, useEffect, useRef } from "react";

export default function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // ปิด dropdown เมื่อคลิกนอก
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = () => setOpen(!open);

  return { open, toggle, ref, setOpen };
}
