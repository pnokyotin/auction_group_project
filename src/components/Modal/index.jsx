// src/components/Modal/index.jsx
import React, { useEffect } from "react";

export default function Modal({ show, onClose, children }) {
  // ป้องกัน scroll ของ background
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // cleanup
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 w-full h-screen bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-10 rounded-lg p-6 w-full max-w-md relative max-h-[80vh] overflow-y-auto">
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 font-bold text-lg"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

