import type { IPortfolioRecord, CreatePortfolioRequest, UpdatePortfolioRequest } from '../types/portfolio.types.js'
import { createSupabaseClientWithToken } from '../../../shared/lib/supabase.js'
import { HttpError } from '../../../shared/errors/http-error.js'
import { SupabaseConnectionError } from '../../../shared/errors/supabase-connection-error.js'

/**
 * # mapToPortfolioRecord
 * ---
 * - 간단설명: Supabase DB의 snake_case 행 데이터를 IPortfolioRecord(camelCase)로 변환
 * ---
 * @param row Supabase에서 조회한 원본 행 데이터
 * ---
 * @example
 * const record = mapToPortfolioRecord(row)
 */
function mapToPortfolioRecord(row: Record<string, unknown>): IPortfolioRecord {
  return {
    id: row.id as string,
    userId: row.user_id as string,
    title: row.title as string,
    description: (row.description as string) ?? null,
    techStack: (row.tech_stack as string[]) ?? [],
    thumbnailUrl: (row.thumbnail_url as string) ?? null,
    projectUrl: (row.project_url as string) ?? null,
    githubUrl: (row.github_url as string) ?? null,
    startDate: (row.start_date as string) ?? null,
    endDate: (row.end_date as string) ?? null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  }
}

/**
 * # createPortfolio
 * ---
 * - 간단설명: 새 포트폴리오를 생성하고 생성된 레코드를 반환
 * ---
 * @param token JWT access token
 * @param userId 소유자 ID
 * @param data 생성 요청 데이터
 * ---
 * @example
 * const portfolio = await createPortfolio(token, 'user-id', { title: '내 프로젝트' })
 */
export async function createPortfolio(
  token: string,
  userId: string,
  data: CreatePortfolioRequest,
): Promise<IPortfolioRecord> {
  const supabase = createSupabaseClientWithToken(token)

  let result, error
  try {
    ;({ data: result, error } = await supabase
      .from('portfolios')
      .insert({
        user_id: userId,
        title: data.title,
        description: data.description ?? null,
        tech_stack: data.techStack ?? [],
        thumbnail_url: data.thumbnailUrl ?? null,
        project_url: data.projectUrl ?? null,
        github_url: data.githubUrl ?? null,
        start_date: data.startDate ?? null,
        end_date: data.endDate ?? null,
      })
      .select()
      .single())
  } catch (e) {
    if (SupabaseConnectionError.isConnectionError(e)) throw new SupabaseConnectionError(e)
    throw e
  }

  if (error) {
    if (SupabaseConnectionError.isConnectionError(error)) throw new SupabaseConnectionError(error)
    throw new HttpError(400, error.message)
  }
  if (!result) throw new HttpError(400, '포트폴리오 생성에 실패했습니다')

  return mapToPortfolioRecord(result)
}

/**
 * # getPortfolios
 * ---
 * - 간단설명: 특정 사용자의 포트폴리오 목록을 조회
 * ---
 * @param token JWT access token
 * @param userId 소유자 ID
 * ---
 * @example
 * const list = await getPortfolios(token, 'user-id')
 */
export async function getPortfolios(token: string, userId: string): Promise<IPortfolioRecord[]> {
  const supabase = createSupabaseClientWithToken(token)

  let data, error
  try {
    ;({ data, error } = await supabase.from('portfolios').select().eq('user_id', userId))
  } catch (e) {
    if (SupabaseConnectionError.isConnectionError(e)) throw new SupabaseConnectionError(e)
    throw e
  }

  if (error) {
    if (SupabaseConnectionError.isConnectionError(error)) throw new SupabaseConnectionError(error)
    throw new HttpError(500, error.message)
  }

  return (data ?? []).map(mapToPortfolioRecord)
}

