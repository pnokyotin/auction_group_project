// src/layouts/FormLayout.jsx
export default function FormLayout({ children, title }) {
  return (
    <div className="min-h-screen flex items-center justify-center animated-gradient p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
