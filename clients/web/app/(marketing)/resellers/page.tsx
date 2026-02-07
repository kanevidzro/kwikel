import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dugble Reseller Program | Partner with Africa’s CPaaS Leader",
  description:
    "Join Dugble’s reseller program to offer SMS, OTP, and Email services to your customers. Unlock partner benefits and grow with us.",
  alternates: {
    canonical: "https://dugble.com/resellers",
  },
  openGraph: {
    siteName: "Dugble",
    type: "website",
    url: "https://dugble.com/resellers",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
};

const resellerBenefits = [
  "Access to Dugble’s SMS, OTP, and Email APIs at competitive pricing",
  "Dedicated partner support and account management",
  "Co-marketing opportunities and promotional resources",
  "Flexible integration options for businesses and developers",
  "High reliability infrastructure and SLA-backed uptime",
];

export default function ResellersPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Dugble Reseller Program</h1>
        <p>
          Partner with Dugble to offer reliable SMS, OTP, and Email services to
          your customers. Our reseller program provides competitive pricing,
          dedicated support, and tools to grow your business.
        </p>
      </section>

      {/* Benefits Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-center">Partner Benefits</h2>
        <ul className="list-disc list-inside">
          {resellerBenefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
      </section>

      {/* How to Join */}
      <section className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">How to Join</h2>
        <p>
          Apply to become a Dugble reseller by contacting our partnerships team.
          Once approved, you’ll receive all the tools, documentation, and
          support to start offering Dugble services immediately.
        </p>
        <a
          href="mailto:partners@dugble.com"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Contact Our Team
        </a>
      </section>

      {/* CTA / Closing */}
      <section className="text-center">
        <p className="text-gray-700">
          Join a network of trusted partners and help businesses across Africa
          communicate reliably with Dugble.
        </p>
      </section>
    </main>
  );
}
