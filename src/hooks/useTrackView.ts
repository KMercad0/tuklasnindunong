import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

const SESSION_KEY_PREFIX = 'viewed_'

/** Track a paper view with session-based deduplication */
export function useTrackView(paperId: string | undefined) {
  useEffect(() => {
    if (!paperId) return

    const key = `${SESSION_KEY_PREFIX}${paperId}`
    if (sessionStorage.getItem(key)) return

    sessionStorage.setItem(key, '1')
    supabase
      .rpc('increment_view_count', { paper_id: paperId })
      .then(({ error }) => {
        if (error) {
          // Remove flag so it retries next visit if the RPC failed
          sessionStorage.removeItem(key)
        }
      })
  }, [paperId])
}
