---
title: "个人全栈创作空间：技术选型与设计思路"
date: "2026-05-30"
excerpt: "用 Next.js + TypeScript 构建一个集博客、笔记、作品集、简历于一体的全栈项目，记录从零到一的过程。"
tags: ["nextjs", "typescript", "全栈"]
coverImage: "/images/project-intro.jpg"
published: true
---

## 为什么要做这个项目？

作为一个前端学习者，我一直想找一个能**完整练习 TypeScript** 的项目。不是那种 "Todo List" 级别的小 demo，而是能覆盖：

- 前端组件开发
- 后端 API 路由
- 数据库交互
- 类型系统设计

的综合性项目。

最终我决定做一个**个人全栈创作空间**，包含：

1. **博客系统** — 长文输出
2. **笔记系统** — 碎片知识记录
3. **作品集** — 项目展示
4. **简历** — 个人介绍

## 技术栈选择

### 框架：Next.js (App Router)

选择 Next.js 的原因很简单：**一个框架搞定全栈**。

- 前端：React 组件 + Tailwind CSS
- 后端：API Routes
- 渲染：SSG（静态生成）+ SSR（服务端渲染）

```typescript
// Next.js App Router 的页面组件就是一个普通的 React 组件
// params 和 searchParams 都有完整的 TypeScript 类型支持
export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // ...
}
```

### 语言：TypeScript

TypeScript 是这个项目的**核心学习目标**。通过实际项目练习：

- `interface` 和 `type` 的区别
- 泛型函数的设计
- 工具类型（`Omit`, `Pick`, `Partial`）
- 类型守卫和类型断言

### 样式：Tailwind CSS + shadcn/ui

Tailwind 让我能快速构建界面，shadcn/ui 提供了高质量的组件基础。

## 设计原则

1. **类型安全优先** — 能用 TypeScript 约束的就不用 `any`
2. **渐进式复杂度** — 先做简单版本，再逐步添加功能
3. **学习导向** — 每个模块都对应特定的 TypeScript 学习点

## 下一步

首先实现博客系统，这是最独立的模块，也是练习 TypeScript 最好的起点。
