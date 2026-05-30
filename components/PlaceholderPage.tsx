import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Construction } from 'lucide-react'

interface PlaceholderPageProps {
  title: string         // 页面标题
  description: string   // 页面描述
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <Construction className="h-16 w-16 text-muted-foreground mb-6" />
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        {description}
      </p>
      <Button nativeButton={false} render={<Link href="/" />}>
        返回首页
      </Button>
    </div>
  )
}
