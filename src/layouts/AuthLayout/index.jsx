// src/layouts/AuthLayout.jsx
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center animated-gradient">
      <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/20 flex w-full max-w-4xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}
