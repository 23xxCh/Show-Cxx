import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'

interface MarkdownRendererProps {
  content: string
}

export async function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content)

  return (
    <article
      className="prose prose-neutral dark:prose-invert max-w-none
        prose-headings:scroll-mt-20
        prose-headings:text-foreground
        prose-p:text-foreground/84
        prose-li:text-foreground/84
        prose-ol:text-foreground/84
        prose-ul:text-foreground/84
        prose-strong:text-foreground
        prose-bullets:text-muted-foreground
        prose-hr:border-border
        prose-blockquote:border-l-accent/45
        prose-blockquote:text-foreground/78
        prose-a:text-accent prose-a:font-medium prose-a:no-underline hover:prose-a:underline
        prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-foreground
        prose-code:before:content-none prose-code:after:content-none
        prose-pre:border prose-pre:border-border prose-pre:bg-zinc-950 prose-pre:text-zinc-100
        prose-pre:shadow-[0_18px_60px_rgba(0,0,0,0.22)]
        prose-th:border-border prose-td:border-border
        prose-img:rounded-2xl
        dark:prose-headings:text-white
        dark:prose-p:text-white/86
        dark:prose-li:text-white/84
        dark:prose-ol:text-white/84
        dark:prose-ul:text-white/84
        dark:prose-strong:text-white
        dark:prose-blockquote:text-white/74
        dark:prose-code:bg-white/8
        dark:prose-code:text-white
        dark:prose-a:text-[oklch(0.84_0.09_95)]"
      dangerouslySetInnerHTML={{ __html: String(result) }}
    />
  )
}
