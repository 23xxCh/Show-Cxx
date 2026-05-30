import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { TableOfContents } from '@/components/TableOfContents'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

// 生成静态页面参数（SSG）
export async function generateStaticParams() {
  const { posts } = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

// 生成 SEO 元数据
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: '文章未找到' }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  // 文章不存在时返回 404
  if (!post) {
    notFound()
  }

  // 获取上一篇和下一篇
  const { posts } = getAllPosts()
  const currentIndex = posts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 返回按钮 */}
      <Button nativeButton={false} variant="ghost" render={<Link href="/blog" />} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        返回博客列表
      </Button>

      <div className="flex gap-8">
        {/* 左侧目录（桌面端） */}
        <aside className="hidden lg:block w-64 shrink-0">
          <TableOfContents content={post.content} />
        </aside>

        {/* 文章内容 */}
        <article className="flex-1 min-w-0">
          {/* 文章头部 */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground mb-4">
              <time>
                {new Date(post.date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/blog?tag=${tag}`}>
                    <Badge variant="secondary">{tag}</Badge>
                  </Link>
                ))}
              </div>
            )}
          </header>

          {/* Markdown 渲染 */}
          <MarkdownRenderer content={post.content} />

          {/* 上一篇 / 下一篇 导航 */}
          <nav className="mt-12 pt-8 border-t flex justify-between gap-4">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group flex-1 min-w-0"
              >
                <p className="text-sm text-muted-foreground flex items-center">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  上一篇
                </p>
                <p className="font-medium truncate group-hover:text-blue-600 transition-colors">
                  {prevPost.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group flex-1 min-w-0 text-right"
              >
                <p className="text-sm text-muted-foreground flex items-center justify-end">
                  下一篇
                  <ChevronRight className="h-4 w-4 ml-1" />
                </p>
                <p className="font-medium truncate group-hover:text-blue-600 transition-colors">
                  {nextPost.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </nav>
        </article>
      </div>
    </div>
  )
}
