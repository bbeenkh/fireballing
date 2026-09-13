'use client'

import React, { useState } from 'react'
import { Button, Input } from '@/shared/ui'
import { createPortfolioSchema, type CreatePortfolioRequest } from '@fblg/schemas'
import type { IPortfolioRecord } from '@fblg/types'

/**
 * # PortfolioForm
 * ---
 * - 간단설명: 포트폴리오 생성/수정 폼 컴포넌트
 * - 제약사항: techStack은 쉼표로 구분하여 입력
 * ---
 * @param onSubmit 폼 제출 콜백
 * @param initialData 수정 시 기존 데이터
 * @param isLoading 제출 중 로딩 상태
 * ---
 * @example
 * <PortfolioForm onSubmit={handleSubmit} isLoading={isPending} />
 */
export default function PortfolioForm({
  onSubmit,
  initialData,
  isLoading,
}: {
  onSubmit: (data: CreatePortfolioRequest) => void
  initialData?: IPortfolioRecord
  isLoading?: boolean
}) {
  const [title, setTitle] = useState(initialData?.title ?? '')
  const [description, setDescription] = useState(initialData?.description ?? '')
  const [techStack, setTechStack] = useState(initialData?.techStack.join(', ') ?? '')
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnailUrl ?? '')
  const [projectUrl, setProjectUrl] = useState(initialData?.projectUrl ?? '')
  const [githubUrl, setGithubUrl] = useState(initialData?.githubUrl ?? '')
  const [startDate, setStartDate] = useState(initialData?.startDate ?? '')
  const [endDate, setEndDate] = useState(initialData?.endDate ?? '')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const payload = {
      title,
      description,
      techStack: techStack.split(',').map((s) => s.trim()).filter(Boolean),
      thumbnailUrl: thumbnailUrl || null,
      projectUrl: projectUrl || null,
      githubUrl: githubUrl || null,
      startDate,
      endDate: endDate || null,
    }

    const result = createPortfolioSchema.safeParse(payload)
    if (!result.success) {
      setError('입력값을 확인해주세요.')
      return
    }

    onSubmit(result.data)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        variant="white"
        placeholder="프로젝트 제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        variant="white"
        placeholder="프로젝트 설명"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Input
        variant="white"
        placeholder="기술 스택 (쉼표로 구분)"
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
      />
      <Input
        variant="white"
        placeholder="썸네일 URL"
        value={thumbnailUrl}
        onChange={(e) => setThumbnailUrl(e.target.value)}
      />
      <Input
        variant="white"
        placeholder="프로젝트 URL"
        value={projectUrl}
        onChange={(e) => setProjectUrl(e.target.value)}
      />
      <Input
        variant="white"
        placeholder="GitHub URL"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
      />
      <div className="flex gap-4">
        <Input
          variant="white"
          type="date"
          placeholder="시작일"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <Input
          variant="white"
          type="date"
          placeholder="종료일"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500 text-sm m-0">{error}</p>}
      <Button type="submit" variant="primary" disabled={isLoading}>
        {isLoading ? '저장 중...' : initialData ? '수정' : '등록'}
      </Button>
    </form>
  )
}
