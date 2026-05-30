---
title: "React Hooks 速查"
date: "2026-05-28"
tags: ["react", "hooks"]
published: true
---

## useState

```typescript
const [count, setCount] = useState(0)
const [user, setUser] = useState<{ name: string } | null>(null)
```

## useEffect

```typescript
useEffect(() => {
  // 副作用
  return () => {
    // 清理
  }
}, [dependencies])
```

## useCallback vs useMemo

- `useCallback`: 缓存函数引用
- `useMemo`: 缓存计算结果

```typescript
const memoizedFn = useCallback(() => {
  doSomething(a, b)
}, [a, b])

const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b)
}, [a, b])
```
