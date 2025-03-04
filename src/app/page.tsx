import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, ChevronRight, Linkedin, Mail } from 'lucide-react'
import { getPublishedPosts } from '@/lib/notion'
import NewsletterSubscription from "@/components/newsletter-subscription"

type Post = {
  id: string
  title: string
  date: string
  category: string
  slug: string
  description: string
}

export default async function Home() {
  const posts: Post[] = await getPublishedPosts();

  // Get one post from each category for featured posts
  const aiTechPost = posts.find(post => post.category === 'AI & Tech');
  const investmentPost = posts.find(post => post.category === 'Investment & Market');
  const lifePost = posts.find(post => post.category === 'Life & Beyond');

  // Check if no posts are available
  const hasNoPosts = !aiTechPost && !investmentPost && !lifePost;

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Main page
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

      {/* Hero Section with Photo and About */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-[300px_1fr] gap-8 items-start">
          {/* Photo Column */}
          <div className="flex flex-col items-center space-y-8">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-primary/10">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240821232934.jpg-A6dJEzI5ROjgSL0GbHelt39ZAKFL1B.jpeg"
                  alt="Profile photo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="text-center w-full">
              <h1 className="text-3xl font-bold tracking-tight">Zhaoyan Ji</h1>
              {/* Social Links Section */}
              <div className="flex flex-col space-y-2 mt-4 items-center">
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/zhaoyanji0521/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5 mr-2" />
                  <span>LinkedIn</span>
                </a>

                {/* Email */}
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-primary" />
                  <span>zhaoyanji0521@gmail.com</span>
                </div>

                {/* Contact page link */}
                <p className="text-sm text-muted-foreground mt-1">
                  <Link href="/contact" className="hover:underline">
                    See Contact page for more
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground leading-relaxed">
                Hi there! I&apos;m Zhaoyan Ji, a passionate explorer at the intersection of technology, finance, and personal growth.
                <br /><br />
                Through this blog, I share my insights and experiences in the following areas:
                <br /><br />
                1. Tech & AI: industry developments and new product launch, reflection on key players&apos; competitive strategies
                <br /><br />
                2. Investment & Market: individual stock investment analysis, investment methodology reflection, and macro market observation
                <br /><br />
                3. Life & Beyond: reflections on travel, personal growth, and the pursuit of meaningful experiences
              </p>
            </CardContent>
            <CardFooter className="flex justify-end pt-4 border-t">
              <Link href="/blog">
                <Button size="lg" className="transition-all hover:translate-x-1">
                  Read Latest Posts
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Newsletter Section - ADD THIS SECTION */}
      <section className="container mx-auto px-4 py-12 border-t">
        <div className="max-w-xl mx-auto">
          <NewsletterSubscription />
        </div>
      </section>
      {/* End of Newsletter Section */}

      {/* Featured Posts */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Featured Posts</h2>
        {hasNoPosts ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts available at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {/* AI & Tech Post */}
            {aiTechPost && (
              <Card className="group relative flex flex-col overflow-hidden transition-all hover:shadow-lg border-2 border-[#002FA7]/20 hover:border-[#002FA7]">
                <CardHeader className="flex-grow space-y-4">
                  <div className="text-sm font-medium text-[#002FA7]">{aiTechPost.category}</div>
                  <CardTitle className="line-clamp-2 transition-colors group-hover:text-[#002FA7]">
                    {aiTechPost.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">{aiTechPost.description}</p>
                </CardHeader>
                <CardFooter className="flex justify-between border-t bg-muted/50">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {new Date(aiTechPost.date).toLocaleDateString()}
                  </div>
                  <Link href={`/blog/${aiTechPost.slug}`}>
                    <Button variant="ghost" size="sm" className="group-hover:text-[#002FA7]">
                      Read More
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )}

            {/* Investment & Market Post */}
            {investmentPost && (
              <Card className="group relative flex flex-col overflow-hidden transition-all hover:shadow-lg border-2 border-[#B8860B]/20 hover:border-[#B8860B]">
                <CardHeader className="flex-grow space-y-4">
                  <div className="text-sm font-medium text-[#B8860B]">{investmentPost.category}</div>
                  <CardTitle className="line-clamp-2 transition-colors group-hover:text-[#B8860B]">
                    {investmentPost.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">{investmentPost.description}</p>
                </CardHeader>
                <CardFooter className="flex justify-between border-t bg-muted/50">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {new Date(investmentPost.date).toLocaleDateString()}
                  </div>
                  <Link href={`/blog/${investmentPost.slug}`}>
                    <Button variant="ghost" size="sm" className="group-hover:text-[#B8860B]">
                      Read More
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )}

            {/* Life & Beyond Post */}
            {lifePost && (
              <Card className="group relative flex flex-col overflow-hidden transition-all hover:shadow-lg border-2 border-[#2AAA8A]/20 hover:border-[#2AAA8A]">
                <CardHeader className="flex-grow space-y-4">
                  <div className="text-sm font-medium text-[#2AAA8A]">{lifePost.category}</div>
                  <CardTitle className="line-clamp-2 transition-colors group-hover:text-[#2AAA8A]">
                    {lifePost.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">{lifePost.description}</p>
                </CardHeader>
                <CardFooter className="flex justify-between border-t bg-muted/50">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {new Date(lifePost.date).toLocaleDateString()}
                  </div>
                  <Link href={`/blog/${lifePost.slug}`}>
                    <Button variant="ghost" size="sm" className="group-hover:text-[#2AAA8A]">
                      Read More
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )}
          </div>
        )}
      </section>
    </main>
  )
}