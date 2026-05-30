import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface TagFilterProps {
  tags: string[]       // 所有可用标签
  currentTag?: string  // 当前选中的标签
}

export function TagFilter({ tags, currentTag }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {/* "全部" 按钮 */}
      <Link href="/blog">
        <Badge
          variant={!currentTag ? 'default' : 'outline'}
          className="cursor-pointer hover:bg-blue-100 transition-colors"
        >
          全部
        </Badge>
      </Link>

      {/* 各标签按钮 */}
      {tags.map((tag) => (
        <Link key={tag} href={`/blog?tag=${tag}`}>
          <Badge
            variant={currentTag === tag ? 'default' : 'outline'}
            className="cursor-pointer hover:bg-blue-100 transition-colors"
          >
            {tag}
          </Badge>
        </Link>
      ))}
    </div>
  )
}
