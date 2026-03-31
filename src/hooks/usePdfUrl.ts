import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

/** Generate a signed PDF URL for authenticated users. Returns null for public. */
export function usePdfUrl(pdfPath: string | undefined, isAuthenticated: boolean) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!pdfPath || !isAuthenticated) {
      setSignedUrl(null)
      return
    }

    let cancelled = false
    setIsLoading(true)

    supabase.storage
      .from('papers')
      .createSignedUrl(pdfPath, 3600) // 1 hour expiry
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          console.warn('Failed to generate signed PDF URL:', error.message)
          setSignedUrl(null)
        } else {
          setSignedUrl(data.signedUrl)
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [pdfPath, isAuthenticated])

  return { signedUrl, isLoading }
}
