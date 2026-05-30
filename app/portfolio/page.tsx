import { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { projects } from '@/data/projects'
import { ExternalLink, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: '作品集',
  description: '个人项目展示 — AI Agent、机器视觉、工业AI、全栈开发',
}

const categoryLabels: Record<string, string> = {
  ai: 'AI / 机器视觉',
  robotics: '机器人 / 嵌入式',
  data: '工业 / 数据分析',
  fullstack: '全栈开发',
  mechanical: '机械设计',
  other: '创意工具',
}

const categoryOrder = ['ai', 'robotics', 'data', 'fullstack', 'other']

export default function PortfolioPage() {
  const featured = projects.filter((p) => p.featured)
  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    label: categoryLabels[cat],
    items: projects.filter((p) => p.category === cat && !p.featured),
  })).filter((g) => g.items.length > 0)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">作品集</h1>
        <p className="text-muted-foreground">
          {projects.length} 个项目 — 涵盖 AI Agent、机器视觉、工业数据分析、全栈开发
        </p>
      </div>

      {/* Featured Projects */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          精选项目
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow border-yellow-200 dark:border-yellow-800">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {categoryLabels[project.category]}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    {project.githubUrl && (
                      <Button variant="ghost" size="icon" render={<Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" />} nativeButton={false}>
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button variant="ghost" size="icon" render={<Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" />} nativeButton={false}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* All Projects by Category */}
      {grouped.map((group) => (
        <section key={group.category} className="mb-10">
          <h2 className="text-xl font-bold mb-4">{group.label}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {group.items.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold">{project.title}</h3>
                    <div className="flex gap-1 shrink-0">
                      {project.githubUrl && (
                        <Button variant="ghost" size="icon" render={<Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" />} nativeButton={false}>
                          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button variant="ghost" size="icon" render={<Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" />} nativeButton={false}>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.techStack.length - 4}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
