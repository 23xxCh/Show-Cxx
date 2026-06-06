'use client'

import Link from 'next/link'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { BlogPostPreview } from '@/types/post'

function buildVariants(reduced: boolean) {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  }
  const item: Variants = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: -6 },
        show: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      }
  return { container, item }
}

type LatestPostsProps = {
  posts: BlogPostPreview[]
}

export function LatestPosts({ posts }: LatestPostsProps) {
  const reduced = useReducedMotion() ?? false
  const { container, item } = buildVariants(reduced)

  if (posts.length === 0) return null

  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight">最新文章</h2>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors"
        >
          全部文章
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="divide-y"
      >
        {posts.map((post) => (
          <motion.article key={post.slug} variants={item}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex items-start gap-4 py-4 transition-colors"
            >
              <time className="shrink-0 pt-0.5 text-xs font-mono text-muted-foreground tabular-nums w-[5.5rem]">
                {new Date(post.date).toLocaleDateString('zh-CN', {
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium leading-snug group-hover:text-accent transition-colors line-clamp-1">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                    {post.excerpt}
                  </p>
                )}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
