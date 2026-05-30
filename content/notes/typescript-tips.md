---
title: "TypeScript 实用技巧"
date: "2026-05-29"
tags: ["typescript", "技巧"]
published: true
---

## 1. 可选链和空值合并

```typescript
const user = { name: '张三', address: { city: '北京' } }

// 可选链：安全访问嵌套属性
const zip = user.address?.zip  // undefined（不报错）

// 空值合并：提供默认值
const city = user.address?.city ?? '未知'
```

## 2. 类型守卫

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

const result: unknown = 'hello'
if (isString(result)) {
  // 这里 result 被收窄为 string 类型
  console.log(result.toUpperCase())
}
```

## 3. 条件类型

```typescript
type IsArray<T> = T extends any[] ? true : false

type A = IsArray<string[]>  // true
type B = IsArray<number>    // false
```
