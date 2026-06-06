'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import { Bot, Cpu, ScanSearch } from 'lucide-react'

function buildVariants(reduced: boolean) {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
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

const tracks = [
  {
    title: '工业 AI Agent 主线',
    desc: '对应 AI 应用工程师、前沿部署工程师方向，重点是工业知识助手与任务执行原型。',
    icon: Bot,
  },
  {
    title: 'ROS2 与移动机器人',
    desc: '对应 ROS 开发工程师方向，重点是导航、路径规划和传感器集成。',
    icon: Cpu,
  },
  {
    title: '工业视觉与检测',
    desc: '对应智能制造、机械结构相关岗位，重点是检测场景与工程表达。',
    icon: ScanSearch,
  },
]

export function NowSection() {
  const reduced = useReducedMotion() ?? false
  const { container, item } = buildVariants(reduced)

  return (
    <section className="py-10 md:py-12">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr]"
      >
        <motion.div
          variants={item}
          className="rounded-[1.8rem] border border-border/70 bg-foreground px-6 py-6 text-background shadow-[0_24px_80px_rgba(34,30,24,0.16)]"
        >
          <div className="text-[11px] tracking-[0.08em] text-background/60">
            当前项目方向
          </div>
          <h2 className="balanced-headline mt-4 text-3xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-4xl">
            目前的项目实践
            <br />
            主要对应三类岗位。
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-background/72">
            方便招聘方快速判断岗位匹配度，我把项目集中在工业 AI、机器人和工业视觉三个方向。
          </p>
        </motion.div>

        <motion.div
          variants={item}
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {tracks.map(({ title, desc, icon: Icon }, index) => (
            <motion.div
              key={title}
              variants={item}
              className={`soft-panel rounded-[1.6rem] border border-border/70 p-5 shadow-[0_20px_60px_rgba(30,28,24,0.07)] ${
                index === 1 ? 'sm:translate-y-6' : ''
              } ${index === 2 ? 'xl:-translate-y-4' : ''}`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-background/75">
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mt-5 text-lg font-semibold leading-7">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
