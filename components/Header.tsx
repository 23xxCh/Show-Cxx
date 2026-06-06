'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const navItems = [
  { href: '/', label: '首页' },
  { href: '/portfolio', label: '作品集' },
  { href: '/resume', label: '简历' },
  { href: '/blog', label: '博客' },
  { href: '/notes', label: '笔记' },
] as const

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4">
      <div className="container mx-auto max-w-[1400px]">
        <div className="soft-panel flex h-16 items-center justify-between rounded-full border border-border/70 px-3 shadow-[0_18px_50px_rgba(30,28,24,0.07)]">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-full pl-2 pr-2 transition-opacity hover:opacity-90"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-xs font-semibold tracking-[0.18em] text-background">
                CX
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold tracking-[-0.02em]">陈熙贤</div>
                <div className="text-[11px] tracking-[0.08em] text-muted-foreground">
                  智能制造 / 工业 AI / 机器人
                </div>
              </div>
            </Link>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive(item.href)
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:bg-background/80 hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              render={<Link href="/search" />}
              nativeButton={false}
            >
              <Search className="h-4.5 w-4.5" />
            </Button>
            <ThemeToggle />

            <div className="flex md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger render={<Button variant="ghost" size="icon" className="rounded-full" />}>
                  <Menu className="h-4.5 w-4.5" />
                  <span className="sr-only">打开菜单</span>
                </SheetTrigger>
                <SheetContent side="right" className="border-l-border/70">
                  <SheetHeader>
                    <SheetTitle>导航</SheetTitle>
                  </SheetHeader>
                  <nav className="mt-8 flex flex-col gap-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`rounded-2xl px-4 py-3 text-base transition-colors ${
                          isActive(item.href)
                            ? 'bg-foreground text-background'
                            : 'text-foreground/78 hover:bg-muted'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
