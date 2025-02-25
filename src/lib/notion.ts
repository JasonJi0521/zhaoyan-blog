import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

if (!process.env.NOTION_API_KEY) {
    throw new Error('NOTION_API_KEY is not set in environment variables')
}

if (!process.env.NOTION_DATABASE_ID) {
    throw new Error('NOTION_DATABASE_ID is not set in environment variables')
}

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
})

const n2m = new NotionToMarkdown({ notionClient: notion })

type NotionProperties = {
    Title: {
        id: string
        type: 'title'
        title: Array<{ plain_text: string }>
    }
    Date: {
        id: string
        type: 'date'
        date: { start: string } | null
    }
    Category: {
        id: string
        type: 'select'
        select: { name: string } | null
    }
    Slug: {
        id: string
        type: 'rich_text'
        rich_text: Array<{ plain_text: string }>
    }
    Description: {
        id: string
        type: 'rich_text'
        rich_text: Array<{ plain_text: string }>
    }
    Status: {
        id: string
        type: 'select'
        select: { name: string } | null
    }
}

export async function getPublishedPosts() {
    try {
        const response = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID!,
            filter: {
                property: 'Status',
                select: {
                    equals: 'Published',
                },
            },
            sorts: [
                {
                    property: 'Date',
                    direction: 'descending',
                },
            ],
        })

        return response.results.map((page) => {
            const pageObj = page as PageObjectResponse
            const props = pageObj.properties as unknown as NotionProperties

            try {
                return {
                    id: pageObj.id,
                    title: props.Title.title[0]?.plain_text || 'Untitled',
                    date: props.Date?.date?.start || new Date().toISOString().split('T')[0],
                    category: props.Category?.select?.name || 'Uncategorized',
                    slug: props.Slug?.rich_text[0]?.plain_text || pageObj.id,
                    description: props.Description?.rich_text[0]?.plain_text || 'No description available.',
                }
            } catch {
                // Removed unused error parameter
                console.error('Failed to process post:', pageObj.id)
                return {
                    id: pageObj.id,
                    title: 'Untitled Post',
                    date: new Date().toISOString().split('T')[0],
                    category: 'Uncategorized',
                    slug: pageObj.id,
                    description: 'No description available.',
                }
            }
        })
    } catch {
        // Removed unused error parameter
        console.error('Failed to fetch posts from Notion')
        return []
    }
}

export async function getPostBySlug(slug: string) {
    try {
        const response = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID!,
            filter: {
                property: 'Slug',
                rich_text: {
                    equals: slug,
                },
            },
        })

        if (!response.results[0]) {
            throw new Error('Post not found')
        }

        const page = response.results[0] as PageObjectResponse
        const props = page.properties as unknown as NotionProperties

        const mdBlocks = await n2m.pageToMarkdown(page.id)
        const markdown = n2m.toMarkdownString(mdBlocks)

        const metadata = {
            title: props.Title.title[0]?.plain_text || 'Untitled',
            date: props.Date?.date?.start || new Date().toISOString().split('T')[0],
            category: props.Category?.select?.name || 'Uncategorized',
            slug: props.Slug?.rich_text[0]?.plain_text || page.id,
            description: props.Description?.rich_text[0]?.plain_text || 'No description available.',
        }

        return {
            metadata,
            markdown: markdown.parent,
        }
    } catch {
        const errorMessage = `Failed to fetch post: ${slug}`
        console.error(errorMessage)
        throw new Error(errorMessage)
    }
}