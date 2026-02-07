import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dugble | Reliable CPaaS Infrastructure for Africa",
  description:
    "Discover Dugble, founded by Kane Vidzro, providing reliable SMS, OTP, and Email infrastructure for African businesses and developers.",
  alternates: {
    canonical: "https://dugble.com/about",
  },
  openGraph: {
    siteName: "Dugble",
    type: "website",
    url: "https://dugble.com/about",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
};

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center">About Dugble</h1>

      <p className="text-lg text-center text-gray-700">
        Dugble is a developer-first communication platform built from the ground
        up to solve the complexities of message delivery, latency, and
        reliability across Africa.
      </p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p className="text-gray-700">
          Our mission is to empower African businesses and developers with
          reliable and scalable communication infrastructure. Dugble ensures
          that every SMS, OTP, or Email reaches its recipient quickly, securely,
          and efficiently.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Why Dugble?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>High-throughput messaging with low latency</li>
          <li>Enterprise-grade security and compliance</li>
          <li>Designed specifically for African network conditions</li>
          <li>Developer-friendly APIs and documentation</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Our Founder</h2>
        <p className="text-gray-700">
          Dugble was founded by <strong>Kane Vidzro</strong> with the vision of
          building a reliable CPaaS platform tailored for Africa. His goal is to
          simplify messaging infrastructure so businesses can focus on growth.
        </p>
      </section>

      <p className="text-center text-gray-700">
        At Dugble, we are committed to making communication seamless,
        dependable, and accessible across the continent.
      </p>
    </main>
  );
}
