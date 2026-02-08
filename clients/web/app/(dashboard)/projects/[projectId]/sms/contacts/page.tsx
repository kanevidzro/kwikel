import { getProject } from "@/lib/project";

export default async function SmsContactsPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await getProject(params.projectId);

  if (!project?.phoneBooks) {
    return <div>No contact lists found</div>;
  }

  return (
    <div>
      <h1>SMS Contacts</h1>
      <ul>
        {project.phoneBooks.map((book) => (
          <li key={book.id}>
            <strong>{book.name}</strong> — {book.contactCount} contacts
          </li>
        ))}
      </ul>
    </div>
  );
}
