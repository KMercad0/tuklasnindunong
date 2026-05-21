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
    <article className="group relative bg-surface-container-lowest border border-outline-variant/30 rounded-xl hover:border-primary/40 hover:shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-surface">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6 p-4 md:p-6">
        <div className="flex-1 min-w-0 space-y-3">
          {/* Metadata strip */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-on-surface-variant">
            <span className="font-semibold">{paper.grade}</span>
            <span aria-hidden>•</span>
            <span>{paper.section}</span>
            <span aria-hidden>•</span>
            <span>SY {paper.school_year}</span>
          </div>

          {/* Title — blue, prominent */}
          <Link
            to={`/paper/${paper.id}`}
            className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
          >
            <h2 className="text-lg md:text-xl font-bold text-primary leading-snug group-hover:underline decoration-2 underline-offset-4 transition-all">
              {paper.title}
            </h2>
          </Link>

          {/* Researchers (authenticated only) */}
          {isAuthenticated && hasStudentNames(paper) && (
            <p className="text-on-surface-variant text-sm">
              <span className="text-on-surface-variant/70">By </span>
              <span className="text-on-surface font-medium">
                {paper.student_names.join(', ')}
              </span>
            </p>
          )}

          {/* Abstract snippet */}
          {paper.abstract && (
            <p className="text-on-surface text-sm leading-relaxed line-clamp-2 opacity-80">
              {paper.abstract}
            </p>
          )}

          {/* Footer: adviser + views + keywords */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1 text-xs text-on-surface-variant">
            <span className="italic">Adviser: {paper.teacher_name}</span>
            {paper.view_count > 0 && (
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  visibility
                </span>
                {paper.view_count.toLocaleString()}
              </span>
            )}
            {paper.keywords && paper.keywords.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {paper.keywords.slice(0, 3).map((keyword) => (
                  <span
                    key={keyword}
                    className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action */}
        <div className="flex flex-col items-stretch md:items-end gap-3 md:min-w-[140px]">
          {(() => {
            const noPdf =
              isAuthenticated && hasStudentNames(paper) && !paper.pdf_url
            const icon = !isAuthenticated
              ? 'article'
              : noPdf
                ? 'upload_file'
                : 'picture_as_pdf'
            const label = !isAuthenticated
              ? 'View Details'
              : noPdf
                ? 'No PDF yet'
                : 'View PDF'
            return (
              <Link
                to={`/paper/${paper.id}`}
                className="w-full inline-flex items-center justify-center px-4 py-2 scholarly-gradient text-on-primary text-sm font-semibold rounded-md hover:translate-y-[-2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-sm mr-2">{icon}</span>
                {label}
              </Link>
            )
          })()}
        </div>
      </div>
    </article>
  )
}
