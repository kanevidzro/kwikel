// app/projects/page.tsx
import Link from "next/link";
import { getAuthHeaders } from "@/lib/authHeaders";
import { getProjects } from "@/lib/project";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProjectsPage() {
  const headers = await getAuthHeaders();
  const projects = await getProjects(headers);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button>
          <Link href="/projects/new">+ New Project</Link>
        </Button>
      </div>

      {!projects || projects.length === 0 ? (
        <div className="border border-dashed rounded-lg p-10 text-center text-gray-500">
          <p>No projects found.</p>
          <Button>
            <Link href="/projects/new">Create your first project</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>
                  <Link
                    href={`/projects/${project.id}`}
                    className="hover:underline text-blue-700"
                  >
                    {project.name}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Created: {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
