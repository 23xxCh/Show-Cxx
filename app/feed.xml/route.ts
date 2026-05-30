import { generateRssFeed } from '@/lib/rss'

/**
 * RSS Feed 路由处理
 * 学习点：Next.js Route Handlers，GET 请求处理
 */
export async function GET() {
  const rss = generateRssFeed()

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
