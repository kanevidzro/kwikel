import { getProject } from "@/lib/project";

export default async function ApiKeysPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await getProject(params.projectId);
  if (!project?.apiKeys) return <div>No API keys found</div>;

  return (
    <div>
      <h1>API Keys</h1>
      <ul>
        {project.apiKeys.map((key) => (
          <li key={key.id}>
            {key.id} - {key.isActive ? "Active" : "Inactive"}
          </li>
        ))}
      </ul>
    </div>
  );
}
