import { getPhoneBookContacts, getProject } from "@/lib/project";

export default async function ContactBookPage({
  params,
}: {
  params: { projectId: string; bookId: string };
}) {
  // Fetch project to confirm phone book exists
  const project = await getProject(params.projectId);
  if (!project?.phoneBooks) return <div>No phone books found</div>;

  const phoneBook = project.phoneBooks.find((b) => b.id === params.bookId);
  if (!phoneBook) return <div>Phone book not found</div>;

  // Fetch contacts inside this phone book
  const contacts = await getPhoneBookContacts(params.projectId, params.bookId);
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
