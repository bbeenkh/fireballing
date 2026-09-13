import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/apiClient'
import type { IPortfolioRecord } from '@fblg/types'

/**
 * # usePortfolioQuery
 * ---
 * - 간단설명: 포트폴리오 목록을 조회하는 React Query 훅
 * ---
 * @example
 * const { data, isLoading } = usePortfolioQuery()
 */
export default function usePortfolioQuery() {
  return useQuery<IPortfolioRecord[]>({
    queryKey: ['portfolios'],
    queryFn: async () => {
      const res = await apiClient('/api/portfolio')
      const json = (await res.json()) as { success: boolean; data: IPortfolioRecord[] }
      if (!json.success) throw new Error('포트폴리오 목록 조회 실패')
      return json.data
    },
  })
}
