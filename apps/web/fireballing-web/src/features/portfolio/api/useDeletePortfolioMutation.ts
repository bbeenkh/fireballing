import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/apiClient'

/**
 * # useDeletePortfolioMutation
 * ---
 * - 간단설명: 포트폴리오를 삭제하는 React Query mutation 훅
 * - onSuccess 시 포트폴리오 목록 캐시를 무효화
 * ---
 * @example
 * const { mutate } = useDeletePortfolioMutation()
 * mutate('portfolio-id')
 */
export default function useDeletePortfolioMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiClient(`/api/portfolio/${id}`, {
        method: 'DELETE',
      })
      const json = (await res.json()) as { success: boolean; error?: string }
      if (!json.success) throw new Error(json.error ?? '포트폴리오 삭제 실패')
      return json
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] })
    },
  })
}
