// lib/project.ts

export type Project = {
  id: string;
  name: string;
  createdAt: string;

  apiKeys?: { id: string; isActive: boolean }[];
  senderIds?: { id: string; name: string }[];

  smsMessages?: {
    id: string;
    recipient: string;
    message: string;
    status: string;
    createdAt: string;
  }[];

  otpMessages?: {
    id: string;
    recipient: string;
    status: string;
    createdAt: string;
  }[];

  templates?: { id: string; name: string; content: string }[];
  campaigns?: { id: string; name: string; status: string }[];
  phoneBooks?: { id: string; name: string; contactCount: number }[];
};

/**
 * Fetch a single project by ID.
 * Returns null if not found or request fails.
 */
export async function getProject(id: string): Promise<Project | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/project/${id}`,
      {
        credentials: "include",
        cache: "no-store",
      },
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.data as Project;
  } catch {
    return null;
  }
}

export async function getProjects(): Promise<Project[] | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project`, {
      credentials: "include",
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data as Project[];
  } catch {
    return null;
  }
}
