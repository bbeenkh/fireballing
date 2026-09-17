import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/apiClient'
import type { UpdatePortfolioRequest } from '@fblg/schemas'

/**
 * # useUpdatePortfolioMutation
 * ---
 * - 간단설명: 포트폴리오를 수정하는 React Query mutation 훅
 * - onSuccess 시 포트폴리오 목록 캐시를 무효화
 * ---
 * @param id 수정할 포트폴리오 ID
 * @param data 수정할 필드
 * ---
 * @example
 * const { mutate } = useUpdatePortfolioMutation()
 * mutate({ id: '123', data: { title: '새 제목' } })
 */
export default function useUpdatePortfolioMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdatePortfolioRequest }) => {
      const res = await apiClient(`/api/portfolio/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = (await res.json()) as { success: boolean; error?: string }
      if (!json.success) throw new Error(json.error ?? '포트폴리오 수정 실패')
      return json
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] })
    },
  })
}
