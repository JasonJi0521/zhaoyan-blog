import { getPublishedPosts } from '@/lib/notion'

type NotionError = {
    message: string
    name: string
    stack?: string
}

export default async function TestPage() {
    try {
        const posts = await getPublishedPosts()

        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Notion Integration Test</h1>

                <div className="bg-green-100 dark:bg-green-900 p-4 mb-8 rounded">
                    <h2 className="font-semibold">✅ Successfully fetched {posts.length} posts</h2>
                </div>

                <div className="space-y-4">
                    {posts.map((post) => (
                        <div key={post.id} className="border p-4 rounded">
                            <h3 className="font-bold">{post.title}</h3>
                            <div className="text-sm text-muted-foreground space-y-1">
                                <p>Slug: {post.slug}</p>
                                <p>Category: {post.category}</p>
                                <p>Date: {new Date(post.date).toLocaleDateString()}</p>
                                <p>Featured: {post.featured ? 'Yes' : 'No'}</p>
                                <p>Description: {post.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    } catch (error) {
        const notionError = error as NotionError

        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Notion Integration Test</h1>

                <div className="bg-red-100 dark:bg-red-900 p-4 rounded">
                    <h2 className="font-semibold text-red-800 dark:text-red-200">❌ Error connecting to Notion</h2>
                    <pre className="mt-2 text-sm">{notionError.message}</pre>
                </div>
            </div>
        )
    }
}