import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Linkedin,
    Instagram,
    Mail,
} from "lucide-react";

export default function ContactPage() {
    const contactLinks = [
        {
            name: "LinkedIn",
            icon: <Linkedin className="h-6 w-6" />,
            url: "https://www.linkedin.com/in/zhaoyanji0521/",
            color: "#0077B5",
            description: "Connect with me professionally on LinkedIn",
        },
        {
            name: "Instagram",
            icon: <Instagram className="h-6 w-6" />,
            url: "https://www.instagram.com/zhaoyan_jjj/",
            color: "#E1306C",
            description: "Check out my personal life updates on IG",
        },
        {
            name: "Gmail",
            icon: <Mail className="h-6 w-6" />,
            url: "#",
            color: "#EA4335",
            description: "Send me an email directly",
            contactId: "zhaoyanji0521@gmail.com",
            idLabel: "E-mail:",
        },
        {
            name: "Xiaohongshu",
            icon: (
                <div className="h-6 w-6 flex items-center justify-center">
                    <Image
                        src="/images/rednote-logo.png"
                        alt="Xiaohongshu"
                        width={24}
                        height={24}
                        className="object-contain"
                    />
                </div>
            ),
            url: "#",
            color: "#FF5252",
            description: "Follow my day-to-day thoughts on RedNote",
            contactId: "634931410",
            idLabel: "Xiaohongshu ID:",
        },
        {
            name: "WeChat",
            icon: (
                <div className="h-6 w-6 flex items-center justify-center">
                    <Image
                        src="/images/wechat-logo.png"
                        alt="WeChat"
                        width={24}
                        height={24}
                        className="object-contain"
                    />
                </div>
            ),
            url: "#",
            color: "#09B83E",
            description: "Connet with me on WeChat",
            contactId: "Zhaoyan_Ji",
            idLabel: "WeChat ID:",
        },
    ];

    return (
        <main className="min-h-screen pb-16">
            {/* Navigation - similar to your blog pages */}
            <nav className="border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold">
                        Main page
                    </Link>
                    <div className="space-x-6">
                        <Link href="/blog" className="hover:text-primary">
                            Blog
                        </Link>
                        <Link href="/about" className="hover:text-primary">
                            About
                        </Link>
                        <Link href="/contact" className="text-primary">
                            Contact
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Contact Section */}
            <section className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>

                    <p className="text-muted-foreground mb-12">
                        I&apos;d love to connect with you! I regularly share my insights here, on LinkedIn and RedNote.
                        And I respond to personal messages on Email, Instagram, and WeChat.
                        Feel free to reach out to discuss ideas or for collaboration.
                    </p>

                    <div className="grid gap-6 md:grid-cols-2">
                        {contactLinks.map((contact) => (
                            <Card
                                key={contact.name}
                                className="group relative overflow-hidden transition-all hover:shadow-lg border-2 border-muted hover:border-primary"
                            >
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div
                                        className="rounded-full p-3"
                                        style={{ backgroundColor: `${contact.color}20`, color: contact.color }}
                                    >
                                        {contact.icon}
                                    </div>
                                    <CardTitle>{contact.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground mb-6">
                                        {contact.description}
                                    </p>

                                    {contact.contactId ? (
                                        <div className="p-2 rounded-md bg-muted mt-4">
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">
                                                    {contact.idLabel}
                                                </p>
                                                <p className="font-medium">{contact.contactId}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link href={contact.url}>
                                            <Button
                                                className="w-full group-hover:bg-opacity-90 transition-all"
                                                style={{ backgroundColor: contact.color }}
                                            >
                                                Connect on {contact.name}
                                            </Button>
                                        </Link>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}