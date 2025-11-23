export default function Cards({ title, description, image }) {
  const BASE_URL = "http://localhost:5000";
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${BASE_URL}/${image.replace(/^\/+/, "")}`
    : "https://via.placeholder.com/150";

  console.log("Cards image URL:", imageUrl);

  return (
    <div className="flex-shrink-0 bg-white/10 backdrop-blur-md rounded-lg shadow-lg 
                    hover:shadow-[0_0_20px_rgba(255,86,246,0.6)] transition-shadow duration-300 
                    overflow-hidden border border-white/20 mx-2">
      
      <div className="w-full h-48 sm:h-56 md:h-60 lg:h-64 flex justify-center items-center overflow-hidden rounded-t-lg p-2">
        <img
          src={imageUrl}
          alt={title}
          className="max-h-full max-w-full object-contain" // ปรับให้ไม่ crop สูงเกินไป
        />
      </div>

      <div className="p-4 flex flex-col justify-between h-32">
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-white">{title}</h3>
          <p className="text-white/70 mt-1 text-xs sm:text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}
