import { getProject } from "@/lib/project";

export default async function SmsHistoryPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await getProject(params.projectId);
  if (!project?.smsMessages) return <div>No SMS history</div>;

  return (
    <div>
      <h1>SMS History</h1>
      <ul>
        {project.smsMessages.map((msg) => (
          <li key={msg.id}>
            To: {msg.recipient} — {msg.message} ({msg.status}) on{" "}
            {new Date(msg.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
