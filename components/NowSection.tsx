'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'

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
        hidden: { opacity: 0, y: 8 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      }
  return { container, item }
}

export function NowSection() {
  const reduced = useReducedMotion() ?? false
  const { container, item } = buildVariants(reduced)

  return (
    <section className="py-10">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="rounded-xl border bg-accent-soft p-6 sm:p-8"
      >
        <motion.h2
          variants={item}
          className="text-2xl font-bold tracking-tight mb-4"
        >
          目前在做
        </motion.h2>

        <motion.div variants={item} className="space-y-3 text-sm leading-relaxed">
          <div className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
            <div>
              <span className="font-medium">工业 AI Agent 方向</span>
              <span className="text-muted-foreground">，继续用 LangChain + RAG 搭建工业知识助手，补足多 Agent 协作和 Tool Use 经验。</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
            <div>
              <span className="font-medium">ROS2 机器人项目</span>
              <span className="text-muted-foreground">，围绕小车导航、路径规划和传感器集成继续打磨实战能力。</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
            <div>
              <span className="font-medium">工业视觉探索</span>
              <span className="text-muted-foreground">，把 YOLOv8 缺陷检测和 MiniMax LLM 报告生成继续做成更完整的原型。</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-5 pt-4 border-t border-foreground/8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            寻找实习 / 项目机会
          </span>
          <span>工业 AI · 智能制造 · 机器人方向</span>
          <span>2027 届 · 汕头大学</span>
        </motion.div>
      </motion.div>
    </section>
  )
}
