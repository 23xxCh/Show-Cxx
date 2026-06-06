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
        hidden: { opacity: 0, y: 10 },
        show: {
          opacity: 1,
          y: 0,
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

  const [lead, ...rest] = posts

  return (
    <section className="py-10 md:py-12">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div className="max-w-2xl">
          <div className="text-[11px] tracking-[0.08em] text-muted-foreground">
            相关文章
          </div>
          <h2 className="balanced-headline mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
            如果需要更细的技术背景，可以继续看这些文章。
          </h2>
        </div>
        <Link
          href="/blog"
          className="inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          全部文章
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="grid gap-4 lg:grid-cols-[0.78fr_1.22fr]"
      >
        {lead && (
          <motion.article
            variants={item}
            className="soft-panel rounded-[1.9rem] border border-border/70 p-6 shadow-[0_20px_60px_rgba(30,28,24,0.07)]"
          >
            <Link href={`/blog/${lead.slug}`} className="block">
              <div className="text-xs font-mono tabular-nums text-muted-foreground">
                {new Date(lead.date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] transition-colors hover:text-accent">
                {lead.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {lead.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {lead.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[11px]">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Link>
          </motion.article>
        )}

        <motion.div
          variants={item}
          className="soft-panel rounded-[1.9rem] border border-border/70 p-3 shadow-[0_20px_60px_rgba(30,28,24,0.07)]"
        >
          <motion.div variants={container} initial="hidden" animate="show" className="divide-y divide-border/70">
            {rest.map((post) => (
              <motion.article key={post.slug} variants={item}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-3 px-3 py-4 md:grid-cols-[90px_1fr]"
                >
                  <div className="text-[11px] font-mono uppercase tracking-[0.08em] text-muted-foreground">
                    {new Date(post.date).toLocaleDateString('zh-CN', {
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold leading-6 transition-colors group-hover:text-accent">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-1 text-sm leading-6 text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    {post.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[10px]">
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
        </motion.div>
      </motion.div>
    </section>
  )
}
