import { CheckoutForm } from '@/components/checkout/CheckoutForm';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl">Checkout</h1>
      </header>
      <main>
        <CheckoutForm />
      </main>
    </div>
  );
}
