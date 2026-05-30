// 博客文章的完整类型
// 学习点：interface 定义对象的形状，每个属性都有明确的类型
export interface BlogPost {
  slug: string           // URL 路径标识，如 "hello-world"
  title: string          // 文章标题
  date: string           // 发布日期，格式 "2026-05-30"
  excerpt: string        // 一句话摘要
  tags: string[]         // 标签数组，如 ["typescript", "nextjs"]
  coverImage?: string    // 封面图路径，? 表示可选属性
  published: boolean     // 是否发布，false 为草稿
  content: string        // Markdown 原文内容
}

// 列表展示用的类型，不含 content 字段
// 学习点：Omit 工具类型，从 BlogPost 中移除指定字段
export type BlogPostPreview = Omit<BlogPost, 'content'>

// getAllPosts 的返回类型
export interface PostsResult {
  posts: BlogPostPreview[]  // 文章列表
  total: number             // 总文章数（用于分页计算）
  tags: string[]            // 所有标签（用于标签筛选）
}
