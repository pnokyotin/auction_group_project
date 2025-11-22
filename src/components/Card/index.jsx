export default function Card({ title, description, image }) {
  return (
    <div className="flex-shrink-0 bg-white/10 backdrop-blur-md rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(255,86,246,0.6)] transition-shadow duration-300 overflow-hidden border border-white/20">
      
      {/* Image */}
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-60 object-cover rounded-t-lg"
        />
      )}

      {/* Content */}
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="text-white/70 mt-1 text-xs">{description}</p>
        </div>
      </div>
    </div>
  );
}
