import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SearchBar } from '../components/archive/SearchBar'
import { FilterSidebar } from '../components/archive/FilterSidebar'
import { PaperList } from '../components/archive/PaperList'
import { Pagination } from '../components/archive/Pagination'
import { ArchiveStats } from '../components/archive/ArchiveStats'
import { usePapers } from '../hooks/usePapers'
import { useAuth } from '../hooks/useAuth'
import type { PaperFilters } from '../lib/types'

export function ArchivePage() {
  const { isAuthenticated } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()

  const [filters, setFilters] = useState<PaperFilters>({
    search: searchParams.get('q') || undefined,
    page: Number(searchParams.get('page')) || 1,
  })

  // Debounced search
  const [searchInput, setSearchInput] = useState(filters.search || '')

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchInput || undefined, page: 1 }))
    }, 300)
    return () => clearTimeout(timer)
  }, [searchInput])

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams()
    if (filters.search) params.set('q', filters.search)
    if (filters.page && filters.page > 1) params.set('page', String(filters.page))
    setSearchParams(params, { replace: true })
  }, [filters.search, filters.page, setSearchParams])

  const { data, isLoading } = usePapers(filters, isAuthenticated)

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <main className="pt-20 md:pt-24 pb-12 md:pb-20 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Hero Search */}
      <section className="mb-6 md:mb-12">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4 md:mb-8 text-on-surface">
          Research Archive
        </h1>
        <SearchBar value={searchInput} onChange={setSearchInput} />
      </section>

      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-primary border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">tune</span>
          {filtersOpen ? 'Hide Filters' : 'Filters'}
        </button>
      </div>

      {/* Mobile filters drawer */}
      {filtersOpen && (
        <div className="lg:hidden mb-6">
          <FilterSidebar filters={filters} onChange={setFilters} />
        </div>
      )}

      {/* Grid: Content + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 lg:gap-12">
        {/* Main content */}
        <div>
          <PaperList
            papers={data?.data || []}
            isAuthenticated={isAuthenticated}
            isLoading={isLoading}
          />
          {data && (
            <Pagination
              currentPage={data.page}
              totalPages={data.total_pages}
              onPageChange={handlePageChange}
            />
          )}
        </div>

        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-8">
            <FilterSidebar filters={filters} onChange={setFilters} />
            <div className="bg-surface-container-low p-8 rounded-xl">
              <ArchiveStats />
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
