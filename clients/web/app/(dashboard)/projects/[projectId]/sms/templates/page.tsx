import { getProject } from "@/lib/project";

export default async function SmsTemplatesPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await getProject(params.projectId);
  if (!project?.templates) return <div>No templates</div>;

  return (
    <div>
      <h1>SMS Templates</h1>
      <ul>
        {project.templates.map((t) => (
          <li key={t.id}>
            {t.name}: {t.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
