import axios from 'axios';

// Types
interface Post {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    date: string;
    category: string;
    author?: string;
    published: boolean;
    sendAsNewsletter?: boolean;
}

interface ConvertKitResponse {
    broadcast: {
        id: number;
        created_at: string;
        subject: string;
        [key: string]: unknown;
    }
}

interface ConvertKitTag {
    id: number;
    name: string;
    created_at: string;
}

interface TagsResponse {
    tags: ConvertKitTag[];
}

const CONVERTKIT_API_URL = 'https://api.convertkit.com/v3';
const CONVERTKIT_API_SECRET = process.env.CONVERTKIT_API_SECRET;

/**
 * Sends a newsletter for a published post using ConvertKit API
 */
export async function sendNewsletterForPost(post: Post): Promise<{ broadcastId: number }> {
    try {
        // Create the newsletter content with your branding and styling
        const emailContent = createNewsletterContent(post);

        // Create the broadcast via API
        const response = await axios.post<ConvertKitResponse>(
            `${CONVERTKIT_API_URL}/broadcasts`,
            {
                api_secret: CONVERTKIT_API_SECRET,
                subject: post.title,
                content: emailContent,
                description: `Auto-generated newsletter for: ${post.title}`
            }
        );

        const broadcastId = response.data.broadcast.id;

        // Apply category-based targeting if needed
        if (post.category) {
            await applyCategoryTargeting(broadcastId, post.category);
        }

        // Send the broadcast immediately
        await axios.post(
            `${CONVERTKIT_API_URL}/broadcasts/${broadcastId}/send`,
            { api_secret: CONVERTKIT_API_SECRET }
        );

        return { broadcastId };
    } catch (error) {
        console.error('Error sending newsletter:', error);
        throw new Error(`Failed to create and send newsletter: ${error.message}`);
    }
}

/**
 * Create HTML content for the newsletter
 */
function createNewsletterContent(post: Post): string {
    // Format the publish date
    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Get the site URL from environment or default
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';
    const postUrl = `${siteUrl}/blog/${post.slug}`;

    // Create HTML content for the newsletter
    return `
    <html>
      <head>
        <title>${post.title}</title>
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #333;">${post.title}</h1>
          <p style="color: #666;">Published on ${formattedDate} by ${post.author || 'Zhaoyan Ji'}</p>
          <p style="color: #666;">Category: ${post.category}</p>
        </div>

        <div style="margin-bottom: 30px; padding: 15px; background-color: #f7f7f7; border-left: 4px solid #333;">
          <p style="font-style: italic; color: #555;">${post.excerpt}</p>
        </div>

        <div style="line-height: 1.6; color: #333;">
          ${post.content}
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
          <p>
            <a href="${postUrl}" style="display: inline-block; padding: 10px 20px; background-color: #333; color: white; text-decoration: none; border-radius: 4px;">
              Read the full article on my website
            </a>
          </p>
        </div>

        <div style="margin-top: 30px; font-size: 12px; color: #999; text-align: center;">
          <p>You're receiving this email because you subscribed to my newsletter.</p>
          <p>
            <a href="{{ unsubscribe_url }}" style="color: #999;">Unsubscribe</a>
          </p>
        </div>
      </body>
    </html>
  `;
}

/**
 * Apply targeting based on post category
 */
async function applyCategoryTargeting(broadcastId: number, category: string): Promise<void> {
    try {
        // Get all tags from ConvertKit
        const tagsResponse = await axios.get<TagsResponse>(
            `${CONVERTKIT_API_URL}/tags`,
            { params: { api_secret: CONVERTKIT_API_SECRET } }
        );

        const availableTags = tagsResponse.data.tags;

        // Map categories to tag names (customize this mapping as needed)
        const categoryToTagMap: Record<string, string> = {
            'AI & Tech': 'tech',
            'Investment & Market': 'investment',
            'Life & Beyond': 'lifestyle'
        };

        const tagName = categoryToTagMap[category];
        if (!tagName) return; // No mapping found

        // Find the tag ID
        const tag = availableTags.find((t: ConvertKitTag) => t.name.toLowerCase() === tagName.toLowerCase());
        if (!tag) return; // Tag not found

        // Set the recipients to only subscribers with this tag
        await axios.put(
            `${CONVERTKIT_API_URL}/broadcasts/${broadcastId}/recipients`,
            {
                api_secret: CONVERTKIT_API_SECRET,
                tag_ids: [tag.id]
            }
        );
    } catch (error) {
        console.error('Error applying category targeting:', error);
        // Continue without targeting if this fails
    }
}