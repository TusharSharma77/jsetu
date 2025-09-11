import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center w-full max-w-md rounded-2xl shadow-md overflow-hidden border bg-white dark:bg-gray-800">
      <input
        type="text"
        placeholder="Search..."
        className="flex-grow px-4 py-2 text-sm outline-none bg-transparent"
      />
      <button className="px-4 py-2 bg-blue-600 text-white flex items-center gap-2 hover:bg-blue-700 transition-colors">
        <Search className="w-4 h-4" />
        <span>Search</span>
      </button>
    </div>
  );
}
