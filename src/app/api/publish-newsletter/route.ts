import { NextResponse } from 'next/server';
import { getPostContent } from '@/lib/notion';
import { sendNewsletterForPost } from '@/lib/convertkit';
import * as crypto from 'crypto';

export async function POST(request: Request) {
    try {
        // Get raw request body for signature verification
        const rawBody = await request.text();
        const body = JSON.parse(rawBody);

        // Check if this is from Pipedream (using a webhook_id identifier)
        const isPipedream = body.webhook_id === 'pipedream';

        // Only verify the signature for actual Notion webhooks
        if (!isPipedream) {
            // Verify Notion webhook signature
            const signature = request.headers.get('x-notion-signature');
            const timestamp = request.headers.get('x-notion-timestamp');

            // Compute expected signature
            const secret = process.env.NOTION_WEBHOOK_SECRET || '';
            const signatureData = timestamp + rawBody;
            const expectedSignature = crypto
                .createHmac('sha256', secret)
                .update(signatureData)
                .digest('hex');

            // Verify signature
            if (signature !== expectedSignature) {
                return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
            }
        }

        // Extract the page ID
        let pageId;

        if (isPipedream) {
            // Get page ID from the Pipedream payload
            pageId = body.id;
        } else if (body.webhook_id && body.object === 'page' && body.id) {
            // Standard Notion webhook format
            pageId = body.id;
        } else {
            console.log('Unhandled webhook event type:', body);
            return NextResponse.json({ message: 'Unhandled event type', status: 'skipped' });
        }

        if (!pageId) {
            return NextResponse.json({ error: 'Missing page ID' }, { status: 400 });
        }

        // Get the post content
        const post = await getPostContent(pageId);

        // Skip if not published or not marked for newsletter
        if (!post.published || !post.sendAsNewsletter) {
            return NextResponse.json({
                message: 'Post skipped: not published or not marked for newsletter',
                status: 'skipped'
            });
        }

        // Send the newsletter using ConvertKit
        const result = await sendNewsletterForPost(post);

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