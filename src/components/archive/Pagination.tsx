interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  // Show max 5 page buttons
  const getPageNumbers = () => {
    const pages: number[] = []
    let start = Math.max(1, currentPage - 2)
    const end = Math.min(totalPages, start + 4)
    start = Math.max(1, end - 4)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className="flex items-center justify-center gap-2 pt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="w-11 h-11 flex items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant disabled:opacity-30"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-11 h-11 flex items-center justify-center rounded-lg font-bold transition-colors ${
            page === currentPage
              ? 'bg-primary text-on-primary'
              : 'hover:bg-surface-container-high'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="w-11 h-11 flex items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant disabled:opacity-30"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  )
}
