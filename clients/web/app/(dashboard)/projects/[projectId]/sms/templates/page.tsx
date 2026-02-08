import { redirect } from "next/navigation";
import { getProject } from "@/lib/project";

export default async function SmsTemplatesPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await getProject(params.projectId);

  if (!project) {
    redirect("/projects");
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        SMS Templates for {project.name}
      </h1>
      <p>Manage and view SMS templates here.</p>
      {/* Later you can render a list of templates, add forms to create/update/delete, etc. */}
    </div>
  );
}
