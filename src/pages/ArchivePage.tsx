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

  return (
    <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      {/* Hero Search */}
      <section className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8 text-on-surface">
          Research Archive
        </h1>
        <SearchBar value={searchInput} onChange={setSearchInput} />
      </section>

      {/* Grid: Content + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
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

        {/* Sidebar */}
        <div className="space-y-0">
          <FilterSidebar filters={filters} onChange={setFilters} />
          <div className="hidden lg:block sticky top-28 mt-8">
            <div className="bg-surface-container-low p-8 rounded-xl">
              <ArchiveStats />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
