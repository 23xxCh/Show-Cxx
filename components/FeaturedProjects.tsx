'use client'

import Link from 'next/link'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
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
        hidden: { opacity: 0, y: 12 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
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

  const [first, ...rest] = projects

  return (
    <section className="py-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight">精选项目</h2>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors"
        >
          查看全部
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {first && (
          <motion.div
            variants={item}
            className="group md:row-span-2 rounded-xl border bg-card p-6 transition-colors hover:border-accent/40 flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="text-[11px]">
                  {categoryLabels[first.category] ?? first.category}
                </Badge>
                {first.sourceLabel && (
                  <Badge variant="secondary" className="text-[11px]">
                    {first.sourceLabel}
                  </Badge>
                )}
              </div>
              <h3 className="text-xl font-semibold leading-snug mb-2 group-hover:text-accent transition-colors">
                {first.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {first.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-5">
              {first.techStack.slice(0, 5).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-[11px]">
                  {tech}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}

        {rest.map((project) => (
          <motion.div
            key={project.id}
            variants={item}
            className="group rounded-xl border bg-card p-5 transition-colors hover:border-accent/40 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-[11px]">
                  {categoryLabels[project.category] ?? project.category}
                </Badge>
                {project.sourceLabel && (
                  <Badge variant="secondary" className="text-[11px]">
                    {project.sourceLabel}
                  </Badge>
                )}
              </div>
              <h3 className="text-base font-semibold leading-snug mb-1.5 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {project.techStack.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-[11px]">
                  {tech}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
