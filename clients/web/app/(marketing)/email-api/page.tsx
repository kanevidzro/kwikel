import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dugble Email API | Reliable Transactional Emails for Africa",
  description:
    "Send transactional emails quickly and securely with Dugble’s Email API, trusted across Africa.",
  alternates: {
    canonical: "https://dugble.com/email-api",
  },
  openGraph: {
    siteName: "Dugble",
    type: "website",
    url: "https://dugble.com/email-api",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
};

const features = [
  {
    title: "High Deliverability",
    description:
      "Dugble ensures your emails reach inboxes reliably, minimizing bounces and spam filtering.",
  },
  {
    title: "Real-Time Reporting",
    description:
      "Track opens, clicks, and delivery status in real-time to optimize communication.",
  },
  {
    title: "Secure & Compliant",
    description:
      "Built with security and privacy in mind, compliant with regional and international standards.",
  },
  {
    title: "Developer-Friendly",
    description:
      "Simple API integration, comprehensive documentation, and SDKs to get you started quickly.",
  },
];

export default function EmailPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <h1 className="text-4xl font-bold text-center">
        Dugble Email API (Beta)
      </h1>

      <p className="text-lg text-center text-gray-700">
        Send transactional emails quickly, securely, and reliably with Dugble’s
        Email API. Trusted by businesses and developers across Africa for high
        deliverability and real-time reporting.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="border rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Use Cases</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            Transactional emails: password resets, account verification, and
            notifications
          </li>
          <li>Marketing emails and product announcements</li>
          <li>Real-time alerts and reporting for operational workflows</li>
        </ul>
      </section>

      <p className="text-center text-gray-700">
        Dugble Email API gives you the confidence to communicate reliably at
        scale, tailored for African businesses and developers.
      </p>
    </main>
  );
}
