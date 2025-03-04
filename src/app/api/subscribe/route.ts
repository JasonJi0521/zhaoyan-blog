"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

const isTestMode = process.env.NODE_ENV === "development"

export default function NewsletterSubscription() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email) return

        try {
            setStatus("loading")

            if (isTestMode) {
                // Simulate API call in test mode
                console.log("TEST MODE: Would subscribe email:", email)
                await new Promise((resolve) => setTimeout(resolve, 1000)) // Fake delay
                setStatus("success")
                setMessage("Test mode: Email would be subscribed in production")
                setEmail("")
                return
            }

            // Real API call code remains the same...
            const FORM_ID = "YOUR_FORM_ID"
            const API_URL = `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`

            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong")
            }

            setStatus("success")
            setMessage("Thank you for subscribing to my newsletter!")
            setEmail("")
        } catch (error) {
            setStatus("error")
            setMessage(error instanceof Error ? error.message : "Failed to subscribe. Please try again.")
        }
    }

    return (
        <Card className= "w-full" >
        <CardHeader className="text-center" >
            <CardTitle className="text-2xl" > Subscribe to My Newsletter </CardTitle>
                <CardDescription>
          Get the latest updates on AI, investment insights, and life reflections delivered to your inbox.
        </CardDescription>
        </CardHeader>
        <CardContent>
    {
        status === "success" ? (
            <div className= "flex items-center justify-center space-x-2 text-green-600 p-4" >
            <CheckCircle2 className="h-5 w-5" />
                <p>{ message } </p>
                </div>
        ) : status === "error" ? (
            <div className= "flex items-center justify-center space-x-2 text-red-600 p-4" >
            <AlertCircle className="h-5 w-5" />
                <p>{ message } </p>
                </div>
        ) : (
            <form onSubmit= { handleSubmit } className = "flex flex-col sm:flex-row gap-2" >
                <Input
              type="email"
        placeholder = "Enter your email"
        value = { email }
        onChange = {(e) => setEmail(e.target.value)
    }
    required
    className = "flex-grow"
        />
        <Button type="submit" disabled = { status === "loading"
} className = "whitespace-nowrap" >
    { status === "loading" ? (
        <>
        <Loader2 className= "mr-2 h-4 w-4 animate-spin" />
Subscribing...
</>
              ) : (
    "Subscribe"
)}
</Button>
    </form>
        )}
</CardContent>
    </Card>
  )
}

