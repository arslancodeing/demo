
'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

export function WeeklySaleBanner() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const endOfWeek = new Date(now);
            endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
            endOfWeek.setHours(23, 59, 59, 999);

            const difference = +endOfWeek - +now;

            let timeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0
            };

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return timeLeft;
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Set initial time to avoid delay
        setTimeLeft(calculateTimeLeft());

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="bg-card py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-center md:text-left">
                        <h2 className="font-headline text-3xl md:text-4xl font-bold">Weekly Sale</h2>
                        <p className="text-lg md:text-xl text-primary font-semibold mt-1">Unbeatable Offers • Limited Time Only</p>
                        <p className="text-muted-foreground mt-2 max-w-md mx-auto md:mx-0">
                            Don't miss out on our limited-time offer. Refresh your space for less with our biggest sale of the season! Save big on premium furniture. Explore exclusive deals, holiday sales, and combo offers designed specially for you.
                        </p>
                        <Button asChild size="lg" className="mt-6">
                            <Link href="/products?sort=price-asc">Shop the Sale</Link>
                        </Button>
                    </div>
                    <div className="flex justify-center md:justify-end items-center gap-4">
                        {Object.entries(timeLeft).map(([unit, value]) => (
                            <div key={unit} className="flex flex-col items-center bg-background p-4 rounded-lg shadow-inner w-24">
                                <span className="text-4xl font-bold font-headline tabular-nums">
                                    {String(value).padStart(2, '0')}
                                </span>
                                <span className="text-xs uppercase text-muted-foreground">{unit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
