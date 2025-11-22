// components/Card.jsx
export default function Card({ title, description, image }) {
  return (
    <div className="flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-60 object-cover"
        />
      )}

      {/* Content */}
      <div className="p-2 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-500 mt-1 text-xs">{description}</p>
        </div>

      </div>
    </div>
  );
}
