
import { ShieldCheck, BadgeCheck, Star, Users } from 'lucide-react';

const trustFeatures = [
  { icon: <ShieldCheck className="h-6 w-6 text-primary" />, text: '100% Secure Payments' },
  { icon: <BadgeCheck className="h-6 w-6 text-primary" />, text: 'Verified Quality' },
  { icon: <Star className="h-6 w-6 text-primary" />, text: 'Warranty Guaranteed' },
  { icon: <Users className="h-6 w-6 text-primary" />, text: '10,000+ Satisfied Customers' },
];

export function TrustBadges() {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {trustFeatures.map((feature, index) => (
                <div key={index} className="flex items-center justify-center gap-3">
                    {feature.icon}
                    <span className="font-semibold text-muted-foreground">{feature.text}</span>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
