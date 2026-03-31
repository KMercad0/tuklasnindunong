/** Full paper record (includes student_names — only for authenticated teachers) */
export interface Paper {
  id: string
  title: string
  student_names: string[]
  abstract: string | null
  grade: string
  section: string
  school_year: string
  teacher_name: string
  teacher_id: string
  pdf_url: string
  pdf_path: string
  pdf_size_bytes: number | null
  keywords: string[] | null
  view_count: number
  created_at: string
}

/** Public paper record (no student_names, no PDF access) */
export interface PaperPublic {
  id: string
  title: string
  abstract: string | null
  grade: string
  section: string
  school_year: string
  teacher_name: string
  keywords: string[] | null
  view_count: number
  created_at: string
}

/** Form data for creating a new paper entry */
export interface PaperFormData {
  title: string
  student_names: string[]
  abstract: string
  grade: string
  section: string
  school_year: string
  teacher_name: string
  keywords: string[]
  pdf_file: File
}

/** Search/filter parameters */
export interface PaperFilters {
  search?: string
  grade?: string[]
  school_year?: string[]
  teacher?: string
  sort_by?: 'newest' | 'most_viewed'
  page?: number
  per_page?: number
}

/** Paginated response */
export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  per_page: number
  total_pages: number
}

/** Archive statistics */
export interface ArchiveStats {
  total_papers: number
  total_teachers: number
}
