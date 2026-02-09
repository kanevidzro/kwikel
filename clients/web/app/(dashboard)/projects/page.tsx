// app/projects/page.tsx
import Link from "next/link";
import { getAuthHeaders } from "@/lib/authHeaders";
import { getProjects } from "@/lib/project";

export default async function ProjectsPage() {
  const headers = await getAuthHeaders();
  const projects = await getProjects(headers);

  if (!projects || projects.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Projects</h1>
        <p className="mt-4 text-gray-600">
          No projects found or you are not signed in.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Projects</h1>
      <ul className="mt-4 space-y-2">
        {projects.map((project) => (
          <li
            key={project.id}
            className="border rounded p-3 hover:bg-gray-50 transition"
          >
            <Link href={`/projects/${project.id}`}>
              <h2 className="font-medium">{project.name}</h2>
            </Link>
            <p className="text-sm text-gray-500">
              Created at: {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
