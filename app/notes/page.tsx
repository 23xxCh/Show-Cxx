import { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getAllNotes } from '@/lib/notes'

export const metadata: Metadata = {
  title: '笔记',
  description: '碎片知识记录，公开的数字花园',
}

export default function NotesPage() {
  const { notes } = getAllNotes()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">笔记</h1>
      <p className="text-muted-foreground mb-8">
        碎片知识记录，类似公开的数字花园
      </p>

      {notes.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <Link key={note.id} href={`/notes/${note.id}`}>
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <h3 className="font-semibold hover:text-blue-600 transition-colors">
                    {note.title}
                  </h3>
                  <time className="text-sm text-muted-foreground">
                    {new Date(note.date).toLocaleDateString('zh-CN')}
                  </time>
                </CardHeader>
                <CardContent>
                  {note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {note.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-12">
          暂无笔记
        </p>
      )}
    </div>
  )
}
