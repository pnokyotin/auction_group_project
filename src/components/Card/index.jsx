export default function Card({ title, description, image }) {
  return (
    <div className="flex-shrink-0  bg-white/10 backdrop-blur-md rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(255,86,246,0.6)] transition-shadow duration-300 overflow-hidden border border-white/20">
      
      {/* Image */}
      {image && (
        <div className="w-full h-48 sm:h-56 md:h-60 lg:h-64 overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col justify-between h-32">
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-white">{title}</h3>
          <p className="text-white/70 mt-1 text-xs sm:text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