/**
 * # getPortfolioById
 * ---
 * - 간단설명: ID로 포트폴리오 단건 조회
 * ---
 * @param token JWT access token
 * @param id 포트폴리오 ID
 * ---
 * @example
 * const portfolio = await getPortfolioById(token, 'portfolio-id')
 */
export async function getPortfolioById(token: string, id: string): Promise<IPortfolioRecord> {
  const supabase = createSupabaseClientWithToken(token)

  let data, error
  try {
    ;({ data, error } = await supabase.from('portfolios').select().eq('id', id).single())
  } catch (e) {
    if (SupabaseConnectionError.isConnectionError(e)) throw new SupabaseConnectionError(e)
    throw e
  }

  if (error) {
    if (SupabaseConnectionError.isConnectionError(error)) throw new SupabaseConnectionError(error)
    throw new HttpError(404, '포트폴리오를 찾을 수 없습니다')
  }
  if (!data) throw new HttpError(404, '포트폴리오를 찾을 수 없습니다')

  return mapToPortfolioRecord(data)
}

/**
 * # updatePortfolio
 * ---
 * - 간단설명: 포트폴리오를 수정하고 수정된 레코드를 반환
 * - 제약사항: user_id 일치 확인으로 본인 소유만 수정 가능
 * ---
 * @param token JWT access token
 * @param id 포트폴리오 ID
 * @param userId 소유자 ID
 * @param data 수정 요청 데이터
 * ---
 * @example
 * const updated = await updatePortfolio(token, 'id', 'user-id', { title: '수정된 제목' })
 */
export async function updatePortfolio(
  token: string,
  id: string,
  userId: string,
  data: UpdatePortfolioRequest,
): Promise<IPortfolioRecord> {
  const supabase = createSupabaseClientWithToken(token)

  const updateData: Record<string, unknown> = {}
  if (data.title !== undefined) updateData.title = data.title
  if (data.description !== undefined) updateData.description = data.description
  if (data.techStack !== undefined) updateData.tech_stack = data.techStack
  if (data.thumbnailUrl !== undefined) updateData.thumbnail_url = data.thumbnailUrl
  if (data.projectUrl !== undefined) updateData.project_url = data.projectUrl
  if (data.githubUrl !== undefined) updateData.github_url = data.githubUrl
  if (data.startDate !== undefined) updateData.start_date = data.startDate
  if (data.endDate !== undefined) updateData.end_date = data.endDate

  let result, error
  try {
    ;({ data: result, error } = await supabase
      .from('portfolios')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single())
  } catch (e) {
    if (SupabaseConnectionError.isConnectionError(e)) throw new SupabaseConnectionError(e)
    throw e
  }

  if (error) {
    if (SupabaseConnectionError.isConnectionError(error)) throw new SupabaseConnectionError(error)
    throw new HttpError(404, '포트폴리오를 찾을 수 없습니다')
  }
  if (!result) throw new HttpError(404, '포트폴리오를 찾을 수 없습니다')

  return mapToPortfolioRecord(result)
}

/**
 * # deletePortfolio
 * ---
 * - 간단설명: 포트폴리오를 삭제
 * - 제약사항: user_id 일치 확인으로 본인 소유만 삭제 가능
 * ---
 * @param token JWT access token
 * @param id 포트폴리오 ID
 * @param userId 소유자 ID
 * ---
 * @example
 * await deletePortfolio(token, 'portfolio-id', 'user-id')
 */
export async function deletePortfolio(token: string, id: string, userId: string): Promise<void> {
  const supabase = createSupabaseClientWithToken(token)

  let error
  try {
    ;({ error } = await supabase.from('portfolios').delete().eq('id', id).eq('user_id', userId))
  } catch (e) {
    if (SupabaseConnectionError.isConnectionError(e)) throw new SupabaseConnectionError(e)
    throw e
  }

  if (error) {
    if (SupabaseConnectionError.isConnectionError(error)) throw new SupabaseConnectionError(error)
    throw new HttpError(500, error.message)
  }
}
