// src/components/form/search/search_box.jsx
export default function SearchBox({ value, onChange }) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-4 px-2">
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      <div className="relative">
        {/* Icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          type="text"
          id="search"
          placeholder="Search..."
          value={value}
          onChange={onChange}
          className="block w-full pl-8 pr-2 py-2 text-sm text-white placeholder-white/70 bg-white/10 border border-white/30 rounded-md backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#3BACE2] focus:border-[#B936EE]"
        />
      </div>
    </div>
  );
}
