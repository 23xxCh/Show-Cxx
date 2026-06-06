import { Hero } from '@/components/Hero'
import { FeaturedProjects } from '@/components/FeaturedProjects'
import { LatestPosts } from '@/components/LatestPosts'
import { NowSection } from '@/components/NowSection'
import { getAllPosts } from '@/lib/posts'
import { projects } from '@/data/projects'

export default function HomePage() {
  const { posts } = getAllPosts({ perPage: 5 })
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3)
  const latestPost = posts[0]

  return (
    <div className="container mx-auto px-4 py-8">
      <Hero
        status={{
          label: '2027 届，寻找工业 AI / 机器人方向实习',
          sublabel: '汕头大学 · 智能制造工程 · 挑战杯广东省一等奖',
        }}
        current={{
          title: 'OpenClaw 工业 AI Agent',
          href: '/portfolio',
          meta: 'LangChain + RAG + 多 Agent 协作',
        }}
        latest={
          latestPost
            ? {
                title: latestPost.title,
                href: `/blog/${latestPost.slug}`,
                meta: new Date(latestPost.date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }),
              }
            : undefined
        }
      />

      <NowSection />

      <FeaturedProjects projects={featuredProjects} />

      <LatestPosts posts={posts} />
    </div>
  )
}
