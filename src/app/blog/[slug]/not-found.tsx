import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
                <p className="text-muted-foreground mb-8">
                    Sorry, the blog post you're looking for doesn't exist.
                </p>
                <Link href="/">
                    <Button>Return Home</Button>
                </Link>
            </div>
        </div>
    )
}