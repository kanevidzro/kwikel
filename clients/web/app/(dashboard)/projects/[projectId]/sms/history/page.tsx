import { getAuthHeaders } from "@/lib/authHeaders";
import { getProject } from "@/lib/project";

export default async function SmsHistoryPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const headers = await getAuthHeaders();
  const { projectId } = await params;

  const project = await getProject(projectId, headers);
  if (!project?.smsMessages) return <div>No SMS history</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">SMS History</h1>
      <ul className="mt-4 space-y-2">
        {project.smsMessages.map((msg) => (
          <li key={msg.id} className="border p-2 rounded">
            <p>
              <strong>To:</strong> {msg.recipient}
            </p>
            <p>
              <strong>Message:</strong> {msg.message}
            </p>
            <p>
              <strong>Status:</strong> {msg.status}
            </p>
            <p className="text-sm text-gray-500">
              Sent: {new Date(msg.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
