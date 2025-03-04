import { NextResponse } from "next/server"

export async function GET() {
    // Only log that variables exist, not their values (for security)
    const formIdExists = !!process.env.CONVERTKIT_FORM_ID
    const apiKeyExists = !!process.env.CONVERTKIT_API_KEY

    console.log("Environment variables check:")
    console.log("CONVERTKIT_FORM_ID exists:", formIdExists)
    console.log("CONVERTKIT_API_KEY exists:", apiKeyExists)

    return NextResponse.json({
        convertKitFormIdExists: formIdExists,
        convertKitApiKeyExists: apiKeyExists,
    })
}

