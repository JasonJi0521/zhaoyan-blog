import { NextResponse } from 'next/server';
import { getPostContent } from '@/lib/notion'; // Assuming you have this function
import { sendNewsletterForPost } from '@/lib/convertkit';
import * as crypto from 'crypto';

export async function POST(request: Request) {
    try {
        // Get raw request body for signature verification
        const rawBody = await request.text();
        const body = JSON.parse(rawBody);

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

        // Extract the page ID from the Notion webhook payload
        // For page.update events, the structure is:
        // { "object": "page", "id": "page-id", "webhook_id": "...", "request_id": "...", ... }

        // Check if this is the right event type
        if (body.webhook_id && body.object === 'page' && body.id) {
            const pageId = body.id;

            // Get the full post content from Notion
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
        } else {
            console.log('Unhandled webhook event type:', body);
            return NextResponse.json({ message: 'Unhandled event type', status: 'skipped' });
        }

    } catch (error) {
        console.error('Error processing webhook:', error);
        return NextResponse.json(
            { error: 'Failed to process webhook', details: error.message },
            { status: 500 }
        );
    }
}