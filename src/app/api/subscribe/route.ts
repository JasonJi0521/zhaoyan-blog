import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { email } = await request.json()

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 })
        }

        // Get API credentials from environment variables
        const FORM_ID = process.env.CONVERTKIT_FORM_ID
        const API_KEY = process.env.CONVERTKIT_API_KEY

        if (!FORM_ID || !API_KEY) {
            return NextResponse.json({ message: "ConvertKit configuration is missing" }, { status: 500 })
        }

        const API_URL = `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                api_key: API_KEY,
                email,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong")
        }

        return NextResponse.json({ message: "Successfully subscribed to the newsletter" }, { status: 201 })
    } catch (error) {
        console.error("Newsletter subscription error:", error)
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Something went wrong" },
            { status: 500 },
        )
    }
}

