import Link from "next/link"
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, ChevronRight } from 'lucide-react'
import { getPublishedPosts } from "@/lib/notion"

export default async function BlogPage() {
    const posts = await getPublishedPosts()

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

    return (
        <main className="min-h-screen pb-16">
            {/* Navigation */}
            <nav className="border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold">
                        My Blog
                    </Link>
                    <div className="space-x-6">
                        <Link href="/blog" className="text-primary">
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

            {/* Blog Posts List */}
            <section className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>

                    <div className="space-y-6">
                        {posts.map((post) => {
                            const categoryColor = getCategoryColor(post.category)

                            return (
                                <Card key={post.id} className="group relative flex flex-col overflow-hidden transition-all hover:shadow-lg border-2 border-muted hover:border-primary">
                                    <CardHeader className="flex-grow space-y-4">
                                        <div
                                            className="text-sm font-medium"
                                            style={{ color: categoryColor }}
                                        >
                                            {post.category}
                                        </div>
                                        <CardTitle className="text-2xl transition-colors group-hover:text-primary">
                                            {post.title}
                                        </CardTitle>
                                        <p className="text-muted-foreground">
                                            {post.description}
                                        </p>
                                    </CardHeader>
                                    <CardFooter className="flex justify-between border-t bg-muted/50">
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <CalendarDays className="mr-2 h-4 w-4" />
                                            {new Date(post.date).toLocaleDateString()}
                                        </div>
                                        <Link href={`/blog/${post.slug}`}>
                                            <Button variant="ghost" size="sm" className="group-hover:text-primary">
                                                Read More
                                                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>
        </main>
    )
}