import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fast, Secure OTP Delivery for Africa | Dugble API",
  description:
    "Integrate fast, reliable OTP authentication for your app. Secure delivery across Africa with seamless integration.",
  alternates: {
    canonical: "https://dugble.com/otp",
  },
  openGraph: {
    siteName: "Dugble",
    type: "website",
    url: "https://dugble.com/otp",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
};

const otpFeatures = [
  {
    title: "Fast Delivery",
    description:
      "OTP messages are routed through globally optimized telecom channels for delivery in seconds.",
  },
  {
    title: "Secure & Compliant",
    description:
      "End-to-end encrypted delivery with compliance to SOC 2 and ISO 27001 standards.",
  },
  {
    title: "Reliable at Scale",
    description:
      "High-throughput infrastructure ensures OTP delivery even during peak traffic.",
  },
  {
    title: "Developer-Friendly",
    description:
      "Simple integration with clear documentation, SDKs, and sample code to get started quickly.",
  },
];

export default function OTPPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <h1 className="text-4xl font-bold text-center">Dugble OTP API</h1>

      <p className="text-lg text-center text-gray-700">
        Dugble OTP provides fast, secure, and reliable one-time password
        delivery to users across Africa. With globally optimized telecom
        routing, your users receive OTPs in seconds, not minutes.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {otpFeatures.map((feature) => (
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
          <li>User authentication and registration flows</li>
          <li>Two-factor authentication (2FA) for secure access</li>
          <li>Transaction verification and banking alerts</li>
          <li>Time-sensitive notifications for app users</li>
        </ul>
      </section>

      <p className="text-center text-gray-700">
        Dugble OTP API ensures speed, security, and reliability so your
        authentication systems work seamlessly across Africa.
      </p>
    </main>
  );
}
