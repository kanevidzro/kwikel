// app/(dashboard)/projects/[projectId]/sms/contacts/[bookId]/page.tsx

import { getAuthHeaders } from "@/lib/authHeaders";
import { getPhoneBookContacts, getProject } from "@/lib/project";

export default async function ContactBookPage({
  params,
}: {
  params: Promise<{ projectId: string; bookId: string }>;
}) {
  const headers = await getAuthHeaders();
  const { projectId, bookId } = await params;
  const project = await getProject(projectId, headers);
  if (!project?.phoneBooks) return <div>No phone books found</div>;

  const phoneBook = project.phoneBooks.find((b) => b.id === bookId);
  if (!phoneBook) return <div>Phone book not found</div>;

  // Fetch contacts inside this phone book
  const contacts = await getPhoneBookContacts(projectId, bookId, headers);
  if (!contacts || contacts.length === 0) {
    return (
      <div>
        <h1>{phoneBook.name}</h1>
        <p>No contacts in this phone book</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{phoneBook.name}</h1>
      <p>Total contacts: {contacts.length}</p>
      <ul>
        {contacts.map((c) => (
          <li key={c.id}>
            {c.name} — {c.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}
