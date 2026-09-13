import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/apiClient'
import type { CreatePortfolioRequest } from '@fblg/schemas'

/**
 * # useCreatePortfolioMutation
 * ---
 * - 간단설명: 포트폴리오를 생성하는 React Query mutation 훅
 * - onSuccess 시 포트폴리오 목록 캐시를 무효화
 * ---
 * @example
 * const { mutate } = useCreatePortfolioMutation()
 * mutate({ title: '프로젝트', description: '설명', techStack: ['React'], startDate: '2024-01-01' })
 */
export default function useCreatePortfolioMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreatePortfolioRequest) => {
      const res = await apiClient('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = (await res.json()) as { success: boolean; error?: string }
      if (!json.success) throw new Error(json.error ?? '포트폴리오 생성 실패')
      return json
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolios'] })
    },
  })
}
