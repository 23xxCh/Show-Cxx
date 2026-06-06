import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { BlogPostPreview } from '@/types/post'

interface PostCardProps {
  post: BlogPostPreview
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      {post.coverImage && (
        <Link href={`/blog/${post.slug}`}>
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      )}
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
            {post.title}
          </Link>
        </h3>
        <time className="text-sm text-muted-foreground">
          {new Date(post.date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {post.excerpt}
        </p>
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/blog?tag=${tag}`}>
                <Badge variant="secondary" className="text-xs hover:bg-accent-soft transition-colors">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
