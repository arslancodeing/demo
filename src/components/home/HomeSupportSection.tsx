
'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";

export function HomeSupportSection() {
    const whatsappNumber = "+923001234567";
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  
    const contactMethods = [
        { 
            icon: <Mail className="h-8 w-8 text-primary" />, 
            title: "Email Us", 
            description: "Get a detailed response.", 
            href: "mailto:support@atelierhome.co.uk",
            label: "Send Email"
        },
        { 
            icon: <Phone className="h-8 w-8 text-primary" />, 
            title: "Call Us", 
            description: "Speak with our team directly.", 
            href: "tel:+923001234567",
            label: "Call Now"
        },
        { 
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
            ), 
            title: "WhatsApp", 
            description: "For instant support.", 
            href: whatsappUrl,
            label: "Chat Now"
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-card">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl">We're Here to Help</h2>
                    <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have questions, need assistance, or want help choosing the perfect furniture? Our team is always ready.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {contactMethods.map(method => (
                        <Card key={method.title} className="text-center p-6 flex flex-col items-center">
                           <div className="bg-primary/10 p-4 rounded-full mb-4">
                             {method.icon}
                           </div>
                           <h3 className="font-headline text-xl font-semibold mb-2">{method.title}</h3>
                           <p className="text-muted-foreground mb-4 flex-grow">{method.description}</p>
                           <Button asChild variant="outline">
                             <Link href={method.href} target={method.href.startsWith('http') ? '_blank' : undefined}>{method.label}</Link>
                           </Button>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
