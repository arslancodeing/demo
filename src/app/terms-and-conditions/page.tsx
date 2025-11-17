
export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl">Terms & Conditions</h1>
        <p className="mt-2 text-lg text-muted-foreground">Last Updated: {new Date().toLocaleDateString('en-GB')}</p>
      </header>
      <main className="max-w-3xl mx-auto space-y-8 prose prose-invert">
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using our website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website.
          </p>
        </section>
        <section>
          <h2>2. Products</h2>
          <p>
            All products are subject to availability. We have made every effort to display product colors and images accurately, but cannot guarantee that your device's display will be accurate. Images may vary slightly from the actual product color due to lighting.
          </p>
        </section>
        <section>
          <h2>3. Orders & Payment</h2>
          <p>
            By placing an order, you warrant that you are legally capable of entering into binding contracts. We reserve the right to accept or cancel orders based on availability. All online payments are secure and encrypted.
          </p>
        </section>
        <section>
          <h2>4. Shipping & Returns</h2>
          <p>
            Please refer to our Support page for detailed information on shipping times, costs, and our return process. Return eligibility is defined in our Return Policy.
          </p>
        </section>
        <section>
          <h2>5. Warranty Policy</h2>
          <h4>Warranty Coverage</h4>
          <p>
            Most furniture items come with a 1–5 year warranty depending on the product type. This warranty covers:
          </p>
          <ul>
            <li>Manufacturing defects</li>
            <li>Frame issues</li>
            <li>Structural damage not caused by misuse</li>
          </ul>
          <h4>Warranty Exclusions</h4>
          <p>The warranty does not cover:</p>
           <ul>
            <li>Normal wear and tear</li>
            <li>Fabric stains</li>
            <li>Damage from misuse or accidents</li>
          </ul>
        </section>
        <section>
          <h2>6. Limitation of Liability</h2>
          <p>
            Atelier Home shall not be liable for any indirect or consequential damages arising out of your use of this website or the products purchased from it.
          </p>
        </section>
      </main>
    </div>
  );
}
