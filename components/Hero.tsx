'use client'

import Link from 'next/link'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { ArrowRight, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Status = { label: string; sublabel: string }
type Slot = { title: string; href: string; meta: string }

type HeroProps = {
  status: Status
  current?: Slot
  latest?: Slot
}

function buildVariants(reduced: boolean) {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.05 },
    },
  }
  const item: Variants = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 10 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }
  return { container, item }
}

export function Hero({ status, current, latest }: HeroProps) {
  const reduced = useReducedMotion() ?? false
  const { container, item } = buildVariants(reduced)

  return (
    <section className="py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-start">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="max-w-2xl"
        >
          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span className="relative flex h-1.5 w-1.5">
                {!reduced && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              智能制造工程学生 · 2027 届 · 汕头
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter leading-[1.05] mb-5"
          >
            你好，我是
            <span className="text-accent"> 陈熙贤</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed mb-8"
          >
            机械 +
            <span className="text-foreground/80"> AI </span>
            的交叉实践者，关注 SolidWorks 结构设计、AI Agent 开发与 ROS2
            机器人项目。2027 届，目标进入工业 AI 与智能制造方向。
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-2">
            <Button
              size="lg"
              className="h-10 px-4"
              nativeButton={false}
              render={<Link href="/resume" />}
            >
              查看简历
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-10 px-4"
              nativeButton={false}
              render={<Link href="/portfolio" />}
            >
              作品集
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-10 px-4"
              nativeButton={false}
              render={
                <Link
                  href="https://github.com/23xxCh"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <svg className="mr-1.5 h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-10 px-4"
              nativeButton={false}
              render={<Link href="mailto:23xxchen@stu.edu.cn" />}
            >
              <Mail className="mr-1.5 h-4 w-4" />
              邮件
            </Button>
          </motion.div>
        </motion.div>

        <motion.aside
          initial="hidden"
          animate="show"
          variants={container}
          className="space-y-3"
        >
          <motion.div
            variants={item}
            className="rounded-xl border bg-card p-4 transition-colors hover:border-accent/40"
          >
            <div className="text-[11px] font-medium tracking-wide text-muted-foreground mb-2.5">
              状态
            </div>
            <div className="flex items-start gap-2.5">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <div>
                <div className="font-medium text-sm leading-snug">{status.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{status.sublabel}</div>
              </div>
            </div>
          </motion.div>

          {current && (
            <motion.div
              variants={item}
              className="group rounded-xl border bg-card p-4 transition-colors hover:border-accent/40"
            >
              <div className="text-[11px] font-medium tracking-wide text-muted-foreground mb-2.5">
                当前在做什么
              </div>
              <Link href={current.href} className="block">
                <div className="font-medium text-sm leading-snug group-hover:text-accent transition-colors">
                  {current.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1.5">{current.meta}</div>
              </Link>
            </motion.div>
          )}

          {latest && (
            <motion.div
              variants={item}
              className="group rounded-xl border bg-card p-4 transition-colors hover:border-accent/40"
            >
              <div className="text-[11px] font-medium tracking-wide text-muted-foreground mb-2.5">
                最新文章
              </div>
              <Link href={latest.href} className="block">
                <div className="font-medium text-sm leading-snug group-hover:text-accent transition-colors line-clamp-2">
                  {latest.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1.5">{latest.meta}</div>
              </Link>
            </motion.div>
          )}
        </motion.aside>
      </div>
    </section>
  )
}
