import { NextResponse } from "next/server"

// Add type safety for environment variables
const getRequiredEnvVar = (name: string): string => {
    const value = process.env[name]
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`)
    }
    return value
}

export async function POST(request: Request) {
    try {
        const { email } = await request.json()

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 })
        }

        // Get and validate environment variables
        let FORM_ID: string
        let API_SECRET: string

        try {
            FORM_ID = getRequiredEnvVar("CONVERTKIT_FORM_ID")
            API_SECRET = getRequiredEnvVar("CONVERTKIT_API_SECRET")
        } catch (error) {
            console.error("Environment variable error:", error)
            return NextResponse.json({ message: "Server configuration error" }, { status: 500 })
        }

        const API_URL = `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`

        console.log("Attempting to subscribe with form ID:", FORM_ID)

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                api_key: API_SECRET,
                email,
            }),
        })

        const data = await response.json()

        // Log response for debugging (excluding sensitive data)
        console.log("ConvertKit API response status:", response.status)
        console.log("ConvertKit API response:", {
            ...data,
            api_key: "[REDACTED]",
        })

        if (!response.ok) {
            throw new Error(data.message || `API error: ${response.status}`)
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

