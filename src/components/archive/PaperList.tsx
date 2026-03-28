import { PaperCard } from './PaperCard'
import type { Paper, PaperPublic } from '../../lib/types'

interface PaperListProps {
  papers: (Paper | PaperPublic)[]
  isAuthenticated: boolean
  isLoading: boolean
}

export function PaperList({ papers, isAuthenticated, isLoading }: PaperListProps) {
  if (isLoading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-surface-container-lowest p-8 rounded-sm animate-pulse"
          >
            <div className="h-4 bg-surface-container-high rounded w-1/4 mb-4" />
            <div className="h-6 bg-surface-container-high rounded w-3/4 mb-3" />
            <div className="h-3 bg-surface-container-high rounded w-1/2 mb-2" />
            <div className="h-3 bg-surface-container-high rounded w-2/3" />
          </div>
        ))}
      </div>
    )
  }

  if (papers.length === 0) {
    return (
      <div className="text-center py-16">
        <span className="material-symbols-outlined text-5xl text-outline mb-4">
          search_off
        </span>
        <p className="text-on-surface-variant text-lg font-medium">
          No research papers found
        </p>
        <p className="text-outline text-sm mt-2">
          Try adjusting your search or filters
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {papers.map((paper) => (
        <PaperCard
          key={paper.id}
          paper={paper}
          isAuthenticated={isAuthenticated}
        />
      ))}
    </div>
  )
}
