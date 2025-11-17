
export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl">Privacy Policy</h1>
        <p className="mt-2 text-lg text-muted-foreground">Last Updated: {new Date().toLocaleDateString('en-GB')}</p>
      </header>
      <main className="max-w-3xl mx-auto space-y-8 prose prose-invert">
        <section>
          <h2>1. Our Commitment to Your Privacy</h2>
          <p>
            Welcome to Atelier Home. We value your privacy and are committed to protecting your personal data. This policy outlines how we collect, use, and safeguard your information.
          </p>
        </section>
        <section>
          <h2>2. Information We Collect</h2>
          <p>
            To provide you with the best service, we may collect the following information:
          </p>
          <ul>
            <li><strong>Personal Details:</strong> Name, email address, and phone number.</li>
            <li><strong>Order Information:</strong> Delivery address, order history, and payment information (which is always encrypted).</li>
          </ul>
        </section>
        <section>
          <h2>3. How We Use Your Data</h2>
          <p>
            Your data is used for the following purposes:
          </p>
          <ul>
            <li>To process and deliver your orders efficiently.</li>
            <li>To improve your website and shopping experience.</li>
            <li>To send you updates, special offers, and promotions (you can opt out at any time).</li>
          </ul>
        </section>
         <section>
          <h2>4. How We Keep Your Data Safe</h2>
          <p>
            Your data is safe with us. We never sell or share your personal information with third parties without your explicit consent, except as required by law.
          </p>
        </section>
        <section>
          <h2>5. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us at support@atelierhome.co.uk.
          </p>
        </section>
      </main>
    </div>
  );
}
