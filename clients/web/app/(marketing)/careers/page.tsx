import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Dugble | Join Our Team",
  description:
    "Explore career opportunities at Dugble. Join our team to build reliable SMS, OTP, and Email infrastructure for Africa.",
  alternates: {
    canonical: "https://dugble.com/careers",
  },
  openGraph: {
    siteName: "Dugble",
    type: "website",
    url: "https://dugble.com/careers",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://static.dugble.com/images/dugble_og.jpg"],
  },
};

const jobOpenings = [
  {
    title: "Frontend Developer",
    location: "Remote / Ghana",
    description:
      "Build and maintain Dugble’s web applications and user interfaces using modern frameworks like Next.js and TailwindCSS.",
    applyLink: "/careers/frontend-developer",
  },
  {
    title: "Backend Developer",
    location: "Remote / Ghana",
    description:
      "Develop and maintain scalable API services for SMS, OTP, and Email delivery using Node.js and microservice architecture.",
    applyLink: "/careers/backend-developer",
  },
  {
    title: "DevOps Engineer",
    location: "Remote / Ghana",
    description:
      "Manage infrastructure, deployment pipelines, and ensure high availability of Dugble’s services across Africa.",
    applyLink: "/careers/devops-engineer",
  },
];

export default function CareersPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Careers at Dugble</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Join our team to build reliable, high-performance SMS, OTP, and Email
          infrastructure for businesses and developers across Africa. We value
          innovation, collaboration, and impact.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">Open Positions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {jobOpenings.map((job) => (
            <div
              key={job.title}
              className="border rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-2">{job.location}</p>
              <p className="text-gray-700 mb-4">{job.description}</p>
              <a
                href={job.applyLink}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Can’t find a role?</h2>
        <p className="text-gray-700">
          If you don’t see a position that fits your skills, feel free to send
          your resume to{" "}
          <a
            href="mailto:careers@dugble.com"
            className="text-blue-600 underline"
          >
            careers@dugble.com
          </a>{" "}
          – we’re always looking for talented people.
        </p>
      </section>
    </main>
  );
}
