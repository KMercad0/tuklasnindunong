import { useEffect } from 'react'

const SITE = 'Tuklas nin Dunong'

export function useDocumentTitle(title?: string, description?: string) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title ? `${title} — ${SITE}` : `${SITE} — Research Archive`

    let descMeta: HTMLMetaElement | null = null
    let prevDesc: string | null = null
    if (description) {
      descMeta = document.querySelector('meta[name="description"]')
      if (descMeta) {
        prevDesc = descMeta.getAttribute('content')
        descMeta.setAttribute('content', description)
      }
    }

    return () => {
      document.title = prevTitle
      if (descMeta && prevDesc !== null) descMeta.setAttribute('content', prevDesc)
    }
  }, [title, description])
}
