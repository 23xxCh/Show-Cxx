import { getAllPosts } from './posts'
import { getAllNotes } from './notes'
import { projects } from '@/data/projects'

export interface SearchResult {
  type: 'blog' | 'note' | 'project'
  title: string
  excerpt: string
  url: string
  tags: string[]
}

/**
 * 全局搜索
 * 学习点：联合类型、数组方法链、类型守卫
 */
export function globalSearch(query: string): SearchResult[] {
  const results: SearchResult[] = []

  // 搜索博客文章
  const { posts } = getAllPosts()
  posts.forEach((post) => {
    if (
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
    ) {
      results.push({
        type: 'blog',
        title: post.title,
        excerpt: post.excerpt,
        url: `/blog/${post.slug}`,
        tags: post.tags,
      })
    }
  })

  // 搜索笔记
  const { notes } = getAllNotes()
  notes.forEach((note) => {
    if (
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
    ) {
      results.push({
        type: 'note',
        title: note.title,
        excerpt: note.tags.join(', '),
        url: `/notes/${note.id}`,
        tags: note.tags,
      })
    }
  })

  // 搜索作品集
  projects.forEach((project) => {
    if (
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase()) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(query.toLowerCase()))
    ) {
      results.push({
        type: 'project',
        title: project.title,
        excerpt: project.description,
        url: '/portfolio',
        tags: project.techStack,
      })
    }
  })

  return results
}
