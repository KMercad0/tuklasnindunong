const R2_PUBLIC_URL = import.meta.env.VITE_R2_PUBLIC_URL || ''

/** Validate that a file is a real PDF by checking magic bytes */
export function validatePdfFile(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const arr = new Uint8Array(e.target?.result as ArrayBuffer)
      // PDF magic bytes: %PDF (0x25 0x50 0x44 0x46)
      const isPdf =
        arr[0] === 0x25 &&
        arr[1] === 0x50 &&
        arr[2] === 0x44 &&
        arr[3] === 0x46
      resolve(isPdf)
    }
    reader.onerror = () => resolve(false)
    reader.readAsArrayBuffer(file.slice(0, 4))
  })
}

/** Get the public URL for a stored PDF */
export function getPdfUrl(path: string): string {
  return `${R2_PUBLIC_URL}/${path}`
}

/** Format file size for display */
export function formatFileSize(bytes: number | null): string {
  if (!bytes) return 'Unknown size'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
