import { useState } from 'react'
import { z } from 'zod'
import { supabase } from '../lib/supabase'
import { validatePdfFile } from '../lib/r2'
import type { PaperFormData } from '../lib/types'

/** Validation schema for paper metadata */
const paperSchema = z.object({
  title: z.string().min(1, 'Title is required').max(500),
  student_names: z.array(z.string().min(1)).min(1, 'At least one student name is required'),
  abstract: z.string().max(5000).optional().default(''),
  grade: z.string().min(1, 'Grade is required'),
  section: z.string().min(1, 'Section is required').max(100),
  school_year: z
    .string()
    .min(1, 'School year is required')
    .regex(/^\d{4}-\d{4}$/, 'Format: YYYY-YYYY (e.g., 2023-2024)'),
  teacher_name: z.string().min(1, 'Teacher name is required').max(200),
  keywords: z.array(z.string()).optional().default([]),
})

export function useUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const upload = async (formData: PaperFormData) => {
    setUploading(true)
    setProgress(0)
    setError(null)

    try {
      // 1. Validate metadata
      const validation = paperSchema.safeParse(formData)
      if (!validation.success) {
        const firstError = validation.error.issues[0]
        throw new Error(firstError.message)
      }
      setProgress(10)

      // 2. Validate PDF file
      if (!formData.pdf_file) {
        throw new Error('Please select a PDF file')
      }
      if (formData.pdf_file.size > 25 * 1024 * 1024) {
        throw new Error('File size must be under 25MB')
      }
      const isValidPdf = await validatePdfFile(formData.pdf_file)
      if (!isValidPdf) {
        throw new Error('File is not a valid PDF')
      }
      setProgress(20)

      // 3. Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('You must be signed in to upload')
      setProgress(30)

      // 4. Upload PDF to Supabase Storage (temporary — will migrate to R2 later)
      const fileExt = 'pdf'
      const filePath = `${formData.school_year}/${formData.grade}/${crypto.randomUUID()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('papers')
        .upload(filePath, formData.pdf_file, {
          contentType: 'application/pdf',
          upsert: false,
        })

      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)
      setProgress(70)

      // 5. Get public URL
      const { data: urlData } = supabase.storage
        .from('papers')
        .getPublicUrl(filePath)

      // 6. Insert metadata
      const { error: insertError } = await supabase.from('papers').insert({
        title: validation.data.title,
        student_names: validation.data.student_names,
        abstract: validation.data.abstract || null,
        grade: validation.data.grade,
        section: validation.data.section,
        school_year: validation.data.school_year,
        teacher_name: validation.data.teacher_name,
        teacher_id: user.id,
        pdf_url: urlData.publicUrl,
        pdf_size_bytes: formData.pdf_file.size,
        keywords: validation.data.keywords.length > 0 ? validation.data.keywords : null,
      })

      if (insertError) throw new Error(`Failed to save: ${insertError.message}`)
      setProgress(100)

      return { success: true }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed'
      setError(message)
      return { success: false, error: message }
    } finally {
      setUploading(false)
    }
  }

  return { upload, uploading, progress, error }
}
