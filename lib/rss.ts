import { Feed } from 'feed'
import { getAllPosts } from './posts'

/**
 * 生成 RSS Feed
 * 学习点：函数返回类型、异步操作
 */
export function generateRssFeed(): string {
  const { posts } = getAllPosts()

  const feed = new Feed({
    title: '个人创作空间',
    description: '一个集博客、笔记、作品集、简历于一体的全栈创作空间',
    id: 'https://your-domain.com',
    link: 'https://your-domain.com',
    language: 'zh-CN',
    copyright: `© ${new Date().getFullYear()} 个人创作空间`,
    feedLinks: {
      rss2: 'https://your-domain.com/feed.xml',
    },
  })

  // 添加每篇文章到 feed
  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `https://your-domain.com/blog/${post.slug}`,
      link: `https://your-domain.com/blog/${post.slug}`,
      description: post.excerpt,
      date: new Date(post.date),
      category: post.tags.map((tag) => ({ name: tag })),
    })
  })

  return feed.rss2()
}
