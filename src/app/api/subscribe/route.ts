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
        console.log("=== NEWSLETTER SUBSCRIPTION DEBUGGING ===")

        // Step 1: Parse request and validate email
        let email: string
        try {
            const body = await request.json()
            email = body.email
            console.log("Request received with email:", email ? `${email.substring(0, 3)}...` : "undefined")

            if (!email) {
                return NextResponse.json({ message: "Email is required" }, { status: 400 })
            }
        } catch (error) {
            console.error("Error parsing request body:", error)
            return NextResponse.json({ message: "Invalid request format" }, { status: 400 })
        }

        // Step 2: Get and validate environment variables
        let FORM_ID: string
        let API_SECRET: string

        try {
            FORM_ID = getRequiredEnvVar("CONVERTKIT_FORM_ID")
            API_SECRET = getRequiredEnvVar("CONVERTKIT_API_SECRET")

            console.log("Environment variables loaded successfully:")
            console.log("- FORM_ID:", FORM_ID)
            console.log("- API_SECRET:", API_SECRET ? "✓ (value hidden)" : "✗ (missing)")
        } catch (error) {
            console.error("Environment variable error:", error)
            return NextResponse.json(
                {
                    message: "Server configuration error",
                    details: error instanceof Error ? error.message : "Unknown error",
                },
                { status: 500 },
            )
        }

        // Step 3: Prepare API request
        const API_URL = `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`
        console.log("API URL:", API_URL)

        const requestBody = {
            api_secret: API_SECRET,
            email,
        }

        console.log("Request body (redacted):", {
            ...requestBody,
            api_secret: "[REDACTED]",
        })

        // Step 4: Make the API request
        console.log("Sending request to ConvertKit API...")
        let response: Response
        try {
            response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            })

            console.log("Response received with status:", response.status)
        } catch (error) {
            console.error("Network error during API request:", error)
            return NextResponse.json(
                {
                    message: "Failed to connect to ConvertKit API",
                    details: error instanceof Error ? error.message : "Unknown network error",
                },
                { status: 500 },
            )
        }

        // Step 5: Parse and validate response
        let data: any
        try {
            data = await response.json()
            console.log("Response data:", JSON.stringify(data))
        } catch (error) {
            console.error("Error parsing API response:", error)
            return NextResponse.json(
                {
                    message: "Invalid response from ConvertKit API",
                    status: response.status,
                    details: error instanceof Error ? error.message : "Unknown parsing error",
                },
                { status: 500 },
            )
        }

        // Step 6: Handle API response
        if (!response.ok) {
            console.error("API returned error status:", response.status)
            console.error("Error details:", data)

            // Try to extract a meaningful error message
            const errorMessage = data.message || data.error || `API error: ${response.status}`

            return NextResponse.json(
                {
                    message: errorMessage,
                    status: response.status,
                    details: data,
                },
                { status: response.status },
            )
        }

        // Step 7: Success response
        console.log("Subscription successful!")
        return NextResponse.json(
            {
                message: "Successfully subscribed to the newsletter",
                details: "User has been added to your ConvertKit form",
            },
            { status: 201 },
        )
    } catch (error) {
        // Step 8: Catch-all error handler
        console.error("Unhandled exception in newsletter subscription:", error)
        return NextResponse.json(
            {
                message: "An unexpected error occurred",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
        )
    } finally {
        console.log("=== END NEWSLETTER SUBSCRIPTION DEBUGGING ===")
    }
}

