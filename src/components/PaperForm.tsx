import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { PaperFormData } from '../lib/types'

interface PaperFormProps {
  initial?: Partial<PaperFormData>
  submitting: boolean
  progress: number
  error: string | null
  submitLabel: string
  submittingLabel: string
  /** True if the paper already has a PDF stored (edit mode). */
  hasExistingPdf?: boolean
  onSubmit: (data: PaperFormData) => void
}

const SCHOOL_YEARS = [
  '2019-2020',
  '2020-2021',
  '2021-2022',
  '2022-2023',
  '2023-2024',
  '2024-2025',
  '2025-2026',
  '2026-2027',
]

export function PaperForm({
  initial,
  submitting,
  progress,
  error,
  submitLabel,
  submittingLabel,
  hasExistingPdf = false,
  onSubmit,
}: PaperFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [studentNames, setStudentNames] = useState(
    initial?.student_names?.join(', ') ?? ''
  )
  const [teacherName, setTeacherName] = useState(initial?.teacher_name ?? '')
  const [abstract, setAbstract] = useState(initial?.abstract ?? '')
  const [grade, setGrade] = useState(initial?.grade ?? '')
  const [section, setSection] = useState(initial?.section ?? '')
  const [schoolYear, setSchoolYear] = useState(initial?.school_year ?? '')
  const [keywords, setKeywords] = useState(initial?.keywords?.join(', ') ?? '')
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type === 'application/pdf') setPdfFile(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPdfFile(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      student_names: studentNames.split(',').map((n) => n.trim()).filter(Boolean),
      abstract,
      grade,
      section,
      school_year: schoolYear,
      teacher_name: teacherName,
      keywords: keywords.split(',').map((k) => k.trim()).filter(Boolean),
      pdf_file: pdfFile,
    })
  }

  return (
    <div className="bg-surface-container-lowest p-5 md:p-8 lg:p-12 rounded-xl shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Paper Identity */}
        <section className="space-y-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-on-surface-variant flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full" />
            Paper Identity
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-on-surface mb-2"
              >
                Research Title
              </label>
              <input
                type="text"
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., The Impact of Urban Green Spaces on Mental Well-being"
                className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary transition-all text-on-surface placeholder:text-outline"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="student_names"
                  className="block text-sm font-semibold text-on-surface mb-2"
                >
                  Student Name(s)
                </label>
                <input
                  type="text"
                  id="student_names"
                  required
                  value={studentNames}
                  onChange={(e) => setStudentNames(e.target.value)}
                  placeholder="Separate with commas"
                  className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary transition-all text-on-surface placeholder:text-outline"
                />
              </div>
              <div>
                <label
                  htmlFor="teacher"
                  className="block text-sm font-semibold text-on-surface mb-2"
                >
                  Research Teacher
                </label>
                <input
                  type="text"
                  id="teacher"
                  required
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  placeholder="Advising faculty member"
                  className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary transition-all text-on-surface placeholder:text-outline"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Abstract */}
        <section className="space-y-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-on-surface-variant flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full" />
            Abstract
          </h2>
          <div>
            <label
              htmlFor="abstract"
              className="block text-sm font-semibold text-on-surface mb-2"
            >
              Brief Summary{' '}
              <span className="text-outline font-normal">(optional)</span>
            </label>
            <textarea
              id="abstract"
              rows={4}
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              placeholder="A short summary of the research paper..."
              className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary transition-all text-on-surface placeholder:text-outline resize-y"
            />
          </div>
        </section>

        {/* Academic Context */}
        <section className="space-y-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-on-surface-variant flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full" />
            Academic Context
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="grade"
                className="block text-sm font-semibold text-on-surface mb-2"
              >
                Grade
              </label>
              <select
                id="grade"
                required
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary transition-all text-on-surface appearance-none"
              >
                <option value="">Select Grade</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="section"
                className="block text-sm font-semibold text-on-surface mb-2"
              >
                Section
              </label>
              <input
                type="text"
                id="section"
                required
                value={section}
                onChange={(e) => setSection(e.target.value)}
                placeholder="e.g., STEM-A"
                className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary transition-all text-on-surface placeholder:text-outline"
              />
            </div>
            <div>
              <label
                htmlFor="school_year"
                className="block text-sm font-semibold text-on-surface mb-2"
              >
                School Year
              </label>
              <select
                id="school_year"
                required
                value={schoolYear}
                onChange={(e) => setSchoolYear(e.target.value)}
                className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary transition-all text-on-surface appearance-none"
              >
                <option value="">Select Year</option>
                {SCHOOL_YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="keywords"
              className="block text-sm font-semibold text-on-surface mb-2"
            >
              Keywords{' '}
              <span className="text-outline font-normal">(optional)</span>
            </label>
            <input
              type="text"
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g., Physics, Energy, Sustainability"
              className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-primary transition-all text-on-surface placeholder:text-outline"
            />
          </div>
        </section>

        {/* File Upload (optional) */}
        <section className="space-y-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-on-surface-variant flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full" />
            File Selection{' '}
            <span className="text-outline font-normal normal-case tracking-normal">
              (optional — add later)
            </span>
          </h2>
          <div
            className="relative group"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div
              className={`border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-primary bg-primary/5'
                  : pdfFile || hasExistingPdf
                    ? 'border-primary/40 bg-primary/5'
                    : 'border-outline-variant group-hover:bg-surface-container-low'
              }`}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">
                  {pdfFile || hasExistingPdf ? 'check_circle' : 'cloud_upload'}
                </span>
              </div>
              {pdfFile ? (
                <>
                  <p className="text-on-surface font-semibold mb-1">
                    {pdfFile.name}
                  </p>
                  <p className="text-on-surface-variant text-sm">
                    {(pdfFile.size / (1024 * 1024)).toFixed(1)} MB —{' '}
                    <span className="text-primary underline">change file</span>
                  </p>
                </>
              ) : hasExistingPdf ? (
                <>
                  <p className="text-on-surface font-semibold mb-1">
                    PDF already on file
                  </p>
                  <p className="text-on-surface-variant text-sm">
                    Drop a new PDF to{' '}
                    <span className="text-primary underline">replace it</span>
                  </p>
                </>
              ) : (
                <>
                  <p className="text-on-surface font-semibold mb-1">
                    Upload the Research Paper
                  </p>
                  <p className="text-on-surface-variant text-sm">
                    Drag and drop your PDF here, or{' '}
                    <span className="text-primary underline">browse files</span>
                  </p>
                </>
              )}
              <p className="mt-4 text-xs text-outline uppercase tracking-widest font-bold">
                Max file size: 25MB
              </p>
            </div>
          </div>
        </section>

        {/* Progress bar */}
        {submitting && (
          <div className="w-full bg-surface-container-high rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-sm text-error bg-error-container/30 p-3 rounded-lg">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="pt-6 md:pt-8 flex flex-col-reverse md:flex-row items-center justify-end gap-4 md:gap-6">
          <Link
            to="/"
            className="text-secondary hover:text-on-surface transition-colors font-medium"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="w-full md:w-auto scholarly-gradient text-on-primary font-semibold px-10 py-4 rounded-lg shadow-lg hover:translate-y-[-2px] transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {submitting ? submittingLabel : submitLabel}
          </button>
        </div>
      </form>
    </div>
  )
}
