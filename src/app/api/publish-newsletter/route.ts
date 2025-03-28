import { NextResponse } from 'next/server';
import { getPostContent } from '@/lib/notion';
import { sendNewsletterForPost } from '@/lib/convertkit';

export async function POST(request: Request) {
    try {
        // Extract content type to handle different request formats
        const contentType = request.headers.get('content-type') || '';
        let body;
        let pageId = null;

        // Parse the request body based on content type
        if (contentType.includes('application/json')) {
            // Handle JSON requests (both Notion webhooks and Pipedream)
            const rawText = await request.text();
            body = JSON.parse(rawText);

            console.log('Received webhook payload:', JSON.stringify(body));

            // Check request source and extract page ID
            if (body.webhook_id === 'pipedream' && body.id) {
                // This is from Pipedream
                pageId = body.id;
                console.log('Request from Pipedream with page ID:', pageId);
            }
            else if (body.id) {
                // Some other source that provides an ID directly
                pageId = body.id;
                console.log('Request with direct ID:', pageId);
            }
            else if (body.webhook_id && body.object === 'page' && body.id) {
                // Standard Notion webhook
                pageId = body.id;
                console.log('Standard Notion webhook with page ID:', pageId);
            }
        } else {
            // Unsupported content type
            return NextResponse.json({
                error: 'Unsupported content type. Please use application/json'
            }, { status: 400 });
        }

        // Check if we have a page ID
        if (!pageId) {
            console.log('No page ID found in request');
            return NextResponse.json({
                error: 'No page ID found in request body',
                receivedBody: body
            }, { status: 400 });
        }

        // Get the post content
        console.log('Fetching post content for page ID:', pageId);
        const post = await getPostContent(pageId);

        // Skip if not published or not marked for newsletter
        if (!post.published || !post.sendAsNewsletter) {
            console.log('Post skipped: published=', post.published, 'sendAsNewsletter=', post.sendAsNewsletter);
            return NextResponse.json({
                message: 'Post skipped: not published or not marked for newsletter',
                status: 'skipped'
            });
        }

        // Send the newsletter using ConvertKit
        console.log('Sending newsletter for post:', post.title);
        const result = await sendNewsletterForPost(post);

        console.log('Newsletter sent successfully with broadcast ID:', result.broadcastId);
        return NextResponse.json({
            message: 'Newsletter created and sent successfully',
            broadcastId: result.broadcastId,
            status: 'success'
        });
    } catch (error) {
        console.error('Error processing webhook:', error);

        // Safely handle the error - casting to any known error type with a message property
        const errorMessage = error instanceof Error
            ? error.message
            : 'Unknown error occurred';

        return NextResponse.json(
            { error: 'Failed to process webhook', details: errorMessage },
            { status: 500 }
        );
    }
}