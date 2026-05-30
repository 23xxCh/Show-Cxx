import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PostCard } from '@/components/PostCard'
import { getAllPosts } from '@/lib/posts'
import { getAllNotes } from '@/lib/notes'
import { projects } from '@/data/projects'
import { Mail, ArrowRight } from 'lucide-react'

const categoryLabels: Record<string, string> = {
  fullstack: '全栈',
  ai: 'AI',
  robotics: '机器人',
  mechanical: '机械',
  data: '数据',
  other: '其他',
}

export default function HomePage() {
  const { posts } = getAllPosts({ perPage: 3 })
  const { notes } = getAllNotes()
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero 区域 */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mb-6 flex items-center justify-center text-white text-2xl font-bold">
            陈
          </div>
          <h1 className="text-4xl font-bold mb-2">
            你好，我是 <span className="text-blue-600">陈熙贤</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            汕头大学 · 智能制造工程 · 2027届
          </p>
          <p className="text-lg text-muted-foreground mb-6">
            机械设计 × AI开发 × 机器人。擅长SolidWorks/CREO结构设计，热衷于AI Agent与ROS2机器人开发。
            挑战杯广东省一等奖获得者，GitHub 20+ 开源项目。
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant="secondary">智能制造</Badge>
            <Badge variant="secondary">AI Agent</Badge>
            <Badge variant="secondary">ROS2</Badge>
            <Badge variant="secondary">SolidWorks</Badge>
            <Badge variant="secondary">Python</Badge>
          </div>
          <div className="flex items-center flex-wrap gap-3">
            <Button nativeButton={false} render={<Link href="/resume" />}>
              查看简历 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button nativeButton={false} variant="outline" render={<Link href="/portfolio" />}>
              作品集
            </Button>
            <Button nativeButton={false} variant="outline" render={<Link href="https://github.com/23xxCh" target="_blank" rel="noopener noreferrer" />}>
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </Button>
            <Button nativeButton={false} variant="outline" render={<Link href="mailto:23xxchen@stu.edu.cn" />}>
              <Mail className="mr-2 h-4 w-4" />
              联系我
            </Button>
          </div>
        </div>
      </section>

      {/* 精选项目 */}
      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">精选项目</h2>
          <Button nativeButton={false} variant="ghost" render={<Link href="/portfolio" />}>
            查看全部 <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold">{project.title}</h3>
                <Badge variant="outline" className="text-xs">{categoryLabels[project.category]}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.techStack.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 最新文章 */}
      {posts.length > 0 && (
        <section className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">最新文章</h2>
            <Button nativeButton={false} variant="ghost" render={<Link href="/blog" />}>
              查看全部 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
