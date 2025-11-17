
import { Truck, ShieldCheck, Gem, Wrench } from 'lucide-react';

const features = [
  {
    icon: <Gem className="h-8 w-8 text-primary" />,
    title: 'Premium Quality Materials',
    description: 'Crafted from sustainably sourced, high-quality materials for lasting durability.',
  },
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: 'Free Delivery & Assembly',
    description: 'Fast, free delivery and optional white-glove assembly on all orders across the UK.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Certified Craftsmanship',
    description: 'Every piece is built with expert attention to detail by our skilled artisans.',
  },
  {
    icon: <Wrench className="h-8 w-8 text-primary" />,
    title: '1–5 Year Warranty',
    description: 'We stand by our quality with a comprehensive warranty on all our products.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl">Why Choose Us</h2>
          <p className="mt-2 text-lg text-primary font-semibold">We deliver quality you can rely on.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="font-headline text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
