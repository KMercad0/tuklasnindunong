import { useSchoolYears } from '../../hooks/usePapers'
import type { PaperFilters } from '../../lib/types'

interface FilterSidebarProps {
  filters: PaperFilters
  onChange: (filters: PaperFilters) => void
}

const GRADES = ['Grade 10', 'Grade 11', 'Grade 12']

export function FilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const { data: schoolYears } = useSchoolYears()

  const handleGradeToggle = (grade: string) => {
    const current = filters.grade || []
    const updated = current.includes(grade)
      ? current.filter((g) => g !== grade)
      : [...current, grade]
    onChange({ ...filters, grade: updated, page: 1 })
  }

  const handleYearToggle = (year: string) => {
    const current = filters.school_year || []
    const updated = current.includes(year)
      ? current.filter((y) => y !== year)
      : [...current, year]
    onChange({ ...filters, school_year: updated, page: 1 })
  }

  const handleReset = () => {
    onChange({ page: 1 })
  }

  return (
    <div className="bg-surface-container-low p-5 md:p-8 rounded-xl">
      <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
            Refine Search
          </h3>
          <div className="space-y-6">
            {/* Sort By */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-secondary">
                Sort By
              </label>
              <div className="space-y-1">
                {([
                  { value: 'newest' as const, label: 'Newest First' },
                  { value: 'most_viewed' as const, label: 'Most Viewed' },
                ] as const).map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors"
                  >
                    <input
                      type="radio"
                      name="sort_by"
                      checked={(filters.sort_by || 'newest') === option.value}
                      onChange={() =>
                        onChange({ ...filters, sort_by: option.value, page: 1 })
                      }
                      className="border-outline-variant text-primary focus:ring-primary"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* School Year */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-secondary">
                School Year
              </label>
              <div className="space-y-1">
                {schoolYears?.map((year) => (
                  <label
                    key={year}
                    className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters.school_year?.includes(year) || false}
                      onChange={() => handleYearToggle(year)}
                      className="rounded-sm border-outline-variant text-primary focus:ring-primary"
                    />
                    <span>{year}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Grade Level */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-secondary">
                Grade Level
              </label>
              <div className="space-y-1">
                {GRADES.map((grade) => (
                  <label
                    key={grade}
                    className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={filters.grade?.includes(grade) || false}
                      onChange={() => handleGradeToggle(grade)}
                      className="rounded-sm border-outline-variant text-primary focus:ring-primary"
                    />
                    <span>{grade}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Teacher */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-secondary">
                Research Teacher
              </label>
              <input
                type="text"
                value={filters.teacher || ''}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    teacher: e.target.value || undefined,
                    page: 1,
                  })
                }
                placeholder="Teacher name..."
                className="w-full bg-surface border-none text-sm rounded-lg focus:ring-primary placeholder:text-on-surface-variant/40"
              />
            </div>

            <button
              onClick={handleReset}
              className="w-full py-2 text-xs font-bold uppercase tracking-wider text-primary border border-primary/20 rounded-md hover:bg-primary/5 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        </div>
    </div>
  )
}
