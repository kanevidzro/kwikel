import { redirect } from "next/navigation";
import { getProject } from "@/lib/project";

export default async function CreditsTopupPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await getProject(params.projectId);
  if (!project) redirect("/projects");

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Top Up Credits for {project.name}
      </h1>
      <p>Purchase or add credits to your project here.</p>
      {/* Later: add a form or integration with payment provider */}
    </div>
  );
}
