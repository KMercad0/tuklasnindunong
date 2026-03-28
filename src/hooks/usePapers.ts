import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import type { Paper, PaperPublic, PaperFilters, PaginatedResult, ArchiveStats } from '../lib/types'

const DEFAULT_PER_PAGE = 10

/** Fetch papers with search, filters, and pagination */
export function usePapers(filters: PaperFilters, isAuthenticated: boolean) {
  return useQuery({
    queryKey: ['papers', filters, isAuthenticated],
    queryFn: async (): Promise<PaginatedResult<Paper | PaperPublic>> => {
      const page = filters.page || 1
      const perPage = filters.per_page || DEFAULT_PER_PAGE
      const from = (page - 1) * perPage
      const to = from + perPage - 1

      // Use the public view for unauthenticated users (hides student_names)
      const table = isAuthenticated ? 'papers' : 'papers_public'
      let query = supabase.from(table).select('*', { count: 'exact' })

      // Full-text search
      if (filters.search) {
        query = query.textSearch('search_vector', filters.search, {
          type: 'websearch',
        })
      }

      // Grade filter (multiple grades)
      if (filters.grade && filters.grade.length > 0) {
        query = query.in('grade', filters.grade)
      }

      // School year filter (multiple years)
      if (filters.school_year && filters.school_year.length > 0) {
        query = query.in('school_year', filters.school_year)
      }

      // Teacher name filter (partial match)
      if (filters.teacher) {
        query = query.ilike('teacher_name', `%${filters.teacher}%`)
      }

      // Order and paginate
      query = query.order('created_at', { ascending: false }).range(from, to)

      const { data, count, error } = await query

      if (error) throw error

      const total = count || 0
      return {
        data: data || [],
        total,
        page,
        per_page: perPage,
        total_pages: Math.ceil(total / perPage),
      }
    },
    staleTime: 60_000, // Cache for 1 minute
  })
}

/** Fetch a single paper by ID */
export function usePaper(id: string, isAuthenticated: boolean) {
  return useQuery({
    queryKey: ['paper', id, isAuthenticated],
    queryFn: async (): Promise<Paper | PaperPublic | null> => {
      const table = isAuthenticated ? 'papers' : 'papers_public'
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    },
    staleTime: 60_000,
    enabled: !!id,
  })
}

/** Fetch archive statistics */
export function useArchiveStats() {
  return useQuery({
    queryKey: ['archive-stats'],
    queryFn: async (): Promise<ArchiveStats> => {
      const { count: totalPapers } = await supabase
        .from('papers_public')
        .select('*', { count: 'exact', head: true })

      const { data: teachers } = await supabase
        .from('papers_public')
        .select('teacher_name')

      const uniqueTeachers = new Set(teachers?.map((t) => t.teacher_name))

      return {
        total_papers: totalPapers || 0,
        total_teachers: uniqueTeachers.size,
      }
    },
    staleTime: 300_000, // Cache for 5 minutes
  })
}

/** Get distinct school years for the filter dropdown */
export function useSchoolYears() {
  return useQuery({
    queryKey: ['school-years'],
    queryFn: async (): Promise<string[]> => {
      const { data, error } = await supabase
        .from('papers_public')
        .select('school_year')

      if (error) throw error

      const unique = [...new Set(data?.map((d) => d.school_year))].sort().reverse()
      return unique
    },
    staleTime: 300_000,
  })
}
