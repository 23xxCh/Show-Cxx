---
title: "TypeScript 入门：从 interface 到泛型"
date: "2026-05-28"
excerpt: "TypeScript 的核心概念梳理，包括接口、类型别名、泛型、工具类型等，配合实际代码示例。"
tags: ["typescript", "入门", "教程"]
coverImage: "/images/typescript-basics.jpg"
published: true
---

## 什么是 TypeScript？

TypeScript 是 JavaScript 的**超集**，添加了静态类型系统。简单来说：

- JavaScript：运行时才发现类型错误
- TypeScript：编写时就能发现类型错误

```typescript
// JavaScript — 运行时报错
function add(a, b) {
  return a + b
}
add("hello", 1) // "hello1"，不是预期结果

// TypeScript — 编译时报错
function add(a: number, b: number): number {
  return a + b
}
add("hello", 1) // ❌ 类型错误：不能将 string 赋值给 number
```

## interface vs type

这是 TypeScript 初学者最常问的问题。

### interface：定义对象形状

```typescript
interface User {
  name: string
  age: number
  email?: string  // 可选属性
}

const user: User = {
  name: "张三",
  age: 25,
}
```

### type：类型别名

```typescript
type ID = string | number  // 联合类型
type Status = "active" | "inactive"  // 字面量类型
```

### 什么时候用哪个？

| 场景 | 推荐 |
|------|------|
| 定义对象结构 | `interface` |
| 联合类型 | `type` |
| 需要继承（extends） | `interface` |
| 需要映射类型 | `type` |

## 泛型（Generics）

泛型是 TypeScript 最强大的特性之一。它让你写出**可复用且类型安全**的函数。

### 基础泛型

```typescript
// 这个函数接受任意类型的数组，返回该类型的第一个元素
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0]
}

// TypeScript 自动推断 T 的类型
const num = getFirst([1, 2, 3])      // number | undefined
const str = getFirst(["a", "b"])     // string | undefined
```

### 泛型约束

```typescript
// 约束 T 必须有 length 属性
function logLength<T extends { length: number }>(item: T): T {
  console.log(item.length)
  return item
}

logLength("hello")     // ✅ string 有 length
logLength([1, 2, 3])   // ✅ 数组有 length
logLength(123)          // ❌ number 没有 length
```

## 工具类型（Utility Types）

TypeScript 内置了很多实用的工具类型。

### Omit — 移除属性

```typescript
interface BlogPost {
  slug: string
  title: string
  content: string
  date: string
}

// 创建一个不含 content 的类型
type PostPreview = Omit<BlogPost, 'content'>
// 等价于 { slug: string; title: string; date: string }
```

### Pick — 选取属性

```typescript
// 只选取 slug 和 title
type PostLink = Pick<BlogPost, 'slug' | 'title'>
```

### Partial — 全部变为可选

```typescript
// 所有属性都变成可选的
type UpdatePost = Partial<BlogPost>
```

## 实际应用：博客系统中的类型设计

在我们的博客项目中，类型设计是这样的：

```typescript
// 完整的博客文章类型
interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  coverImage?: string   // 可选：封面图
  published: boolean
  content: string
}

// 列表展示用，不需要 content
type BlogPostPreview = Omit<BlogPost, 'content'>

// 函数返回类型
interface PostsResult {
  posts: BlogPostPreview[]
  total: number
  tags: string[]
}
```

这样的设计确保了：
1. 列表页不会加载不必要的 `content`（性能优化）
2. TypeScript 会在编译时检查你是否正确使用了这些类型
3. IDE 能提供完整的自动补全

## 总结

TypeScript 的类型系统看起来复杂，但核心思想很简单：**在编写代码时就确保正确性**。通过 interface、泛型、工具类型的组合，你可以构建出既灵活又安全的代码。
