// lib/project.ts
import { env } from "@/lib/env";

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
// lib/project.ts

export async function getProject(
  id: string,
  headers: { cookie: string },
): Promise<Project | null> {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/project/${id}`, {
      method: "GET",
      headers: { cookie: headers.cookie },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.project as Project;
  } catch (err) {
    console.error("Project fetch failed:", err);
    return null;
  }
}

/**
 * Fetch all projects for the authenticated user.
 * Returns null if request fails.
 */
// lib/project.ts

export async function getProjects(headers: {
  cookie: string;
}): Promise<Project[] | null> {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/project`, {
      method: "GET",
      headers: { cookie: headers.cookie },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.projects as Project[];
  } catch (err) {
    console.error("Projects fetch failed:", err);
    return null;
  }
}

/**
 * Fetch contacts from a phone book inside a project.
 * Returns null if request fails.
 */

export async function getPhoneBookContacts(
  projectId: string,
  bookId: string,
  headers: { cookie: string },
): Promise<{ id: string; name: string; phone: string }[] | null> {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/project/${projectId}/phoneBooks/${bookId}/contacts`,
      {
        method: "GET",
        headers: { cookie: headers.cookie },
        credentials: "include",
        cache: "no-store",
      },
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.data as { id: string; name: string; phone: string }[];
  } catch (err) {
    console.error("Phone book contacts fetch failed:", err);
    return null;
  }
}
