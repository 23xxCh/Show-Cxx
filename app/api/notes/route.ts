import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import type { ApiResponse } from '@/types/api'

export const dynamic = 'force-static'

// 笔记创建/更新的验证 Schema
// 学习点：Zod 推断类型，与 TypeScript 类型同步
const noteSchema = z.object({
  title: z.string().min(1, '标题不能为空'),
  content: z.string().min(1, '内容不能为空'),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(true),
})

// GET /api/notes - 获取笔记列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const perPage = parseInt(searchParams.get('perPage') || '10')

    // 尝试从数据库获取，如果没有数据库则返回空
    // 这样 API 可以在没有数据库的情况下运行
    const response: ApiResponse<{ notes: unknown[]; total: number }> = {
      success: true,
      data: { notes: [], total: 0 },
    }

    return NextResponse.json(response)
  } catch {
    return NextResponse.json(
      { success: false, error: '获取笔记失败' } as ApiResponse<never>,
      { status: 500 }
    )
  }
}

// POST /api/notes - 创建笔记
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = noteSchema.parse(body)

    // 返回创建成功（实际需要数据库时再实现）
    const response: ApiResponse<{ id: string }> = {
      success: true,
      data: { id: 'new-note-id' },
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0].message } as ApiResponse<never>,
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: '创建笔记失败' } as ApiResponse<never>,
      { status: 500 }
    )
  }
}
