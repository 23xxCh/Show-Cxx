'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
  searchParams?: string
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  searchParams = '',
}: PaginationProps) {
  const buildUrl = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    return `${baseUrl}?${params.toString()}`
  }

  if (totalPages <= 1) return null

  return (
    <nav className="flex items-center justify-center space-x-2" aria-label="分页导航">
      <Button
        nativeButton={false}
        variant="outline"
        size="icon"
        render={<Link href={buildUrl(currentPage - 1)} />}
        disabled={currentPage <= 1}
        aria-label="上一页"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          nativeButton={false}
          variant={page === currentPage ? 'default' : 'outline'}
          size="icon"
          render={<Link href={buildUrl(page)} />}
          aria-label={`第 ${page} 页`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </Button>
      ))}

      <Button
        nativeButton={false}
        variant="outline"
        size="icon"
        render={<Link href={buildUrl(currentPage + 1)} />}
        disabled={currentPage >= totalPages}
        aria-label="下一页"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}
