// src/layouts/EmployeeLayout.jsx
import React from "react";

export default function EmployeeLayout({ children, title }) {
  return (
    <div className="min-h-screen animated-gradient flex flex-col items-center p-6">
      <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 w-full max-w-6xl text-center">
        {title && <h1 className="text-4xl font-extrabold text-white mb-4">{title}</h1>}
        {children}
      </div>
    </div>
  );
}
