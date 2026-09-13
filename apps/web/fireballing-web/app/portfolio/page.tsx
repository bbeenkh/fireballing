'use client'

import React, { useState } from 'react'
import type { IPortfolioRecord } from '@fblg/types'
import type { CreatePortfolioRequest } from '@fblg/schemas'
import {
  usePortfolioQuery,
  useCreatePortfolioMutation,
  useUpdatePortfolioMutation,
  useDeletePortfolioMutation,
  PortfolioForm,
  PortfolioCard,
} from '@/features/portfolio'
import { Skeleton } from '@/shared/ui'

/**
 * # PortfolioPage
 * ---
 * - 간단설명: 포트폴리오 목록 조회, 생성, 수정, 삭제 페이지
 * ---
 * @example
 * <PortfolioPage />
 */
export default function PortfolioPage() {
  const { data: portfolios, isLoading } = usePortfolioQuery()
  const createMutation = useCreatePortfolioMutation()
  const updateMutation = useUpdatePortfolioMutation()
  const deleteMutation = useDeletePortfolioMutation()

  const [editing, setEditing] = useState<IPortfolioRecord | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleCreate = (data: CreatePortfolioRequest) => {
    createMutation.mutate(data, {
      onSuccess: () => setShowForm(false),
    })
  }

  const handleUpdate = (data: CreatePortfolioRequest) => {
    if (!editing) return
    updateMutation.mutate(
      { id: editing.id, data },
      { onSuccess: () => setEditing(null) },
    )
  }

  const handleDelete = (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    deleteMutation.mutate(id)
  }

  return (
    <main className="py-6 flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-fb-on-primary m-0">포트폴리오</h1>
        <button
          className="text-sm font-medium text-lf-primary-container cursor-pointer bg-transparent border-0"
          onClick={() => {
            setEditing(null)
            setShowForm((v) => !v)
          }}
        >
          {showForm ? '닫기' : '+ 새 프로젝트'}
        </button>
      </div>

      {/* 생성 폼 */}
      {showForm && !editing && (
        <section className="border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-bold text-fb-on-primary m-0 mb-4">
            새 프로젝트 등록
          </h2>
          <PortfolioForm
            onSubmit={handleCreate}
            isLoading={createMutation.isPending}
          />
        </section>
      )}

      {/* 수정 폼 */}
      {editing && (
        <section className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-fb-on-primary m-0">
              프로젝트 수정
            </h2>
            <button
              className="text-sm text-lf-on-surface-muted cursor-pointer bg-transparent border-0"
              onClick={() => setEditing(null)}
            >
              취소
            </button>
          </div>
          <PortfolioForm
            onSubmit={handleUpdate}
            initialData={editing}
            isLoading={updateMutation.isPending}
          />
        </section>
      )}

      {/* 목록 */}
      {isLoading ? (
        <Skeleton.Container>
          {[1, 2, 3].map((i) => (
            <Skeleton.Box key={i} styleClass={{ root: 'h-40 w-full rounded-xl' }} />
          ))}
        </Skeleton.Container>
      ) : portfolios?.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {portfolios.map((item) => (
            <PortfolioCard
              key={item.id}
              portfolio={item}
              onEdit={setEditing}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-lf-on-surface-muted py-12">
          등록된 포트폴리오가 없습니다.
        </p>
      )}
    </main>
  )
}
