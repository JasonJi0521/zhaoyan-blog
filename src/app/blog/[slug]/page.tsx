import { Metadata } from 'next'
import { getPostBySlug } from '@/lib/notion'
import { CalendarDays } from 'lucide-react'
import Markdown from 'react-markdown'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    try {
        const resolvedParams = await params
        const { metadata } = await getPostBySlug(resolvedParams.slug)
        return {
            title: metadata.title,
            description: metadata.description,
        }
    } catch {
        return {
            title: 'Post Not Found',
            description: 'The blog post could not be found',
        }
    }
}

export default async function BlogPost({ params }: PageProps) {
    try {
        const resolvedParams = await params
        const { metadata, markdown } = await getPostBySlug(resolvedParams.slug)

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
                {/* Navigation */}
                <nav className="border-b">
                    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                        <Link href="/" className="text-xl font-bold">
                            My Blog
                        </Link>
                        <div className="space-x-6">
                            <Link href="/blog" className="hover:text-primary">
                                Blog
                            </Link>
                            <Link href="/about" className="hover:text-primary">
                                About
                            </Link>
                            <Link href="/contact" className="hover:text-primary">
                                Contact
                            </Link>
                        </div>
                    </div>
                </nav>

                <main className="container mx-auto px-4 py-8">
                    {/* Back button */}
                    <div className="mb-8">
                        <Link href="/blog">
                            <Button variant="ghost" className="pl-0 hover:pl-2 transition-all">
                                ← Back to Blog
                            </Button>
                        </Link>
                    </div>

                    {/* Article Header */}
                    <article className="max-w-3xl mx-auto">
                        <header className="mb-8">
                            <div
                                className="text-sm font-medium mb-2"
                                style={{ color: categoryColor }}
                            >
                                {metadata.category}
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight mb-4">
                                {metadata.title}
                            </h1>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <CalendarDays className="mr-2 h-4 w-4" />
                                {new Date(metadata.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </header>

                        {/* Article Content */}
                        <Card>
                            <CardHeader>
                                <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                        {metadata.description}
                                    </p>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none dark:prose-invert">
                                    <Markdown>{markdown}</Markdown>
                                </div>
                            </CardContent>
                        </Card>
                    </article>
                </main>
            </div>
        )
    } catch {
        return notFound()
    }
}