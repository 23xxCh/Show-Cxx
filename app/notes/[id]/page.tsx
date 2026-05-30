import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { getNoteById, getAllNotes } from '@/lib/notes'
import { ArrowLeft } from 'lucide-react'

interface NotePageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const { notes } = getAllNotes()
  return notes.map((note) => ({ id: note.id }))
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { id } = await params
  const note = getNoteById(id)
  if (!note) return { title: '笔记未找到' }
  return { title: note.title, description: note.tags.join(', ') }
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params
  const note = getNoteById(id)

  if (!note) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button variant="ghost" render={<Link href="/notes" />} nativeButton={false} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        返回笔记列表
      </Button>

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-3">{note.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <time>
            {new Date(note.date).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {note.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          )}
        </div>
      </header>

      <MarkdownRenderer content={note.content} />
    </div>
  )
}
