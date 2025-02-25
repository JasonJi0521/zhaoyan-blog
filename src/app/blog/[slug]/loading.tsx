export default function Loading() {
    return (
        <div className="min-h-screen pb-16">
            <nav className="border-b mb-8">
                <div className="container mx-auto px-4 py-4">
                    <div className="h-7 w-24 bg-muted animate-pulse rounded" />
                </div>
            </nav>

            <article className="container mx-auto px-4">
                <header className="max-w-4xl mx-auto mb-12">
                    <div className="h-6 w-24 bg-muted animate-pulse rounded mb-4" />
                    <div className="h-12 bg-muted animate-pulse rounded mb-4" />
                    <div className="h-6 w-32 bg-muted animate-pulse rounded" />
                </header>

                <div className="max-w-4xl mx-auto space-y-4">
                    <div className="h-4 bg-muted animate-pulse rounded" />
                    <div className="h-4 bg-muted animate-pulse rounded" />
                    <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                </div>
            </article>
        </div>
    )
}