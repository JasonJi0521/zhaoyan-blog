import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { email } = await request.json()

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 })
        }

        // Get API credentials from environment variables
        const FORM_ID = `cdb738b07b`
        const API_KEY = `UwzJZ9uzDI_3uws7XvVmSw`

        console.log("Environment variables loaded:")
        console.log("FORM_ID:", FORM_ID) // Log the actual form ID for debugging
        console.log("API_KEY exists:", !!API_KEY)

        if (!FORM_ID || !API_KEY) {
            return NextResponse.json({ message: "ConvertKit configuration is missing" }, { status: 500 })
        }

        // Construct the API URL
        const API_URL = `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`
        console.log("Using API URL:", API_URL)

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

        // Log the full response for debugging
        const responseText = await response.text()
        console.log("ConvertKit API response status:", response.status)
        console.log("ConvertKit API response text:", responseText)

        // Parse the response if it's JSON
        let data
        try {
            data = JSON.parse(responseText)
        } catch (e) {
            console.log("Response is not valid JSON")
            data = { message: "Invalid response from ConvertKit" }
        }

        if (!response.ok) {
            console.error("ConvertKit API error:", data)
            return NextResponse.json(
                { message: `ConvertKit API error: ${data.message || "Unknown error"}` },
                { status: response.status },
            )
        }

        return NextResponse.json({ message: "Successfully subscribed to the newsletter" }, { status: 201 })
    } catch (error) {
        console.error("Newsletter subscription error:", error)
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
    }
}

