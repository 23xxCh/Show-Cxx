// API 响应的通用类型
// 学习点：泛型类型，用于统一 API 响应格式

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  perPage: number
}
