import { getAuthHeaders } from "@/lib/authHeaders";
import { getProject } from "@/lib/project";

export default async function ProjectSettingsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const headers = await getAuthHeaders();
  const { projectId } = await params;

  const project = await getProject(projectId, headers);
  if (!project) return <div>Project not found</div>;

  return (
    <div>
      <h1>Settings for {project.name}</h1>
      <p>Created: {new Date(project.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
