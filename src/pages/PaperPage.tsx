import { useParams, Link } from 'react-router-dom'
import { usePaper } from '../hooks/usePapers'
import { useAuth } from '../hooks/useAuth'
import { formatFileSize } from '../lib/r2'
import type { Paper } from '../lib/types'

function hasStudentNames(paper: unknown): paper is Paper {
  return typeof paper === 'object' && paper !== null && 'student_names' in paper
}

export function PaperPage() {
  const { id } = useParams<{ id: string }>()
  const { isAuthenticated } = useAuth()
  const { data: paper, isLoading, error } = usePaper(id!, isAuthenticated)

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
    <main className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Back link */}
        <div className="mb-12">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left column — 8 cols */}
          <div className="lg:col-span-8">
            <header className="mb-12">
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
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface leading-[1.1] mb-8 max-w-3xl">
                {paper.title}
              </h1>

              {/* Author + School Year */}
              <div className="flex flex-col md:flex-row md:items-center gap-6 text-on-surface-variant border-l-4 border-primary/20 pl-6">
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
              <section className="mb-16">
                <h2 className="text-xs font-bold uppercase tracking-widest text-outline mb-6">
                  Abstract
                </h2>
                <div className="bg-surface-container-low p-8 lg:p-12 rounded-xl">
                  <p className="text-lg leading-relaxed text-on-surface-variant font-light italic">
                    {paper.abstract}
                  </p>
                </div>
              </section>
            )}

            {/* PDF Download */}
            <section>
              <div className="relative group overflow-hidden rounded-xl bg-surface-container-high flex flex-col items-center justify-center text-center p-12 border border-transparent hover:border-primary/30 transition-all duration-300">
                <span
                  className="material-symbols-outlined text-6xl text-primary mb-4"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  description
                </span>
                <h3 className="text-xl font-bold text-on-surface mb-2">
                  Research Paper
                </h3>
                <p className="text-on-surface-variant mb-8 max-w-xs mx-auto">
                  Full research paper ({formatFileSize(paper.pdf_size_bytes)})
                </p>
                <a
                  href={paper.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 scholarly-gradient text-on-primary font-bold rounded-md hover:translate-y-[-2px] transition-all duration-200 shadow-lg shadow-primary/20"
                >
                  <span className="material-symbols-outlined">download</span>
                  Download PDF
                </a>
              </div>
            </section>
          </div>

          {/* Right column — 4 cols (metadata sidebar) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-12">
              <div className="space-y-8 p-8 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10">
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
                    Tuklas nin Sining
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
