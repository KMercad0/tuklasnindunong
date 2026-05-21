import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { usePaper } from '../hooks/usePapers'
import { useUpdatePaper } from '../hooks/useUpdatePaper'
import { useAuth } from '../hooks/useAuth'
import { PaperForm } from '../components/PaperForm'
import type { Paper, PaperFormData } from '../lib/types'

function isFullPaper(p: unknown): p is Paper {
  return typeof p === 'object' && p !== null && 'student_names' in p
}

interface FieldChange {
  field: string
  from: string
  to: string
}

/** Compare the loaded paper against the submitted form to list what changed. */
function computeChanges(paper: Paper, next: PaperFormData): FieldChange[] {
  const changes: FieldChange[] = []
  const push = (field: string, from: string, to: string) => {
    if (from !== to) changes.push({ field, from, to })
  }

  push('Title', paper.title, next.title)
  push('Student name(s)', paper.student_names.join(', '), next.student_names.join(', '))
  push('Teacher', paper.teacher_name, next.teacher_name)
  push('Abstract', paper.abstract ?? '', next.abstract)
  push('Grade', paper.grade, next.grade)
  push('Section', paper.section, next.section)
  push('School year', paper.school_year, next.school_year)
  push('Keywords', (paper.keywords ?? []).join(', '), next.keywords.join(', '))

  if (next.pdf_file) {
    changes.push({
      field: 'PDF',
      from: paper.pdf_url ? 'existing file' : 'none',
      to: next.pdf_file.name,
    })
  }

  return changes
}

export function EditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isAuthenticated } = useAuth()
  const { data: paper, isLoading } = usePaper(id!, isAuthenticated)
  const { update, updating, progress, error } = useUpdatePaper()
  const [pending, setPending] = useState<PaperFormData | null>(null)

  if (isLoading) {
    return (
      <main className="pt-24 pb-20 max-w-7xl mx-auto px-6">
        <div className="animate-pulse space-y-8">
          <div className="h-4 bg-surface-container-high rounded w-32" />
          <div className="h-10 bg-surface-container-high rounded w-3/4" />
          <div className="h-64 bg-surface-container-high rounded" />
        </div>
      </main>
    )
  }

  if (!paper || !isFullPaper(paper)) {
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

  const initial: Partial<PaperFormData> = {
    title: paper.title,
    student_names: paper.student_names,
    abstract: paper.abstract ?? '',
    grade: paper.grade,
    section: paper.section,
    school_year: paper.school_year,
    teacher_name: paper.teacher_name,
    keywords: paper.keywords ?? [],
  }

  const changes = pending ? computeChanges(paper, pending) : []

  const confirmSave = async () => {
    if (!pending) return
    const result = await update(id!, pending, paper.pdf_path)
    if (result.success) {
      queryClient.invalidateQueries({ queryKey: ['papers'] })
      queryClient.invalidateQueries({ queryKey: ['paper', id] })
      queryClient.invalidateQueries({ queryKey: ['archive-stats'] })
      navigate(`/paper/${id}`)
    }
    // on failure, keep the modal open; useUpdatePaper exposes the error
  }

  return (
    <main className="pt-20 md:pt-32 pb-16 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Link
              to={`/paper/${id}`}
              className="inline-flex items-center gap-2 text-primary hover:underline mb-8 font-medium"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to paper
            </Link>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-on-surface mb-4 leading-tight">
              Edit <span className="text-primary">Research</span>
            </h1>
            <p className="text-on-surface-variant leading-relaxed mb-6 md:mb-8 max-w-xs">
              Update the metadata or attach the PDF. You'll review the changes
              before they are saved.
            </p>
            <div className="hidden lg:block bg-surface-container-low p-6 rounded-xl space-y-4">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary">history</span>
                <p className="text-sm text-on-secondary-container">
                  Every edit is logged with your account for accountability.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-8">
          <PaperForm
            initial={initial}
            submitting={updating}
            progress={progress}
            error={error}
            submitLabel="Review changes"
            submittingLabel="Saving..."
            hasExistingPdf={Boolean(paper.pdf_url)}
            onSubmit={(data) => setPending(data)}
          />
        </div>
      </div>

      {/* Confirm-diff modal */}
      {pending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-surface-container-lowest rounded-xl shadow-xl w-full max-w-lg p-6 md:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-on-surface">Confirm changes</h2>

            {changes.length === 0 ? (
              <p className="text-on-surface-variant">
                No changes detected. Close to keep editing.
              </p>
            ) : (
              <ul className="space-y-4">
                {changes.map((c) => (
                  <li key={c.field} className="text-sm">
                    <p className="font-semibold text-on-surface mb-1">{c.field}</p>
                    <div className="grid grid-cols-1 gap-1 pl-3 border-l-2 border-outline-variant/40">
                      <p className="text-on-surface-variant line-through">
                        {c.from || '(empty)'}
                      </p>
                      <p className="text-primary">{c.to || '(empty)'}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {error && (
              <p className="text-sm text-error bg-error-container/30 p-3 rounded-lg">
                {error}
              </p>
            )}

            <div className="flex flex-col-reverse md:flex-row items-center justify-end gap-3 md:gap-4 pt-2">
              <button
                onClick={() => setPending(null)}
                disabled={updating}
                className="text-secondary hover:text-on-surface transition-colors font-medium disabled:opacity-50"
              >
                Keep editing
              </button>
              <button
                onClick={confirmSave}
                disabled={updating || changes.length === 0}
                className="w-full md:w-auto scholarly-gradient text-on-primary font-semibold px-8 py-3 rounded-lg shadow-lg hover:translate-y-[-2px] transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {updating ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
