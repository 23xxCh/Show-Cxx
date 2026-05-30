import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">
        页面不存在
      </p>
      <Button nativeButton={false} render={<Link href="/" />}>
        返回首页
      </Button>
    </div>
  )
}
