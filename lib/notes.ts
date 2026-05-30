import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// 笔记的类型定义
export interface Note {
  id: string
  title: string
  date: string
  tags: string[]
  content: string
  published: boolean
}

export type NotePreview = Omit<Note, 'content'>

const notesDirectory = path.join(process.cwd(), 'content/notes')

/**
 * 获取所有笔记
 */
export function getAllNotes(options?: {
  tag?: string
  page?: number
  perPage?: number
}): { notes: NotePreview[]; total: number; tags: string[] } {
  if (!fs.existsSync(notesDirectory)) {
    return { notes: [], total: 0, tags: [] }
  }

  const fileNames = fs.readdirSync(notesDirectory).filter(name => name.endsWith('.md'))

  const allNotes: NotePreview[] = fileNames
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(notesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        id,
        title: data.title || '',
        date: data.date || '',
        tags: data.tags || [],
        published: data.published !== false,
      }
    })
    .filter((note) => note.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const allTags = [...new Set(allNotes.flatMap((note) => note.tags))]

  let filteredNotes = allNotes
  if (options?.tag) {
    filteredNotes = allNotes.filter((note) => note.tags.includes(options.tag!))
  }

  const page = options?.page || 1
  const perPage = options?.perPage || 10
  const start = (page - 1) * perPage
  const paginatedNotes = filteredNotes.slice(start, start + perPage)

  return {
    notes: paginatedNotes,
    total: filteredNotes.length,
    tags: allTags,
  }
}

/**
 * 根据 ID 获取单条笔记
 */
export function getNoteById(id: string): Note | null {
  const fullPath = path.join(notesDirectory, `${id}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  if (data.published === false) {
    return null
  }

  return {
    id,
    title: data.title || '',
    date: data.date || '',
    tags: data.tags || [],
    published: data.published !== false,
    content,
  }
}
