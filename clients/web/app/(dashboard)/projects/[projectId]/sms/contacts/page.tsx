import Link from "next/link";
import { getAuthHeaders } from "@/lib/authHeaders";
import { getProject } from "@/lib/project";

export default async function SmsContactsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const headers = await getAuthHeaders();
  const { projectId } = await params;

  const project = await getProject(projectId, headers);

  if (!project?.phoneBooks) {
    return <div>No contact lists found</div>;
  }

  return (
    <div>
      <h1>SMS Contacts</h1>
      <ul>
        {project.phoneBooks.map((book) => (
          <li key={book.id}>
            <Link href={`/projects/${projectId}/sms/contacts/${book.id}`}>
              <strong>{book.name}</strong> — {book.contactCount} contacts
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
