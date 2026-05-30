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
  { href: '/blog', label: '博客' },
  { href: '/notes', label: '笔记' },
  { href: '/portfolio', label: '作品集' },
  { href: '/resume', label: '简历' },
] as const

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-lg">创作空间</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-foreground/80 ${
                isActive(item.href)
                  ? 'text-foreground font-semibold'
                  : 'text-foreground/60'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center ml-auto space-x-2">
          {/* 搜索按钮 */}
          <Button variant="ghost" size="icon" render={<Link href="/search" />} nativeButton={false}>
            <Search className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          {/* 移动端汉堡菜单 */}
          <div className="flex md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger render={<Button variant="ghost" size="icon" />}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">打开菜单</span>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>导航</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`text-lg transition-colors hover:text-foreground/80 ${
                        isActive(item.href)
                          ? 'text-foreground font-semibold'
                          : 'text-foreground/60'
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
    </header>
  )
}
