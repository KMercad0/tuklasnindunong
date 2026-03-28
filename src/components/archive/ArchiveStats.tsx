import { useArchiveStats } from '../../hooks/usePapers'

export function ArchiveStats() {
  const { data: stats } = useArchiveStats()

  return (
    <div className="pt-8 border-t border-outline-variant/20">
      <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
        Archive Stats
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-surface-container-lowest rounded-lg">
          <p className="text-xl font-bold text-primary">
            {stats?.total_papers.toLocaleString() ?? '—'}
          </p>
          <p className="text-[10px] text-secondary font-medium">TOTAL PAPERS</p>
        </div>
        <div className="p-3 bg-surface-container-lowest rounded-lg">
          <p className="text-xl font-bold text-primary">
            {stats?.total_teachers ?? '—'}
          </p>
          <p className="text-[10px] text-secondary font-medium">
            FACULTY ADVISORS
          </p>
        </div>
      </div>
    </div>
  )
}
