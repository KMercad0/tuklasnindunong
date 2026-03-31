import { useParams, Link } from 'react-router-dom'
import { usePaper } from '../hooks/usePapers'
import { useAuth } from '../hooks/useAuth'
import { useTrackView } from '../hooks/useTrackView'
import { usePdfUrl } from '../hooks/usePdfUrl'
import { formatFileSize } from '../lib/r2'
import type { Paper } from '../lib/types'

function hasStudentNames(paper: unknown): paper is Paper {
  return typeof paper === 'object' && paper !== null && 'student_names' in paper
}

function hasPdfAccess(paper: unknown): paper is Paper {
  return typeof paper === 'object' && paper !== null && 'pdf_path' in paper
}

export function PaperPage() {
  const { id } = useParams<{ id: string }>()
  const { isAuthenticated } = useAuth()
  const { data: paper, isLoading, error } = usePaper(id!, isAuthenticated)
  useTrackView(id)
  const pdfPath = paper && hasPdfAccess(paper) ? paper.pdf_path : undefined
  const { signedUrl, isLoading: pdfLoading } = usePdfUrl(pdfPath, isAuthenticated)

  if (isLoading) {
    return (
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-6">
        <div className="animate-pulse space-y-8">
          <div className="h-4 bg-surface-container-high rounded w-32" />
          <div className="h-10 bg-surface-container-high rounded w-3/4" />
          <div className="h-40 bg-surface-container-high rounded" />
        </div>
      </main>
    )
  }

  if (error || !paper) {
    return (
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-6 text-center">
        <span className="material-symbols-outlined text-5xl text-outline mb-4">
          error_outline
        </span>
        <p className="text-on-surface-variant text-lg">Paper not found</p>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block">
          Back to Archive
        </Link>
      </main>
    )
  }

  return (
    <main className="pt-20 md:pt-24 pb-12 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Back link */}
        <div className="mb-6 md:mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-medium"
          >
            <span className="material-symbols-outlined text-[18px]">
              arrow_back
            </span>
            Back to Archive
          </Link>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20">
          {/* Left column — 8 cols */}
          <div className="lg:col-span-8">
            <header className="mb-8 md:mb-12">
              {/* Keyword chips */}
              {paper.keywords && paper.keywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {paper.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-semibold rounded-full uppercase tracking-wider"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-on-surface leading-[1.1] mb-6 md:mb-8 max-w-3xl">
                {paper.title}
              </h1>

              {/* Author + School Year */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 text-on-surface-variant border-l-4 border-primary/20 pl-4 md:pl-6">
                {isAuthenticated && hasStudentNames(paper) && (
                  <>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-widest text-outline mb-1">
                        Author
                      </p>
                      <p className="text-lg font-semibold text-on-surface">
                        {paper.student_names.join(', ')}
                      </p>
                    </div>
                    <div className="hidden md:block w-px h-8 bg-surface-container-highest" />
                  </>
                )}
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-outline mb-1">
                    School Year
                  </p>
                  <p className="text-lg font-semibold text-on-surface">
                    {paper.school_year}
                  </p>
                </div>
              </div>
            </header>

            {/* Abstract */}
            {paper.abstract && (
              <section className="mb-10 md:mb-16">
                <h2 className="text-xs font-bold uppercase tracking-widest text-outline mb-4 md:mb-6">
                  Abstract
                </h2>
                <div className="bg-surface-container-low p-5 md:p-8 lg:p-12 rounded-xl">
                  <p className="text-base md:text-lg leading-relaxed text-on-surface-variant font-light italic">
                    {paper.abstract}
                  </p>
                </div>
              </section>
            )}

            {/* PDF Section — Download for teachers, Contact Adviser for public */}
            <section>
              <div className="relative group overflow-hidden rounded-xl bg-surface-container-high flex flex-col items-center justify-center text-center p-8 md:p-12 border border-transparent hover:border-primary/30 transition-all duration-300">
                <span
                  className="material-symbols-outlined text-5xl md:text-6xl text-primary mb-4"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {isAuthenticated ? 'description' : 'lock'}
                </span>
                {isAuthenticated && hasPdfAccess(paper) ? (
                  <>
                    <h3 className="text-xl font-bold text-on-surface mb-2">
                      Research Paper
                    </h3>
                    <p className="text-on-surface-variant mb-8 max-w-xs mx-auto">
                      Full research paper ({formatFileSize(paper.pdf_size_bytes)})
                    </p>
                    {pdfLoading ? (
                      <div className="inline-flex items-center gap-3 px-8 py-4 bg-surface-container-highest text-on-surface-variant font-bold rounded-md">
                        <span className="material-symbols-outlined animate-spin">progress_activity</span>
                        Preparing download…
                      </div>
                    ) : signedUrl ? (
                      <a
                        href={signedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 scholarly-gradient text-on-primary font-bold rounded-md hover:translate-y-[-2px] transition-all duration-200 shadow-lg shadow-primary/20"
                      >
                        <span className="material-symbols-outlined">download</span>
                        Download PDF
                      </a>
                    ) : (
                      <p className="text-on-surface-variant text-sm">
                        Unable to generate download link. Please try again later.
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-on-surface mb-2">
                      Restricted Access
                    </h3>
                    <p className="text-on-surface-variant mb-4 max-w-sm mx-auto">
                      To access the full research paper, please contact the research
                      adviser through the school office.
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-lowest rounded-lg text-on-surface-variant text-sm">
                      <span className="material-symbols-outlined text-[18px]">person</span>
                      <span>Adviser: <strong className="text-on-surface">{paper.teacher_name}</strong></span>
                    </div>
                  </>
                )}
              </div>
            </section>
          </div>

          {/* Right column — 4 cols (metadata sidebar) */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 space-y-8 lg:space-y-12">
              <div className="space-y-6 md:space-y-8 p-5 md:p-8 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-outline mb-3">
                    Grade Level
                  </h4>
                  <p className="text-base font-semibold text-on-surface">
                    {paper.grade}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-outline mb-3">
                    Academic Section
                  </h4>
                  <p className="text-base font-semibold text-on-surface">
                    {paper.section}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-outline mb-3">
                    Research Faculty
                  </h4>
                  <p className="text-base font-semibold text-on-surface">
                    {paper.teacher_name}
                  </p>
                </div>
                {paper.keywords && paper.keywords.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-outline mb-3">
                      Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {paper.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="text-xs font-medium text-primary bg-primary/5 px-2 py-1 rounded"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-outline mb-3">
                    Views
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">visibility</span>
                    <p className="text-base font-semibold text-on-surface">
                      {paper.view_count.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* School branding */}
              <div className="flex items-center gap-4 px-2">
                <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">
                    school
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">
                    Tuklas nin Dunong
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    Research Archive
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
