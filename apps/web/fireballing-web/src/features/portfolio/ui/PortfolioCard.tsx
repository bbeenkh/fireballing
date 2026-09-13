'use client'

import React from 'react'
import { Card, Button } from '@/shared/ui'
import type { IPortfolioRecord } from '@fblg/types'

/**
 * # PortfolioCard
 * ---
 * - 간단설명: 포트폴리오 항목을 카드 형태로 표시하는 컴포넌트
 * ---
 * @param portfolio 포트폴리오 레코드
 * @param onEdit 수정 버튼 클릭 콜백
 * @param onDelete 삭제 버튼 클릭 콜백
 * ---
 * @example
 * <PortfolioCard portfolio={item} onEdit={handleEdit} onDelete={handleDelete} />
 */
export default function PortfolioCard({
  portfolio,
  onEdit,
  onDelete,
}: {
  portfolio: IPortfolioRecord
  onEdit: (portfolio: IPortfolioRecord) => void
  onDelete: (id: string) => void
}) {
  const dateRange = portfolio.endDate
    ? `${portfolio.startDate} ~ ${portfolio.endDate}`
    : `${portfolio.startDate} ~`

  return (
    <Card>
      <Card.Header>
        <Card.Title>{portfolio.title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <p className="text-sm text-lf-on-surface-variant m-0 mb-3">
          {portfolio.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {portfolio.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs rounded-full bg-lf-surface-low text-lf-on-surface-variant"
            >
              {tech}
            </span>
          ))}
        </div>
        <p className="text-xs text-lf-on-surface-muted m-0">{dateRange}</p>
      </Card.Body>
      <Card.Footer>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => onEdit(portfolio)}>
            수정
          </Button>
          <Button variant="ghost" onClick={() => onDelete(portfolio.id)}>
            삭제
          </Button>
        </div>
      </Card.Footer>
    </Card>
  )
}
