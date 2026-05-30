'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { projects } from '@/data/projects'
import postsData from '@/content/blog/posts.json'
import notesData from '@/content/notes/notes.json'
import type { BlogPostPreview } from '@/types/post'
import type { NotePreview } from '@/lib/notes'

const typeLabels: Record<string, string> = {
  blog: '博客',
  note: '笔记',
  project: '作品集',
}

interface SearchResult {
  type: 'blog' | 'note' | 'project'
  title: string
  excerpt: string
  url: string
}

function clientSearch(query: string): SearchResult[] {
  const results: SearchResult[] = []
  const q = query.toLowerCase()

  // 搜索博客
  for (const post of postsData as BlogPostPreview[]) {
    if (
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({ type: 'blog', title: post.title, excerpt: post.excerpt, url: `/blog/${post.slug}` })
    }
  }

  // 搜索笔记
  for (const note of notesData as NotePreview[]) {
    if (
      note.title.toLowerCase().includes(q) ||
      note.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({ type: 'note', title: note.title, excerpt: note.tags.join(', '), url: `/notes/${note.id}` })
    }
  }

  // 搜索作品集
  for (const project of projects) {
    if (
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.techStack.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({ type: 'project', title: project.title, excerpt: project.description, url: '/portfolio' })
    }
  }

  return results
}

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const results = query ? clientSearch(query) : []

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

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">加载中...</div>}>
      <SearchContent />
    </Suspense>
  )
}
