
'use client';

import { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { CheckCircle, ShoppingBag } from 'lucide-react';

export function OrderConfirmation({ orderId }: { orderId: string }) {
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 8000); // Stop confetti after 8 seconds
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
            {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={300} />}
            <Card className="max-w-lg w-full text-center shadow-lg animate-fade-in">
                <CardHeader className="items-center">
                    <div className="bg-green-100 p-3 rounded-full animate-pulse-subtle">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                    <CardTitle className="text-3xl font-headline mt-4">Thank You! Your Order Is Confirmed 🎉</CardTitle>
                    <CardDescription className="text-lg">
                        Our team will contact you before dispatch.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p className="text-muted-foreground">Your Order ID is:</p>
                    <p className="font-mono text-xl font-bold tracking-wider bg-muted p-2 rounded-md inline-block">{orderId}</p>
                    <p className="text-muted-foreground pt-4">You will receive an email/WhatsApp with your order details shortly.</p>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                    <Button asChild size="lg" className="w-full">
                        <Link href="/products">
                            <ShoppingBag className="mr-2 h-5 w-5" />
                            Continue Shopping
                        </Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                        <Link href="/account">View My Orders</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
