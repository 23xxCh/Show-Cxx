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

export async function generateStaticParams() {
  const { posts } = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

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

  if (!post) {
    notFound()
  }

  const { posts } = getAllPosts()
  const currentIndex = posts.findIndex((item) => item.slug === slug)
  const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null

  return (
    <div className="container mx-auto px-4 py-8">
      <Button nativeButton={false} variant="ghost" render={<Link href="/blog" />} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        返回博客列表
      </Button>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-64 shrink-0">
          <TableOfContents content={post.content} />
        </aside>

        <article className="flex-1 min-w-0">
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

          <MarkdownRenderer content={post.content} />

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
