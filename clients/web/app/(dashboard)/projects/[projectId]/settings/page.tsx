import { getProject } from "@/lib/project";

export default async function ProjectSettingsPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await getProject(params.projectId);
  if (!project) return <div>Project not found</div>;

  return (
    <div>
      <h1>Settings for {project.name}</h1>
      <p>Created: {new Date(project.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
