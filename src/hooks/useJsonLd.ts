import { useEffect } from 'react'

export function useJsonLd(data: object | null | undefined, id = 'page-jsonld') {
  useEffect(() => {
    if (!data) return
    let el = document.getElementById(id) as HTMLScriptElement | null
    if (!el) {
      el = document.createElement('script')
      el.type = 'application/ld+json'
      el.id = id
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(data)
    return () => {
      el?.remove()
    }
  }, [data, id])
}
