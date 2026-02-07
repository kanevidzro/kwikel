import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMS, OTP & Email API Use Cases for African Businesses | Dugble",
  description:
    "Discover how Dugble SMS, OTP, and Email APIs help African businesses deliver secure, reliable, and scalable communication solutions.",
  alternates: {
    canonical: "https://dugble.com/use-cases",
  },
  openGraph: {
    siteName: "Dugble",
    type: "website",
    url: "https://dugble.com/use-cases",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
};

const useCases = [
  {
    title: "Financial Services",
    points: [
      "Transaction verification and fraud alerts",
      "Two-factor authentication (2FA) for users",
      "KYC and compliance flows",
      "Sub-second OTP delivery with high reliability",
    ],
  },
  {
    title: "Logistics & Retail",
    points: [
      "Automated dispatch notifications and delivery confirmations",
      "Real-time order updates for customers",
      "High-throughput SMS routing for thousands of messages per second",
      "Carrier delivery receipts for guaranteed delivery tracking",
    ],
  },
  {
    title: "SaaS & Digital Products",
    points: [
      "User onboarding and account verification",
      "Product notifications and transactional emails",
      "Multi-channel failover ensures message delivery even if one channel is down",
    ],
  },
  {
    title: "Public Sector & Enterprises",
    points: [
      "Mass notifications and emergency alerts",
      "Large-scale broadcasting with redundancy and compliance controls",
      "Audit logging for transparency and governance",
    ],
  },
];

export default function UseCasesPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Dugble Messaging API Use Cases
      </h1>

      <p className="text-lg text-center mb-12">
        Dugble provides reliable, secure, and scalable communication APIs for
        SMS, OTP, and Email, powering workflows across African businesses and
        developers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {useCases.map((useCase) => (
          <div
            key={useCase.title}
            className="border rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold mb-4">{useCase.title}</h2>
            <ul className="list-disc list-inside space-y-2">
              {useCase.points.map((point) => (
                <li key={point} className="text-gray-700">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-lg">
        Whether you are launching a startup or operating at national scale,
        Dugble is the communication backbone that ensures your messages reach
        users fast, reliably, and securely.
      </p>
    </main>
  );
}
