import { Link, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useUpload } from '../hooks/useUpload'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { PaperForm } from '../components/PaperForm'
import type { PaperFormData } from '../lib/types'

export function UploadPage() {
  useDocumentTitle('Upload Paper')
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { upload, uploading, progress, error } = useUpload()

  const handleSubmit = async (formData: PaperFormData) => {
    const result = await upload(formData)
    if (result.success) {
      queryClient.invalidateQueries({ queryKey: ['papers'] })
      queryClient.invalidateQueries({ queryKey: ['archive-stats'] })
      navigate('/')
    }
  }

  return (
    <main className="pt-20 md:pt-32 pb-16 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:underline mb-8 font-medium"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Go back to Archive
            </Link>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-on-surface mb-4 leading-tight">
              Curate New <br className="hidden md:block" />
              <span className="text-primary">Research</span>
            </h1>
            <p className="text-on-surface-variant leading-relaxed mb-6 md:mb-8 max-w-xs">
              Contribute to the academic legacy. Ensure all metadata is accurate
              for better searchability within the Digital Archive.
            </p>
            <div className="hidden lg:block bg-surface-container-low p-6 rounded-xl space-y-4">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary">info</span>
                <p className="text-sm text-on-secondary-container">
                  The PDF is optional — register the details now and attach the
                  file later.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary">verified</span>
                <p className="text-sm text-on-secondary-container">
                  Metadata helps students and faculty discover this research.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-8">
          <PaperForm
            submitting={uploading}
            progress={progress}
            error={error}
            submitLabel="Submit Entry"
            submittingLabel="Uploading..."
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </main>
  )
}
