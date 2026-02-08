import Link from "next/link";
import { getProjects } from "@/lib/project";

export default async function ProjectsPage() {
  const projects = await getProjects();

  if (!projects) {
    return <div>Failed to load projects</div>;
  }

  if (projects.length === 0) {
    return <div>No projects found</div>;
  }

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link href={`/projects/${project.id}`}>
              {project.name}{" "}
              <span className="text-gray-500">
                ({new Date(project.createdAt).toLocaleDateString()})
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
