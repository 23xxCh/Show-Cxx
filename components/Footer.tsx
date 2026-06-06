import Link from 'next/link'
import { Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="px-4 pb-6 pt-12 md:pb-8 md:pt-16">
      <div className="container mx-auto max-w-[1400px]">
        <div className="soft-panel rounded-[2rem] border border-border/70 px-6 py-6 shadow-[0_20px_60px_rgba(30,28,24,0.07)] md:px-8">
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <div>
              <div className="text-[11px] tracking-[0.08em] text-muted-foreground">
                页面说明
              </div>
              <h2 className="balanced-headline mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                这个页面主要用于补充简历中
                <br />
                与目标岗位相关的项目经历。
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                如果需要进一步了解项目背景、技术路线和实践内容，可以继续查看作品集、文章和笔记。
              </p>
            </div>

            <div className="md:justify-self-end">
              <div className="rounded-[1.5rem] border border-border/70 bg-background/70 p-4">
                <div className="text-[11px] tracking-[0.08em] text-muted-foreground">
                  联系方式
                </div>
                <div className="mt-3 space-y-2 text-sm">
                  <Link
                    href="mailto:23xxchen@stu.edu.cn"
                    className="flex items-center gap-2 text-foreground/82 transition-colors hover:text-accent"
                  >
                    <Mail className="h-4 w-4" />
                    23xxchen@stu.edu.cn
                  </Link>
                  <Link
                    href="https://github.com/23xxCh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-foreground/82 transition-colors hover:text-accent"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    github.com/23xxCh
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 border-t border-border/70 pt-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <span>&copy; {new Date().getFullYear()} 陈熙贤 · 个人创作空间</span>
            <span>智能制造 / 工业 AI / 机器人方向实习申请中</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
