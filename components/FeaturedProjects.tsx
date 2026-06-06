'use client'

import Link from 'next/link'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Project } from '@/data/projects'

const categoryLabels: Record<string, string> = {
  fullstack: '数字孪生 / 全栈',
  ai: '工业 AI / 智能体',
  robotics: '机器人 / 嵌入式',
  mechanical: '机械设计 / 工程实践',
  data: '工业数据 / 预测分析',
  other: '其他探索',
}

function buildVariants(reduced: boolean) {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  }

  const item: Variants = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }

  return { container, item }
}

type FeaturedProjectsProps = {
  projects: Project[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const reduced = useReducedMotion() ?? false
  const { container, item } = buildVariants(reduced)

  const [lead, second, third] = projects

  return (
    <section className="py-10 md:py-12">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div className="max-w-2xl">
          <div className="text-[11px] tracking-[0.08em] text-muted-foreground">
            代表项目
          </div>
          <h2 className="balanced-headline mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
            先看最能代表岗位匹配度的项目。
          </h2>
        </div>
        <Link
          href="/portfolio"
          className="inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          查看全部
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]"
      >
        {lead && (
          <motion.article
            variants={item}
            className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-foreground px-6 py-6 text-background shadow-[0_28px_100px_rgba(34,30,24,0.18)] md:px-7 md:py-7"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_28%)]" />
            <div className="relative flex h-full flex-col">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="border-0 bg-white/12 text-background hover:bg-white/12">
                  {categoryLabels[lead.category] ?? lead.category}
                </Badge>
                {lead.sourceLabel && (
                  <Badge variant="secondary" className="border-0 bg-white/8 text-background/80 hover:bg-white/8">
                    {lead.sourceLabel}
                  </Badge>
                )}
              </div>

              <h3 className="mt-5 max-w-2xl text-2xl font-semibold tracking-[-0.04em] md:text-[2rem]">
                {lead.title}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-background/78 md:text-base">
                {lead.description}
              </p>

              {lead.sourceNote && (
                <p className="mt-4 max-w-xl text-sm leading-7 text-background/62">
                  {lead.sourceNote}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                {lead.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/12 px-3 py-1.5 text-xs text-background/82"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-full bg-white text-foreground hover:bg-white/90"
                  nativeButton={false}
                  render={<Link href="/portfolio" />}
                >
                  查看全部项目
                </Button>
                {lead.githubUrl && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="rounded-full text-background hover:bg-white/8 hover:text-background"
                    nativeButton={false}
                    render={<Link href={lead.githubUrl} target="_blank" rel="noopener noreferrer" />}
                  >
                    GitHub
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>
          </motion.article>
        )}

        <div className="grid gap-4">
          {[second, third].filter(Boolean).map((project, index) => (
            <motion.article
              key={project!.id}
              variants={item}
              className={`soft-panel rounded-[1.75rem] border border-border/70 p-5 shadow-[0_20px_60px_rgba(30,28,24,0.07)] ${
                index === 1 ? 'lg:translate-x-6' : ''
              }`}
            >
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-[11px]">
                  {categoryLabels[project!.category] ?? project!.category}
                </Badge>
                {project!.sourceLabel && (
                  <Badge variant="secondary" className="text-[11px]">
                    {project!.sourceLabel}
                  </Badge>
                )}
              </div>

              <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
                {project!.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {project!.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project!.techStack.slice(0, 4).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-[11px]">
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
