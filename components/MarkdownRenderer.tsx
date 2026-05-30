import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'

interface MarkdownRendererProps {
  content: string  // Markdown 原文
}

/**
 * 将 Markdown 字符串渲染为 HTML
 * 学习点：async 组件（服务端组件可以直接是 async）
 */
export async function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // 使用 unified 处理管线：Markdown → AST → HTML
  const result = await unified()
    .use(remarkParse)          // 解析 Markdown 为 AST
    .use(remarkGfm)            // 支持 GitHub 风格 Markdown（表格、删除线等）
    .use(remarkRehype)         // 将 Markdown AST 转换为 HTML AST
    .use(rehypeSlug)           // 给标题添加 id 属性
    .use(rehypeHighlight)      // 代码高亮
    .use(rehypeStringify)      // 将 HTML AST 转换为字符串
    .process(content)

  return (
    <article
      className="prose prose-slate max-w-none
        prose-headings:scroll-mt-20
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-slate-900 prose-pre:text-slate-100
        prose-img:rounded-lg"
      dangerouslySetInnerHTML={{ __html: String(result) }}
    />
  )
}
