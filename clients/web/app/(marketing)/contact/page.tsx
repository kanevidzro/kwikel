import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact Dugble | Africa’s Trusted CPaaS Provider",
  description:
    "Contact Dugble to access reliable SMS, OTP, and Email solutions for businesses and developers across Africa.",
  alternates: {
    canonical: "https://dugble.com/contact",
  },
  openGraph: {
    siteName: "Dugble",
    type: "website",
    url: "https://dugble.com/contact",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
};

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-12">
      <h1 className="text-4xl font-bold text-center">Contact Dugble</h1>

      <p className="text-lg text-center text-gray-700">
        Have questions or need support? Reach out to Dugble’s team to access
        reliable SMS, OTP, and Email solutions for businesses and developers
        across Africa.
      </p>

      <section className="space-y-8">
        {/* Contact Information */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <p className="text-gray-700">
            Email:{" "}
            <a
              href="mailto:info@dugble.com"
              className="text-blue-600 underline"
            >
              info@dugble.com
            </a>
          </p>
          <p className="text-gray-700">
            Support:{" "}
            <a
              href="mailto:support@dugble.com"
              className="text-blue-600 underline"
            >
              support@dugble.com
            </a>
          </p>
        </div>

        {/* Contact Form */}
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your message..."
              className="w-full border rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button type="submit">Send Message</Button>
        </form>
      </section>

      <p className="text-center text-gray-700">
        We aim to respond to all inquiries within 24 hours. Your communication
        with Dugble is secure and private.
      </p>
    </main>
  );
}
