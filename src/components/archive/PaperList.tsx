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
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-surface-container-lowest border border-outline-variant/30 p-4 md:p-5 rounded-xl animate-pulse"
          >
            <div className="h-3 bg-surface-container-high rounded w-1/3 mb-3" />
            <div className="h-5 bg-surface-container-high rounded w-3/4 mb-3" />
            <div className="h-3 bg-surface-container-high rounded w-full mb-2" />
            <div className="h-3 bg-surface-container-high rounded w-2/3" />
          </div>
        ))}
      </div>
    )
  }

  if (papers.length === 0) {
    return (
      <div className="text-center py-16 bg-surface-container-lowest border border-outline-variant/30 rounded-xl">
        <span className="material-symbols-outlined text-5xl text-outline mb-2 block">
          search_off
        </span>
        <p className="text-on-surface text-lg font-semibold">
          No research papers found
        </p>
        <p className="text-on-surface-variant text-sm mt-1">
          Try a different search term or clear your filters.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
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
