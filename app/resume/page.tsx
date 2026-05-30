import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { resumeData } from '@/data/resume'
import { Mail, Phone, MapPin, Trophy, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: '简历',
  description: '个人简历与工作经历',
}

export default function ResumePage() {
  const { name, title, phone, email, github, location, summary, skills, workExperiences, education, awards } = resumeData

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* 头部 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">{name}</h1>
        <p className="text-xl text-muted-foreground mb-2">{title}</p>
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Phone className="h-3.5 w-3.5" />
            {phone}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {location}
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" render={<Link href={`mailto:${email}`} />} nativeButton={false}>
            <Mail className="mr-2 h-4 w-4" />
            {email}
          </Button>
          <Button variant="outline" size="sm" render={<Link href={github} target="_blank" rel="noopener noreferrer" />} nativeButton={false}>
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </Button>
        </div>
      </div>

      {/* 个人简介 */}
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-lg font-semibold">个人简介</h2>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{summary}</p>
        </CardContent>
      </Card>

      {/* 技能 */}
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-lg font-semibold">技能清单</h2>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h3 className="font-medium mb-2">{category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <span key={skill} className="text-sm bg-muted px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 工作经历 */}
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-lg font-semibold">工作经历</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          {workExperiences.map((exp, i) => (
            <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-full before:w-px before:bg-border">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <div>
                  <h3 className="font-medium">{exp.position}</h3>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                </div>
                <time className="text-sm text-muted-foreground">
                  {exp.startDate} — {exp.endDate}
                </time>
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {exp.description.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 教育背景 */}
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-lg font-semibold">教育背景</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          {education.map((edu, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-medium">{edu.school}</h3>
                <p className="text-sm text-muted-foreground">{edu.degree} · {edu.major}</p>
              </div>
              <time className="text-sm text-muted-foreground">
                {edu.startDate} — {edu.endDate}
              </time>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 荣誉奖项 */}
      {awards.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-lg font-semibold">荣誉奖项</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            {awards.map((award, i) => (
              <div key={i} className="flex items-start gap-2">
                <Trophy className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground">{award}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Button variant="ghost" render={<Link href="/" />} nativeButton={false}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        返回首页
      </Button>
    </div>
  )
}
