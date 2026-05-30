'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  id: string      // 标题的 id（由 rehype-slug 生成）
  text: string    // 标题文本
  level: number   // 标题级别（2 或 3）
}

interface TableOfContentsProps {
  content: string  // Markdown 原文
}

/**
 * 从 Markdown 内容中提取 h2 和 h3 标题
 * 学习点：正则表达式匹配、数组方法链式调用
 */
function extractHeadings(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: TocItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length  // ## = 2, ### = 3
    const text = match[2].trim()
    // 生成 id（与 rehype-slug 的逻辑一致）
    const id = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w一-鿿-]/g, '')

    headings.push({ id, text, level })
  }

  return headings
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const headings = extractHeadings(content)
  const [activeId, setActiveId] = useState<string>('')

  // 使用 IntersectionObserver 监听当前阅读位置
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )

    // 观察所有标题元素
    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-auto" aria-label="文章目录">
      <p className="mb-3 text-sm font-semibold text-foreground">目录</p>
      <ul className="space-y-1.5 text-sm">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: heading.level === 3 ? '1rem' : '0' }}
          >
            <a
              href={`#${heading.id}`}
              className={`block py-0.5 transition-colors hover:text-foreground ${
                activeId === heading.id
                  ? 'text-blue-600 font-medium'
                  : 'text-muted-foreground'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
