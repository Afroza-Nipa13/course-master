// components/Pagination.js
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  
  // Generate page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 2 && i <= currentPage + 2)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        <FaChevronLeft />
      </button>
      
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-3 py-2">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        )
      )}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}