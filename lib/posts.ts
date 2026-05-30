import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { BlogPost, BlogPostPreview, PostsResult } from '@/types/post'

// Markdown 文件存放目录
const postsDirectory = path.join(process.cwd(), 'content/blog')

/**
 * 读取所有博客文章
 * 学习点：函数参数使用可选对象类型，返回值使用接口类型
 */
export function getAllPosts(options?: {
  tag?: string       // 按标签筛选
  page?: number      // 页码（从 1 开始）
  perPage?: number   // 每页数量
}): PostsResult {
  // 确保目录存在
  if (!fs.existsSync(postsDirectory)) {
    return { posts: [], total: 0, tags: [] }
  }

  // 读取所有 .md 文件
  const fileNames = fs.readdirSync(postsDirectory).filter(name => name.endsWith('.md'))

  // 解析每篇文章的 frontmatter
  // 学习点：map 函数的返回类型会自动推导
  const allPosts: BlogPostPreview[] = fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      // gray-matter 解析 frontmatter，返回 { data, content }
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        coverImage: data.coverImage,
        published: data.published !== false, // 默认为 true
      }
    })
    // 过滤未发布的文章
    .filter((post) => post.published)
    // 按日期降序排序（最新在前）
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // 收集所有标签（去重）
  // 学习点：flatMap + Set 去重
  const allTags = [...new Set(allPosts.flatMap((post) => post.tags))]

  // 按标签筛选
  let filteredPosts = allPosts
  if (options?.tag) {
    filteredPosts = allPosts.filter((post) =>
      post.tags.includes(options.tag!)
    )
  }

  // 分页
  const page = options?.page || 1
  const perPage = options?.perPage || 6
  const start = (page - 1) * perPage
  const paginatedPosts = filteredPosts.slice(start, start + perPage)

  return {
    posts: paginatedPosts,
    total: filteredPosts.length,
    tags: allTags,
  }
}

/**
 * 根据 slug 获取单篇文章
 * 学习点：返回类型使用联合类型 BlogPost | null
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  // 文件不存在时返回 null
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // 未发布的文章也返回 null
  if (data.published === false) {
    return null
  }

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    coverImage: data.coverImage,
    published: data.published !== false,
    content,
  }
}

/**
 * 获取所有标签
 */
export function getAllTags(): string[] {
  const { tags } = getAllPosts()
  return tags
}
