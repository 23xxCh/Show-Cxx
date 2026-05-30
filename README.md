# 个人全栈创作空间

> 陈熙贤的个人作品集网站 — 集博客、笔记、作品集、简历于一体的全栈项目

**线上地址**: [show-cxx.pages.dev](https://show-cxx.pages.dev)

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 15 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS + shadcn/ui |
| 内容 | Markdown + gray-matter + remark/rehype |
| 代码高亮 | rehype-highlight (highlight.js) |
| 部署 | Cloudflare Pages |
| 包管理 | npm |

## 功能模块

- **博客** — 6 篇技术文章（AI Agent、机器视觉、工业AI、职业规划），支持标签筛选与分页
- **笔记** — 5 篇速查卡片（LangChain、YOLOv8、XGBoost、SPC、AI Agent工具链）
- **作品集** — 25+ 个项目展示，按 AI/机器视觉/工业/全栈/创意 分类
- **简历** — 完整个人信息、技能清单、工作经历、教育背景、荣誉奖项
- **全局搜索** — 跨博客、笔记、作品集的关键词搜索
- **深色模式** — Light/Dark/System 三种主题切换
- **RSS Feed** — `/feed.xml` 订阅源

## 项目结构

```
├── app/                    # Next.js 页面路由
│   ├── page.tsx            # 首页
│   ├── blog/               # 博客列表 + 文章详情
│   ├── notes/              # 笔记列表 + 笔记详情
│   ├── portfolio/          # 作品集
│   ├── resume/             # 简历
│   ├── search/             # 全局搜索
│   └── feed.xml/           # RSS Feed
├── components/             # React 组件
├── content/                # Markdown 内容
│   ├── blog/               # 博客文章
│   └── notes/              # 笔记
├── data/                   # 数据文件
│   ├── projects.ts         # 项目列表
│   └── resume.ts           # 简历数据
├── lib/                    # 工具函数
│   ├── posts.ts            # 博客解析
│   ├── notes.ts            # 笔记解析
│   ├── search.ts           # 全局搜索
│   └── rss.ts              # RSS 生成
├── types/                  # TypeScript 类型定义
├── scripts/                # 构建脚本
└── docs/                   # Agent 配置文档
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（端口 5000）
npm run dev

# 构建静态导出
npm run build
```

开发服务器运行在 `http://localhost:5000`。

## 内容管理

博客和笔记使用 Markdown 文件存储，修改后推送到 GitHub 即可自动部署。

**添加博客文章**：在 `content/blog/` 目录下创建 `.md` 文件：

```markdown
---
title: "文章标题"
date: "2026-05-30"
excerpt: "文章摘要"
tags: ["标签1", "标签2"]
published: true
---

正文内容...
```

**添加笔记**：在 `content/notes/` 目录下创建 `.md` 文件，格式类似。

**修改项目列表**：编辑 `data/projects.ts`

**修改简历信息**：编辑 `data/resume.ts`

## 部署

项目使用 Cloudflare Pages 部署，推送代码后自动构建：

```bash
git add -A
git commit -m "更新描述"
git push
```

## 作者

**陈熙贤** — 汕头大学 · 智能制造工程 · 2027届

- GitHub: [23xxCh](https://github.com/23xxCh)
- Email: 23xxchen@stu.edu.cn
