import { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { projects } from '@/data/projects'
import { ExternalLink, FolderKanban, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: '作品集',
  description: '陈熙贤的项目作品集，覆盖工业 AI、数字孪生、机器人、机械设计与数据分析。',
}

const categoryLabels: Record<string, string> = {
  ai: '工业 AI / 智能体',
  robotics: '机器人 / 嵌入式',
  data: '工业数据 / 预测分析',
  fullstack: '数字孪生 / 全栈系统',
  mechanical: '机械设计 / 工程实践',
  other: '效率工具 / 其他探索',
}

const categoryOrder = ['ai', 'robotics', 'data', 'fullstack', 'mechanical', 'other']

export default function PortfolioPage() {
  const featured = projects.filter((project) => project.featured)
  const grouped = categoryOrder
    .map((category) => ({
      category,
      label: categoryLabels[category],
      items: projects.filter((project) => project.category === category && !project.featured),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <div className="container mx-auto px-4 py-8 md:py-10">
      <div className="mb-8 max-w-3xl">
        <div className="mb-3 inline-flex rounded-full border px-3 py-1 text-xs text-muted-foreground">
          面向实习申请整理的项目作品集
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">作品集</h1>
        <p className="text-sm leading-7 text-muted-foreground md:text-base">
          围绕智能制造、工业 AI、数字孪生、机器人和机械工程方向，整理了公开仓库、本地原型和课程项目。
          每个项目都尽量标注了来源与可访问链接，方便招聘方快速判断可验证材料。
        </p>
      </div>

      <section className="mb-12">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
          <Star className="h-5 w-5 text-yellow-500" />
          精选项目
        </h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((project) => (
            <Card key={project.id} className="flex h-full flex-col rounded-2xl border-yellow-200 shadow-sm transition-shadow hover:shadow-md dark:border-yellow-900/70">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold leading-snug">{project.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {categoryLabels[project.category]}
                      </Badge>
                      {project.sourceLabel && (
                        <Badge variant="outline" className="text-xs">
                          {project.sourceLabel}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <FolderKanban className="h-5 w-5 shrink-0 text-muted-foreground" />
                </div>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col">
                <p className="mb-3 text-sm leading-6 text-muted-foreground">{project.description}</p>

                {project.sourceNote && (
                  <p className="mb-4 text-xs leading-5 text-muted-foreground">
                    {project.sourceNote}
                  </p>
                )}

                <div className="mb-5 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      render={<Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" />}
                      nativeButton={false}
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                      GitHub
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      size="sm"
                      render={<Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" />}
                      nativeButton={false}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      在线查看
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {grouped.map((group) => (
        <section key={group.category} className="mb-10">
          <h2 className="mb-4 text-xl font-bold">{group.label}</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {group.items.map((project) => (
              <Card key={project.id} className="flex h-full flex-col rounded-2xl transition-shadow hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold leading-snug">{project.title}</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.sourceLabel && (
                          <Badge variant="outline" className="text-[11px]">
                            {project.sourceLabel}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      {project.githubUrl && (
                        <Button
                          variant="ghost"
                          size="icon"
                          render={<Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" />}
                          nativeButton={false}
                        >
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button
                          variant="ghost"
                          size="icon"
                          render={<Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" />}
                          nativeButton={false}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col">
                  <p className="mb-3 text-sm leading-6 text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>

                  {project.sourceNote && (
                    <p className="mb-4 text-xs leading-5 text-muted-foreground line-clamp-3">
                      {project.sourceNote}
                    </p>
                  )}

                  <div className="mt-auto flex flex-wrap gap-1">
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
