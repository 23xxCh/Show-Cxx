import { Metadata } from 'next'
import { PostCard } from '@/components/PostCard'
import { TagFilter } from '@/components/TagFilter'
import { Pagination } from '@/components/Pagination'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: '博客',
  description: '技术文章、学习笔记、项目经验分享',
}

interface BlogPageProps {
  searchParams: Promise<{ tag?: string; page?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { tag, page } = await searchParams
  const currentPage = parseInt(page || '1', 10)
  const perPage = 6

  const { posts, total, tags } = getAllPosts({
    tag,
    page: currentPage,
    perPage,
  })

  const totalPages = Math.ceil(total / perPage)

  // 构建用于分页组件的 searchParams 字符串
  const paginationSearchParams = tag ? `tag=${tag}` : ''

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">博客</h1>
      <p className="text-muted-foreground mb-6">
        记录技术学习、分享项目经验
      </p>

      {/* 标签筛选 */}
      <div className="mb-8">
        <TagFilter tags={tags} currentTag={tag} />
      </div>

      {/* 文章列表 */}
      {posts.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {/* 分页 */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/blog"
            searchParams={paginationSearchParams}
          />
        </>
      ) : (
        <p className="text-center text-muted-foreground py-12">
          {tag ? `没有标签为 "${tag}" 的文章` : '暂无文章'}
        </p>
      )}
    </div>
  )
}
