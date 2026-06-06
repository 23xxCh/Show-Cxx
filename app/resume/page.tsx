import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { resumeData } from '@/data/resume'
import {
  ArrowLeft,
  BookOpen,
  BriefcaseBusiness,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Trophy,
  UserRound,
} from 'lucide-react'

export const metadata: Metadata = {
  title: '简历',
  description: '陈熙贤的在线简历，聚焦智能制造、机械结构、工业 AI 与 ROS 方向实习申请。',
}

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: typeof UserRound
  title: string
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-accent" />
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  )
}

export default function ResumePage() {
  const {
    name,
    title,
    phone,
    email,
    github,
    website,
    location,
    graduation,
    summary,
    jobTargets,
    strengths,
    skills,
    projectExperiences,
    workExperiences,
    education,
    awards,
  } = resumeData

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-10">
      <div className="mb-8 rounded-3xl border bg-card p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex rounded-full border px-3 py-1 text-xs text-muted-foreground">
              {graduation} · 实习简历
            </div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">{name}</h1>
            <p className="mb-4 text-lg text-muted-foreground">{title}</p>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
              {summary}
            </p>
          </div>

          <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2 lg:w-[320px] lg:grid-cols-1">
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {phone}
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {email}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {location}
            </span>
            <span className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              汕头大学 · 智能制造工程
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="outline" size="sm" render={<Link href={`mailto:${email}`} />} nativeButton={false}>
            <Mail className="mr-2 h-4 w-4" />
            联系我
          </Button>
          <Button variant="outline" size="sm" render={<Link href={github} target="_blank" rel="noopener noreferrer" />} nativeButton={false}>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </Button>
          <Button variant="outline" size="sm" render={<Link href={website} target="_blank" rel="noopener noreferrer" />} nativeButton={false}>
            <ExternalLink className="mr-2 h-4 w-4" />
            个人网站
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_2.05fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <SectionTitle icon={Rocket} title="求职意向" />
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {jobTargets.map((target) => (
                <span key={target} className="rounded-full bg-muted px-3 py-1.5 text-sm">
                  {target}
                </span>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <SectionTitle icon={UserRound} title="个人优势" />
            </CardHeader>
            <CardContent className="space-y-3">
              {strengths.map((strength) => (
                <div key={strength} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <p className="leading-6">{strength}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <SectionTitle icon={GraduationCap} title="教育背景" />
            </CardHeader>
            <CardContent className="space-y-5">
              {education.map((edu) => (
                <div key={`${edu.school}-${edu.startDate}`} className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-medium">{edu.school}</h3>
                    <p className="text-sm text-muted-foreground">
                      {edu.degree} · {edu.major}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>

                  {edu.details && (
                    <div className="space-y-2">
                      {edu.details.map((detail) => (
                        <p key={detail} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  )}

                  {edu.courses && edu.courses.length > 0 && (
                    <div>
                      <div className="mb-2 text-sm font-medium">核心课程</div>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course) => (
                          <span key={course} className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <SectionTitle icon={BookOpen} title="专业技能" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <h3 className="mb-2 text-sm font-medium">{category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((skill) => (
                      <span key={skill} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <SectionTitle icon={Trophy} title="荣誉奖项" />
            </CardHeader>
            <CardContent className="space-y-3">
              {awards.map((award) => (
                <div key={award} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
                  <p className="leading-6">{award}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <SectionTitle icon={Rocket} title="项目经历" />
            </CardHeader>
            <CardContent className="space-y-5">
              {projectExperiences.map((project) => (
                <div key={project.name} className="rounded-2xl border bg-background/40 p-4">
                  <div className="flex flex-col gap-3 border-b pb-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-base font-semibold">{project.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {project.role}
                        {project.period ? ` · ${project.period}` : ''}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" render={<Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" />} nativeButton={false}>
                          GitHub
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button variant="outline" size="sm" render={<Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" />} nativeButton={false}>
                          在线查看
                        </Button>
                      )}
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.summary}</p>

                  <div className="mt-4 space-y-2">
                    {project.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                        <p className="leading-6">{highlight}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.assetUrl && (
                    <p className="mt-4 text-xs text-muted-foreground">
                      相关材料路径：{project.assetUrl}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <SectionTitle icon={BriefcaseBusiness} title="实习经历" />
            </CardHeader>
            <CardContent className="space-y-5">
              {workExperiences.map((exp) => (
                <div key={`${exp.company}-${exp.startDate}`} className="rounded-2xl border bg-background/40 p-4">
                  <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-base font-semibold">{exp.position}</h3>
                      <p className="text-sm text-muted-foreground">
                        {exp.company}
                        {exp.location ? ` · ${exp.location}` : ''}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                  <div className="space-y-2">
                    {exp.description.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                        <p className="leading-6">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button variant="ghost" render={<Link href="/" />} nativeButton={false}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回首页
          </Button>
        </div>
      </div>
    </div>
  )
}
