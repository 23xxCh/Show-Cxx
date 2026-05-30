import { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { globalSearch } from '@/lib/search'

export const metadata: Metadata = {
  title: '搜索',
  description: '搜索博客、笔记、作品集',
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

const typeLabels: Record<string, string> = {
  blog: '博客',
  note: '笔记',
  project: '作品集',
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = q || ''
  const results = query ? globalSearch(query) : []

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">搜索</h1>

      {query ? (
        <p className="text-muted-foreground mb-8">
          搜索 &quot;{query}&quot; 的结果，共 {results.length} 条
        </p>
      ) : (
        <p className="text-muted-foreground mb-8">
          输入关键词搜索博客、笔记、作品集
        </p>
      )}

      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((result, i) => (
            <Link key={i} href={result.url}>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {typeLabels[result.type]}
                    </Badge>
                    <h3 className="font-semibold hover:text-blue-600 transition-colors">
                      {result.title}
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {result.excerpt}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : query ? (
        <p className="text-center text-muted-foreground py-12">
          没有找到相关内容
        </p>
      ) : null}
    </div>
  )
}
