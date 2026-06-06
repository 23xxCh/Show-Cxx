import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface TagFilterProps {
  tags: string[]
  currentTag?: string
}

export function TagFilter({ tags, currentTag }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link href="/blog">
        <Badge
          variant={!currentTag ? 'default' : 'outline'}
          className="cursor-pointer hover:bg-blue-100 transition-colors"
        >
          全部
        </Badge>
      </Link>

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
