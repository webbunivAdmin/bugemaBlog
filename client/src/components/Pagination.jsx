import { useEffect, useState } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

const Pagination = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const page = Number.parseInt(searchParams.get("page")) || 1
    setCurrentPage(page)
  }, [])

  const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i)

  const showEllipses = totalPages > 8

  const handlePageChange = (page) => {
    setCurrentPage(page)
    onPageChange(page)
  }

  const renderPageButton = (page) => (
    <button
      key={page}
      className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ease-in-out
        ${
          page === currentPage
            ? "bg-blue-500 text-white shadow-lg transform scale-110"
            : "bg-white text-gray-700 hover:bg-blue-100"
        }`}
      onClick={() => handlePageChange(page)}
    >
      {page}
    </button>
  )

  return (
    <div className="flex items-center justify-center space-x-2 my-8">
      <button
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-blue-100 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      {showEllipses && currentPage > 4 && (
        <>
          {renderPageButton(1)}
          <span className="w-10 h-10 flex items-center justify-center text-gray-500">...</span>
        </>
      )}

      {range(Math.max(1, currentPage - 3), Math.min(totalPages, currentPage + 3)).map(renderPageButton)}

      {showEllipses && currentPage < totalPages - 3 && (
        <>
          <span className="w-10 h-10 flex items-center justify-center text-gray-500">...</span>
          {renderPageButton(totalPages)}
        </>
      )}

      <button
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-blue-100 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <FiChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}

export default Pagination

