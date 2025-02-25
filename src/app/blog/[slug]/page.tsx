import { getPostBySlug } from '@/lib/notion'
import { CalendarDays } from 'lucide-react'
import Markdown from 'react-markdown'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function BlogPost({ params }: { params: { slug: string } }) {
    try {
        const { metadata, markdown } = await getPostBySlug(params.slug)

        const getCategoryColor = (category: string) => {
            switch (category) {
                case 'AI & Tech':
                    return '#002FA7'
                case 'Investment & Market':
                    return '#B8860B'
                case 'Life & Beyond':
                    return '#2AAA8A'
                default:
                    return '#002FA7'
            }
        }

        const categoryColor = getCategoryColor(metadata.category)

        if (!markdown) {
            return notFound()
        }

        return (
            <div className="min-h-screen pb-16">
                {/* Navigation Bar */}
                <nav className="border-b mb-8">
                    <div className="container mx-auto px-4 py-4">
                        <Link href="/" className="text-xl font-bold">
                            My Blog
                        </Link>
                    </div>
                </nav>

                <article className="container mx-auto px-4">
                    {/* Header */}
                    <header className="max-w-4xl mx-auto mb-12">
                        <div
                            className="text-sm font-medium mb-4"
                            style={{ color: categoryColor }}
                        >
                            {metadata.category}
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight mb-4">
                            {metadata.title}
                        </h1>
                        <div className="flex items-center text-muted-foreground">
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {new Date(metadata.date).toLocaleDateString()}
                        </div>
                    </header>

                    {/* Content */}
                    <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                        <Markdown>
                            {markdown}
                        </Markdown>
                    </div>
                </article>
            </div>
        )
    } catch (error) {
        console.error('Error in blog post page:', error)
        return notFound()
    }
}