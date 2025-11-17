
import { ContactForm } from '@/components/support/ContactForm';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, Phone, Wrench, Sparkles, HelpCircle, Truck } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    question: "Do you offer home delivery?",
    answer: "Yes, we deliver all over the UK with fast and safe shipping. Delivery times are typically 2–5 days for major cities and 5–10 days for other areas. We offer FREE delivery on all orders above a certain value, with minimal charges for smaller orders."
  },
  {
    question: "Do I get free assembly?",
    answer: "Yes! All major furniture items include free assembly by trained experts."
  },
  {
    question: "Can I return the furniture if I don’t like it?",
    answer: "Yes, returns are accepted within 7–30 days of delivery. The product must be unused and in its original packaging. Damage due to mishandling is not covered. Refunds are processed within 5–7 business days after inspection. If your furniture arrives damaged, we offer a free replacement at no extra cost."
  },
  {
    question: "Do you offer custom furniture?",
    answer: "Yes, we create sofas, beds, tables, and cabinets in custom sizes and colors."
  },
  {
    question: "Is payment secure?",
    answer: "Absolutely. All online payments are fully encrypted and protected."
  },
  {
    question: "How can I track my order?",
    answer: "You will receive a tracking link via email or WhatsApp after your order has been dispatched."
  }
];

const careGuides = [
    {
        question: "How do I care for my solid wood furniture?",
        answer: "Wipe your solid wood furniture with a soft, dry cloth. Avoid placing it in direct sunlight or near heat sources. For spills, wipe immediately with a slightly damp cloth and dry. Use coasters to prevent water marks."
    },
    {
        question: "What's the best way to clean fabric upholstery?",
        answer: "For general maintenance, vacuum your upholstery regularly with a soft brush attachment. For spills, blot immediately—do not rub. Use a professional upholstery cleaner or a mild soap and water solution, testing on an inconspicuous area first."
    },
    {
        question: "How should I maintain metal components?",
        answer: "Dust metal parts with a soft, dry cloth. For smudges, use a damp cloth and a mild detergent if necessary. Dry thoroughly to prevent any water spots or rust."
    }
];

const assemblyInstructions = [
    {
        question: "Where can I find assembly instructions for my product?",
        answer: "Assembly instructions are included in the packaging for your item. If you've misplaced them, you can often download a digital copy from the product's page on our website using the 'Download Dimensions PDF' link, which sometimes includes assembly steps."
    },
    {
        question: "What tools will I need for assembly?",
        answer: "Most of our furniture requires basic tools like a screwdriver and an Allen key (which is often included). We recommend checking the product page or the instruction manual for a specific list of required tools."
    }
]

export default function SupportPage() {
  const whatsappNumber = "+923001234567";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl">Customer Support</h1>
        <p className="mt-2 text-lg text-muted-foreground">We're here to help. How can we assist you?</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="font-headline text-3xl mb-6 flex items-center gap-3"><HelpCircle className="text-primary"/>Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                    {faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index}`} key={`faq-${index}`}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
             <div>
              <h2 className="font-headline text-3xl mb-6 flex items-center gap-3"><Sparkles className="text-primary"/>Furniture Care Guides</h2>
                <Accordion type="single" collapsible className="w-full">
                    {careGuides.map((guide, index) => (
                        <AccordionItem value={`item-${index}`} key={`care-${index}`}>
                            <AccordionTrigger>{guide.question}</AccordionTrigger>
                            <AccordionContent>
                                {guide.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
             <div>
              <h2 className="font-headline text-3xl mb-6 flex items-center gap-3"><Wrench className="text-primary"/>Assembly Instructions</h2>
                <Accordion type="single" collapsible className="w-full">
                    {assemblyInstructions.map((instruction, index) => (
                        <AccordionItem value={`item-${index}`} key={`assembly-${index}`}>
                            <AccordionTrigger>{instruction.question}</AccordionTrigger>
                            <AccordionContent>
                                {instruction.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
        <div className="space-y-8">
            <div>
              <h2 className="font-headline text-3xl mb-6">Send us a Message</h2>
              <ContactForm />
            </div>
            <div>
              <h2 className="font-headline text-3xl mb-6">Contact Details</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:support@atelierhome.co.uk" className="hover:underline">support@atelierhome.co.uk</a>
                </div>
                 <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <a href="tel:+923001234567" className="hover:underline">+92 300 1234567</a>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
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
                  <Link href={whatsappUrl} target="_blank" className="hover:underline">{whatsappNumber}</Link>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-headline text-xl mb-2">Business Hours</h3>
                <p className="text-muted-foreground">Monday – Sunday: 9 AM – 10 PM</p>
                <p className="text-muted-foreground">(24/7 support available on WhatsApp)</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
