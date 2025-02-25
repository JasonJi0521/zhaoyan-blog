import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <main className="min-h-screen pb-16">
            <nav className="border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="text-xl font-bold">My Blog</div>
                    <div className="space-x-6">
                        <span className="text-primary">Blog</span>
                        <span className="text-muted-foreground">About</span>
                        <span className="text-muted-foreground">Contact</span>
                    </div>
                </div>
            </nav>

            <section className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>

                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="relative flex flex-col overflow-hidden">
                                <CardHeader className="flex-grow space-y-4">
                                    <Skeleton className="h-4 w-20" />
                                    <CardTitle>
                                        <Skeleton className="h-8 w-4/5" />
                                    </CardTitle>
                                    <Skeleton className="h-20 w-full" />
                                </CardHeader>
                                <CardFooter className="flex justify-between border-t bg-muted/50">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-9 w-24" />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}