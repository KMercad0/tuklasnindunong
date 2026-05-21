import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { validatePdfFile } from '../lib/r2'
import { paperSchema } from './useUpload'
import type { PaperFormData } from '../lib/types'

export function useUpdatePaper() {
  const [updating, setUpdating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const update = async (
    id: string,
    formData: PaperFormData,
    oldPdfPath?: string | null
  ) => {
    setUpdating(true)
    setProgress(0)
    setError(null)

    try {
      // 1. Validate metadata
      const validation = paperSchema.safeParse(formData)
      if (!validation.success) {
        throw new Error(validation.error.issues[0].message)
      }
      setProgress(10)

      // 2. Must be signed in
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('You must be signed in to edit')
      setProgress(20)

      // 3. Build update payload. PDF fields only change if a new file is given;
      //    otherwise the existing PDF is left untouched.
      const payload: Record<string, unknown> = {
        title: validation.data.title,
        student_names: validation.data.student_names,
        abstract: validation.data.abstract || null,
        grade: validation.data.grade,
        section: validation.data.section,
        school_year: validation.data.school_year,
        teacher_name: validation.data.teacher_name,
        keywords: validation.data.keywords.length > 0 ? validation.data.keywords : null,
      }

      if (formData.pdf_file) {
        if (formData.pdf_file.size > 25 * 1024 * 1024) {
          throw new Error('File size must be under 25MB')
        }
        const isValidPdf = await validatePdfFile(formData.pdf_file)
        if (!isValidPdf) {
          throw new Error('File is not a valid PDF')
        }
        setProgress(30)

        const filePath = `${formData.school_year}/${formData.grade}/${crypto.randomUUID()}.pdf`
        const { error: uploadError } = await supabase.storage
          .from('papers')
          .upload(filePath, formData.pdf_file, {
            contentType: 'application/pdf',
            upsert: false,
          })
        if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)
        setProgress(70)

        const { data: urlData } = supabase.storage
          .from('papers')
          .getPublicUrl(filePath)
        payload.pdf_url = urlData.publicUrl
        payload.pdf_path = filePath
        payload.pdf_size_bytes = formData.pdf_file.size
      }

      // 4. Update row (RLS allows any authenticated teacher; audit trigger logs it)
      const { error: updateError } = await supabase
        .from('papers')
        .update(payload)
        .eq('id', id)

      if (updateError) throw new Error(`Failed to save: ${updateError.message}`)

      // 5. PDF replaced: remove the now-orphaned old file from Storage.
      //    Non-fatal — the row is already saved; a stranded file is cosmetic.
      const newPdfPath = payload.pdf_path as string | undefined
      if (newPdfPath && oldPdfPath && oldPdfPath !== newPdfPath) {
        const { error: removeError } = await supabase.storage
          .from('papers')
          .remove([oldPdfPath])
        if (removeError) {
          console.warn('Failed to delete old PDF:', removeError.message)
        }
      }
      setProgress(100)

      return { success: true }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Update failed'
      setError(message)
      return { success: false, error: message }
    } finally {
      setUpdating(false)
    }
  }

  return { update, updating, progress, error }
}
