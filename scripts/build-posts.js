const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

// 生成博客文章 JSON
const postsDirectory = path.join(__dirname, '..', 'content/blog')
const postsOutput = path.join(__dirname, '..', 'content', 'blog', 'posts.json')

if (fs.existsSync(postsDirectory)) {
  const fileNames = fs.readdirSync(postsDirectory).filter(name => name.endsWith('.md'))
  const posts = fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        coverImage: data.coverImage,
        published: data.published !== false,
      }
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  fs.writeFileSync(postsOutput, JSON.stringify(posts, null, 2))
  console.log(`Generated ${posts.length} posts`)
} else {
  fs.writeFileSync(postsOutput, '[]')
}

// 生成笔记 JSON
const notesDirectory = path.join(__dirname, '..', 'content/notes')
const notesOutput = path.join(__dirname, '..', 'content', 'notes', 'notes.json')

if (fs.existsSync(notesDirectory)) {
  const fileNames = fs.readdirSync(notesDirectory).filter(name => name.endsWith('.md'))
  const notes = fileNames
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
  fs.writeFileSync(notesOutput, JSON.stringify(notes, null, 2))
  console.log(`Generated ${notes.length} notes`)
} else {
  fs.writeFileSync(notesOutput, '[]')
}
