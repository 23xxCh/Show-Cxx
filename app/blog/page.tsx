'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { PostCard } from '@/components/PostCard'
import { TagFilter } from '@/components/TagFilter'
import { Pagination } from '@/components/Pagination'
import type { BlogPostPreview } from '@/types/post'
import postsData from '@/content/blog/posts.json'

const allPosts: BlogPostPreview[] = postsData as BlogPostPreview[]
const allTags = [...new Set(allPosts.flatMap((post) => post.tags))]

function BlogContent() {
  const searchParams = useSearchParams()
  const tag = searchParams.get('tag') || undefined
  const page = parseInt(searchParams.get('page') || '1', 10)
  const perPage = 6

  let filteredPosts = allPosts
  if (tag) {
    filteredPosts = allPosts.filter((post) => post.tags.includes(tag))
  }

  const total = filteredPosts.length
  const totalPages = Math.ceil(total / perPage)
  const start = (page - 1) * perPage
  const posts = filteredPosts.slice(start, start + perPage)

  const paginationSearchParams = tag ? `tag=${tag}` : ''

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">博客</h1>
      <p className="text-muted-foreground mb-6">
        记录技术学习、项目复盘与求职思考。
      </p>

      <div className="mb-8">
        <TagFilter tags={allTags} currentTag={tag} />
      </div>

      {posts.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            baseUrl="/blog"
            searchParams={paginationSearchParams}
          />
        </>
      ) : (
        <p className="text-center text-muted-foreground py-12">
          {tag ? `没有标签“${tag}”的文章` : '暂无文章'}
        </p>
      )}
    </div>
  )
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">加载中...</div>}>
      <BlogContent />
    </Suspense>
  )
}
