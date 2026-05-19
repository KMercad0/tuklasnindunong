import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

/** Generate a signed PDF URL for authenticated users. Returns null for public. */
export function usePdfUrl(pdfPath: string | undefined, isAuthenticated: boolean) {
  const eligible = Boolean(pdfPath) && isAuthenticated

  const { data, isLoading } = useQuery({
    queryKey: ['pdf-signed-url', pdfPath],
    enabled: eligible,
    staleTime: 50 * 60 * 1000, // refresh before 1h expiry
    queryFn: async () => {
      const { data, error } = await supabase.storage
        .from('papers')
        .createSignedUrl(pdfPath as string, 3600)
      if (error) {
        console.warn('Failed to generate signed PDF URL:', error.message)
        return null
      }
      return data.signedUrl
    },
  })

  return {
    signedUrl: eligible ? data ?? null : null,
    isLoading: eligible ? isLoading : false,
  }
}
