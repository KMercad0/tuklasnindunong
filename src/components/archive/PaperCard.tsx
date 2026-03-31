import { Link } from 'react-router-dom'
import type { Paper, PaperPublic } from '../../lib/types'

interface PaperCardProps {
  paper: Paper | PaperPublic
  isAuthenticated: boolean
}

function hasStudentNames(paper: Paper | PaperPublic): paper is Paper {
  return 'student_names' in paper
}

export function PaperCard({ paper, isAuthenticated }: PaperCardProps) {
  return (
    <article className="group relative bg-surface-container-lowest p-1 hover:bg-surface-container-low transition-colors duration-200">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6 p-4 md:p-6">
        <div className="flex-1 space-y-3">
          {/* Chips */}
          <div className="flex flex-wrap gap-2 mb-2">
            {paper.keywords?.map((keyword) => (
              <span
                key={keyword}
                className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold uppercase tracking-wider"
              >
                {keyword}
              </span>
            ))}
            <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold uppercase tracking-wider">
              SY {paper.school_year}
            </span>
          </div>

          {/* Title */}
          <Link to={`/paper/${paper.id}`}>
            <h2 className="text-lg md:text-xl font-bold text-primary leading-snug group-hover:underline decoration-2 underline-offset-4 transition-all">
              {paper.title}
            </h2>
          </Link>

          {/* Student names (only for authenticated) */}
          {isAuthenticated && hasStudentNames(paper) && (
            <p className="text-on-surface-variant text-sm font-medium">
              Lead Researcher:{' '}
              <span className="text-on-surface">
                {paper.student_names.join(', ')}
              </span>{' '}
              &bull; {paper.grade}-{paper.section}
            </p>
          )}

          {/* Teacher + View count */}
          <div className="flex items-center gap-3 text-on-surface-variant text-xs">
            <span className="italic">Advised by: {paper.teacher_name}</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">visibility</span>
              {paper.view_count.toLocaleString()}
            </span>
          </div>

          {/* Abstract snippet */}
          {paper.abstract && (
            <p className="text-on-surface text-sm leading-relaxed max-w-2xl line-clamp-2 opacity-80">
              {paper.abstract}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col items-stretch md:items-end gap-3 md:min-w-[140px]">
          <Link
            to={`/paper/${paper.id}`}
            className="w-full inline-flex items-center justify-center px-4 py-2 scholarly-gradient text-on-primary text-sm font-semibold rounded-md hover:translate-y-[-2px] transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-sm mr-2">
              {isAuthenticated ? 'picture_as_pdf' : 'article'}
            </span>
            {isAuthenticated ? 'View PDF' : 'View Details'}
          </Link>
        </div>
      </div>
    </article>
  )
}
