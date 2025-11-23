// src/layouts/MainLayout.jsx
import Navbar from "../../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1344px] mt-8">
        {children}
      </main>
    </div>
  );
}
