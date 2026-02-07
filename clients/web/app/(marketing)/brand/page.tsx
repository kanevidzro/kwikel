import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand | Dugble",
  description:
    "Learn about Dugble's brand, mission, and identity. Discover the values and vision that drive our communication platform across Africa.",
  alternates: {
    canonical: "https://dugble.com/brand",
  },
  openGraph: {
    siteName: "Dugble",
    type: "website",
    url: "https://dugble.com/brand",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
};

const brandValues = [
  {
    title: "Technical Precision",
    description:
      "Every message sent through Dugble is built on accuracy and reliability, ensuring critical communication reaches its destination.",
  },
  {
    title: "African Resilience",
    description:
      "Our platform is designed to perform reliably across Africa's unique network conditions, reflecting the resilience of the communities we serve.",
  },
  {
    title: "Speed & Reliability",
    description:
      "Fast delivery, minimal latency, and high uptime are core to our identity, mirroring the speed at which our network operates.",
  },
  {
    title: "Developer-Focused",
    description:
      "Dugble is built for developers by developers—easy-to-use APIs, clear documentation, and robust support empower innovation.",
  },
];

export default function BrandPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <h1 className="text-4xl font-bold text-center">Our Brand</h1>

      <p className="text-lg text-center text-gray-700">
        Dugble is built at the intersection of technical precision and African
        resilience. Our identity reflects the speed, reliability, and strength
        of the messages we deliver.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {brandValues.map((value) => (
          <div
            key={value.title}
            className="border rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2">{value.title}</h2>
            <p className="text-gray-700">{value.description}</p>
          </div>
        ))}
      </section>

      <p className="text-center text-gray-700">
        At Dugble, our brand is a reflection of our mission: to make
        communication across Africa seamless, dependable, and
        developer-friendly.
      </p>
    </main>
  );
}
