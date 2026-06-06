'use client'

import Link from 'next/link'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { ArrowRight, Mail, MapPin, Sparkle, Workflow } from 'lucide-react'
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
        hidden: { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        },
      }

  return { container, item }
}

const keywords = ['工业 AI', '智能制造', 'ROS2', '机械结构', '数字孪生']
const jobTargets = ['智能制造工程师', 'AI 应用工程师', 'ROS 开发工程师', '机械结构工程师']

export function Hero({ status, current, latest }: HeroProps) {
  const reduced = useReducedMotion() ?? false
  const { container, item } = buildVariants(reduced)

  return (
    <section className="relative overflow-hidden py-8 md:py-14">
      <div className="industrial-grid-bg noise-overlay absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-accent/12 to-transparent" />

      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[1.28fr_0.72fr] lg:gap-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="soft-panel rounded-[2rem] border border-border/70 px-6 py-7 shadow-[0_24px_80px_rgba(30,28,24,0.08)] md:px-8 md:py-9"
        >
          <motion.div variants={item} className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-[11px] font-medium tracking-[0.08em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              2027 届实习申请
            </span>
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              汕头 / 东莞 / 广州 / 深圳
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="balanced-headline max-w-4xl text-[2.9rem] font-semibold leading-[0.98] tracking-[-0.06em] text-foreground sm:text-[4.4rem] lg:text-[5.8rem]"
          >
            面向智能制造、
            <span className="italic text-accent"> 工业 AI </span>
            与
            <span className="italic text-accent"> 机器人方向</span>
            的实习作品集。
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-[34rem] text-base leading-8 text-muted-foreground sm:text-lg"
          >
            汕头大学智能制造工程专业，2027 届。项目实践主要集中在工业 AI、ROS2
            机器人、机械结构与数字孪生方向。
          </motion.p>

          <motion.div variants={item} className="mt-7 flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-border/70 bg-background/75 px-3 py-1.5 text-sm text-foreground/80"
              >
                {keyword}
              </span>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-6">
            <div className="mb-2 text-sm font-medium text-foreground/80">适合岗位</div>
            <div className="flex flex-wrap gap-2">
              {jobTargets.map((role) => (
                <span
                  key={role}
                  className="rounded-full border border-border/70 bg-accent/8 px-3 py-1.5 text-sm text-foreground"
                >
                  {role}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="h-11 rounded-full px-5 text-sm"
              nativeButton={false}
              render={<Link href="/resume" />}
            >
              查看简历
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 rounded-full px-5 text-sm"
              nativeButton={false}
              render={<Link href="/portfolio" />}
            >
              查看项目
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-11 rounded-full px-5 text-sm"
              nativeButton={false}
              render={<Link href="mailto:23xxchen@stu.edu.cn" />}
            >
              <Mail className="mr-1.5 h-4 w-4" />
              发邮件
            </Button>
          </motion.div>
        </motion.div>

        <motion.aside
          initial="hidden"
          animate="show"
          variants={container}
          className="grid gap-4"
        >
          <motion.div
            variants={item}
            className="soft-panel rounded-[1.75rem] border border-border/70 p-5 shadow-[0_20px_60px_rgba(30,28,24,0.07)]"
          >
              <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                <Sparkle className="h-3.5 w-3.5 text-accent" />
                求职状态
              </div>
            <div className="space-y-3">
              <div>
                <div className="text-base font-semibold leading-6">{status.label}</div>
                <div className="mt-1 text-sm leading-6 text-muted-foreground">{status.sublabel}</div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-2xl border border-border/70 bg-background/65 p-3">
                  <div className="text-[11px] tracking-[0.08em] text-muted-foreground">目标岗位</div>
                  <div className="mt-1 text-sm font-medium">工业 AI / 机器人 / 机械结构</div>
                </div>
                <div className="rounded-2xl border border-border/70 bg-background/65 p-3">
                  <div className="text-[11px] tracking-[0.08em] text-muted-foreground">毕业时间</div>
                  <div className="mt-1 text-sm font-medium">2027 届本科</div>
                </div>
              </div>
            </div>
          </motion.div>

          {current && (
            <motion.div
              variants={item}
              className="rounded-[1.75rem] border border-border/70 bg-foreground px-5 py-5 text-background shadow-[0_24px_80px_rgba(34,30,24,0.18)]"
            >
              <div className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-background/65">
                <Workflow className="h-3.5 w-3.5" />
                当前重点项目
              </div>
              <Link href={current.href} className="block">
                <div className="text-lg font-semibold leading-7">{current.title}</div>
                <div className="mt-2 text-sm leading-6 text-background/70">{current.meta}</div>
              </Link>
            </motion.div>
          )}

          {latest && (
            <motion.div
              variants={item}
              className="soft-panel rounded-[1.75rem] border border-border/70 p-5 shadow-[0_20px_60px_rgba(30,28,24,0.07)]"
            >
              <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                最新文章
              </div>
              <Link href={latest.href} className="block">
                <div className="text-base font-semibold leading-6">{latest.title}</div>
                <div className="mt-2 text-sm leading-6 text-muted-foreground">{latest.meta}</div>
              </Link>
            </motion.div>
          )}
        </motion.aside>
      </div>
    </section>
  )
}
