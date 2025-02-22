import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, ChevronRight } from "lucide-react"

export default function Home() {
  const posts = [
    {
      title: "Getting Started with Web Development",
      date: "2024-02-21",
      excerpt: "Learn the fundamentals of web development and start your journey as a developer.",
      slug: "getting-started",
    },
    {
      title: "Building Modern Applications",
      date: "2024-02-20",
      excerpt: "Explore the latest technologies and best practices for building modern web applications.",
      slug: "modern-apps",
    },
    {
      title: "The Future of Technology",
      date: "2024-02-19",
      excerpt: "A look into emerging technologies and their potential impact on our future.",
      slug: "future-tech",
    },
  ]

  return (
    <main className="min-h-screen">
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Welcome to My Personal Blog</h1>
            <p className="text-xl text-muted-foreground">
              Sharing thoughts and experiences about technology, development, and life.
            </p>
            <Button size="lg">
              Read Latest Posts
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240821232934.jpg-A6dJEzI5ROjgSL0GbHelt39ZAKFL1B.jpeg"
              alt="Profile photo"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="container mx-auto px-4 py-16 space-y-8">
        <h2 className="text-3xl font-bold tracking-tighter">Latest Posts</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {post.date}
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <Button variant="ghost" size="sm">
                    Read More
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}

