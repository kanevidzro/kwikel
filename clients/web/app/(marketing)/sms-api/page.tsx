import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dugble SMS API | High-Speed Messaging for African Businesses",
  description:
    "Integrate Dugble’s SMS API for fast, secure, and reliable message delivery across Africa.",
  alternates: {
    canonical: "https://dugble.com/sms-api",
  },
  openGraph: {
    siteName: "Dugble",
    type: "website",
    url: "https://dugble.com/sms-api",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
};

const smsFeatures = [
  {
    title: "High-Speed Delivery",
    description:
      "Send SMS messages quickly across Africa with minimal latency and high reliability.",
  },
  {
    title: "Global & Local Reach",
    description:
      "Deliver messages to multiple countries and local carriers with ease and compliance.",
  },
  {
    title: "Secure & Reliable",
    description:
      "End-to-end secure messaging with robust infrastructure to prevent downtime.",
  },
  {
    title: "Developer-Friendly API",
    description:
      "Simple integration, clear documentation, and tools to get started immediately.",
  },
];

export default function SMSPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <h1 className="text-4xl font-bold text-center">Dugble SMS API</h1>

      <p className="text-lg text-center text-gray-700">
        Integrate Dugble’s SMS API to send fast, secure, and reliable messages
        across Africa. Ideal for businesses and developers who require high
        delivery rates and low latency.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {smsFeatures.map((feature) => (
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
          <li>Transaction alerts and OTP verification</li>
          <li>Marketing campaigns and promotions</li>
          <li>Logistics and delivery notifications</li>
          <li>Real-time operational alerts for businesses</li>
        </ul>
      </section>

      <p className="text-center text-gray-700">
        Dugble SMS API provides the speed, reliability, and scalability that
        African businesses and developers need to communicate effectively.
      </p>
    </main>
  );
}
