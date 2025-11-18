export default function SearchBoxSmall() {
  return (

    <div className="w-full max-w-2xl mx-auto mt-10 px-2">
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      <div className="relative">
        {/* Icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
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
          className="block w-full pl-8 pr-20 py-2 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
        />

        {/* Button */}
        <button
          type="button"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          Search
        </button>
      </div>
    </div>
  );
}
