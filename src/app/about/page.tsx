import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Linkedin, Mail, Briefcase, GraduationCap, Building } from "lucide-react"

export default function About() {
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
                        <Link href="/about" className="hover:text-primary font-medium text-primary">
                            About
                        </Link>
                        <Link href="/contact" className="hover:text-primary">
                            Contact
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-12">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Zhaoyan Ji</h1>
                    <div className="flex space-x-4 mt-4">
                        <a
                            href="https://www.linkedin.com/in/zhaoyanji0521/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center hover:text-primary transition-colors"
                        >
                            <Linkedin className="h-5 w-5 mr-2" />
                            <span>LinkedIn</span>
                        </a>
                        <div className="flex items-center">
                            <Mail className="h-5 w-5 mr-2 text-primary" />
                            <span>zhaoyanji0521@gmail.com</span>
                        </div>
                    </div>
                </div>

                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>About Me</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                            Hi there! I'm Zhaoyan Ji, a passionate explorer at the intersection of technology, finance, and personal
                            growth.
                            <br />
                            <br />
                            With a background in Computer Science from Peking University and an MBA from Columbia Business School,
                            I've built a career that spans consulting, investment analysis, and AI research.
                            <br />
                            <br />
                            My professional journey has taken me from BCG where I developed strategic solutions across various
                            industries, to investment analysis on AI companies at Etna Research, and to help OpenAI train Deep
                            Research product with my consulting/ finance knowledge.
                            <br />
                            <br />
                            I'm passionate about leveraging technology and business insights to drive innovation and create meaningful
                            impact.
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-end pt-4 border-t">
                        <Link href="/contact">
                            <Button size="lg" className="transition-all hover:translate-x-1">
                                Get In Touch
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </section>

            {/* Professional Experience Section */}
            <section className="container mx-auto px-4 py-12">
                <div className="flex items-center gap-3 mb-8">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">Professional Experience</h2>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* OpenAI Experience */}
                    <Card className="group relative flex flex-col overflow-hidden transition-all hover:shadow-lg border-2 border-[#002FA7]/20 hover:border-[#002FA7]">
                        <CardHeader className="flex-grow space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-sm font-medium text-[#002FA7]">Oct 2024 - Present · 6 mos</div>
                                    <CardTitle className="mt-2">Expert Model Trainer</CardTitle>
                                    <div className="text-sm text-muted-foreground mt-1">OpenAI Deep Research · Contract</div>
                                </div>
                                <div className="bg-[#002FA7]/10 p-3 rounded-full">
                                    <Building className="h-6 w-6 text-[#002FA7]" />
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">New York City Metropolitan Area · Remote</p>
                            <p className="text-sm">
                                Contributed my Consulting/Finance expertise to OpenAI's Deep Research product – an AI tool pushing the
                                boundaries of research and analysis
                            </p>
                        </CardHeader>
                    </Card>

                    {/* Etna Research Experience */}
                    <Card className="group relative flex flex-col overflow-hidden transition-all hover:shadow-lg border-2 border-[#B8860B]/20 hover:border-[#B8860B]">
                        <CardHeader className="flex-grow space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-sm font-medium text-[#B8860B]">Jun 2024 - Aug 2024 · 3 mos</div>
                                    <CardTitle className="mt-2">Investment Analyst Intern</CardTitle>
                                    <div className="text-sm text-muted-foreground mt-1">Etna Research · Internship</div>
                                </div>
                                <div className="bg-[#B8860B]/10 p-3 rounded-full">
                                    <Building className="h-6 w-6 text-[#B8860B]" />
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">Palo Alto, California, United States · Hybrid</p>
                            <p className="text-sm">
                                During my internship at Etna Research, I had the opportunity to work closely with AI-native investors
                                and engineers. I conducted market research, financial analysis, and assisted in creating investment
                                strategies for groundbreaking AI companies. My role involved supporting the team in identifying
                                investment opportunities and evaluating risks for portfolio management.
                            </p>
                        </CardHeader>
                    </Card>

                    {/* BCG Senior Associate Experience */}
                    <Card className="group relative flex flex-col overflow-hidden transition-all hover:shadow-lg border-2 border-[#2AAA8A]/20 hover:border-[#2AAA8A]">
                        <CardHeader className="flex-grow space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-sm font-medium text-[#2AAA8A]">Nov 2022 - Jul 2023 · 9 mos</div>
                                    <CardTitle className="mt-2">Senior Associate</CardTitle>
                                    <div className="text-sm text-muted-foreground mt-1">Boston Consulting Group (BCG) · Full-time</div>
                                </div>
                                <div className="bg-[#2AAA8A]/10 p-3 rounded-full">
                                    <Building className="h-6 w-6 text-[#2AAA8A]" />
                                </div>
                            </div>
                            <p className="text-sm">
                                Multiple projects across different types of Strategic & Operation case. Extensive experience in market
                                assessment, customer research, competitive study, data analytics, financial modeling and GTM strategy.
                                <br />
                                <br />- Developed digital-driven growth strategy for sportswear retailer with 5-yr strategic planning,
                                financial forecast and KPIs allocation
                                <br />- Implemented AI-driven sales optimization strategy for an education solution provider
                                <br />- Designed branding strategy for a HK based fashion retailer and innovative business model
                                <br />- Created new product GTM strategy for a world-leading beauty & skincare company
                                <br />- Developed transformation strategy for a world leading retailer company
                            </p>
                        </CardHeader>
                    </Card>

                    {/* BCG Associate Experience */}
                    <Card className="group relative flex flex-col overflow-hidden transition-all hover:shadow-lg border-2 border-primary/20 hover:border-primary">
                        <CardHeader className="flex-grow space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-sm font-medium text-primary">Oct 2020 - Dec 2022 · 2 yrs 3 mos</div>
                                    <CardTitle className="mt-2">Associate</CardTitle>
                                    <div className="text-sm text-muted-foreground mt-1">Boston Consulting Group (BCG)</div>
                                </div>
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <Building className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">Beijing, China</p>
                        </CardHeader>
                    </Card>
                </div>
            </section>

            {/* Education Section */}
            <section className="container mx-auto px-4 py-12">
                <div className="flex items-center gap-3 mb-8">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">Education</h2>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* Columbia Business School */}
                    <Card className="group relative flex flex-col overflow-hidden transition-all hover:shadow-lg border-2 border-[#002FA7]/20 hover:border-[#002FA7]">
                        <CardHeader className="flex-grow space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-sm font-medium text-[#002FA7]">Aug 2023 - May 2025</div>
                                    <CardTitle className="mt-2">Columbia Business School</CardTitle>
                                    <div className="text-sm text-muted-foreground mt-1">Master of Business Administration - MBA</div>
                                </div>
                                <div className="bg-[#002FA7]/10 p-3 rounded-full">
                                    <GraduationCap className="h-6 w-6 text-[#002FA7]" />
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Peking University */}
                    <Card className="group relative flex flex-col overflow-hidden transition-all hover:shadow-lg border-2 border-[#B8860B]/20 hover:border-[#B8860B]">
                        <CardHeader className="flex-grow space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-sm font-medium text-[#B8860B]">2016 - 2020</div>
                                    <CardTitle className="mt-2">Peking University</CardTitle>
                                    <div className="text-sm text-muted-foreground mt-1">Bachelor of Science - BS, Computer Science</div>
                                </div>
                                <div className="bg-[#B8860B]/10 p-3 rounded-full">
                                    <GraduationCap className="h-6 w-6 text-[#B8860B]" />
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                </div>
            </section>

            {/* Skills & Interests Section */}
            <section className="container mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold mb-8">Skills & Interests</h2>
                <Card>
                    <CardContent className="pt-6">
                        <div className="grid gap-8 md:grid-cols-2">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Professional Skills</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-[#002FA7]"></div>
                                        <span>Strategic Planning & Business Development</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-[#002FA7]"></div>
                                        <span>Financial Analysis & Modeling</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-[#002FA7]"></div>
                                        <span>Market Research & Competitive Analysis</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-[#002FA7]"></div>
                                        <span>AI & Machine Learning Applications</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-[#002FA7]"></div>
                                        <span>Data Analytics & Visualization</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Interests</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-[#B8860B]"></div>
                                        <span>Emerging Technologies & AI Advancements</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-[#B8860B]"></div>
                                        <span>Investment Strategies & Market Trends</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-[#B8860B]"></div>
                                        <span>Global Travel & Cultural Exploration</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-[#B8860B]"></div>
                                        <span>Personal Growth & Continuous Learning</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </main>
    )
}

