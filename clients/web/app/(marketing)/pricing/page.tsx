import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Bulk SMS & OTP API Rates in Ghana, Nigeria & Kenya | Dugble Pricing",
  description:
    "Flexible and transparent pricing for Dugble SMS, OTP, and Email APIs. Choose plans that scale with your business in Africa.",
  alternates: {
    canonical: "https://dugble.com/pricing",
  },
  openGraph: {
    siteName: "Dugble",
    type: "website",
    url: "https://dugble.com/pricing",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
};

export default function PricingPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">
          Simple, Pay-As-You-Go Pricing
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Only pay for what you use. No subscriptions. No hidden fees. Buy
          credits, send messages, and scale as you grow.
        </p>
      </section>

      {/* Unit Explanation */}
      <section className="bg-muted rounded-xl p-6 mb-12 text-center">
        <h2 className="text-xl font-semibold mb-2">How Units Work</h2>
        <p className="text-muted-foreground">
          1 unit = 1 SMS &nbsp;•&nbsp; 1 unit = OTP send &nbsp;•&nbsp; 1 unit =
          OTP verify
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="grid md:grid-cols-3 gap-6">
        {/* Starter */}
        <div className="border rounded-xl p-6 flex flex-col">
          <h3 className="text-lg font-semibold">Starter</h3>
          <p className="text-3xl font-bold my-3">GHS 0.050</p>
          <p className="text-sm text-muted-foreground mb-4">per unit</p>

          <ul className="space-y-2 text-sm mb-6">
            <li>✔ SMS, OTP & Email API</li>
            <li>✔ Pay as you go</li>
            <li>✔ Standard routing</li>
            <li>✔ Email support</li>
          </ul>

          <Button className="mt-auto">Start with GHS 50</Button>
        </div>

        {/* Growth */}
        <div className="border-2 border-primary rounded-xl p-6 flex flex-col">
          <span className="text-xs font-semibold text-primary mb-1">
            MOST POPULAR
          </span>
          <h3 className="text-lg font-semibold">Growth</h3>
          <p className="text-3xl font-bold my-3">GHS 0.045</p>
          <p className="text-sm text-muted-foreground mb-4">per unit</p>

          <ul className="space-y-2 text-sm mb-6">
            <li>✔ Everything in Starter</li>
            <li>✔ Priority routing</li>
            <li>✔ Higher rate limits</li>
            <li>✔ Faster support</li>
          </ul>

          <Button className="mt-auto">Start with GHS 500</Button>
        </div>

        {/* Business */}
        <div className="border rounded-xl p-6 flex flex-col">
          <h3 className="text-lg font-semibold">Business</h3>
          <p className="text-3xl font-bold my-3">GHS 0.040</p>
          <p className="text-sm text-muted-foreground mb-4">per unit</p>

          <ul className="space-y-2 text-sm mb-6">
            <li>✔ Everything in Growth</li>
            <li>✔ High throughput</li>
            <li>✔ Sender ID assistance</li>
            <li>✔ SLA-backed uptime</li>
          </ul>

          <Button className="mt-auto">Start with GHS 2,000</Button>
        </div>
      </section>

      {/* Free Trial Note */}
      <section className="text-center mt-16">
        <p className="text-muted-foreground">
          New accounts receive free trial credits after email and phone
          verification.
        </p>
      </section>
    </main>
  );
}
