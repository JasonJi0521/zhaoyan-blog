export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Not Found</h2>
            <p className="text-muted-foreground">
                {"We couldn't find the blog post you're looking for."}
            </p>
        </div>
    )
}