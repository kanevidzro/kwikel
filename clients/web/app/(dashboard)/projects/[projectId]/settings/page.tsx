import { redirect } from "next/navigation";
import { getProject } from "@/lib/project";

export default async function SettingsPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await getProject(params.projectId);
  if (!project) redirect("/projects");

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Settings for {project.name}
      </h1>
      <p>Here you can rename or delete the project.</p>
    </div>
  );
}
