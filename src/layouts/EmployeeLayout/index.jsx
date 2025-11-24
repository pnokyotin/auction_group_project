// src/layouts/EmployeeLayout.jsx
import React from "react";

export default function EmployeeLayout({ children, title }) {
  return (
    <div className="min-h-screen w-full animated-gradient flex flex-col items-center p-0">
      <div className="bg-white/10 backdrop-blur-md shadow-lg w-full h-full p-6">
        {title && <h1 className="text-4xl font-extrabold text-white mb-4 text-center">{title}</h1>}
        {children}
      </div>
    </div>
  );
}
