// lib/project.ts

import { env } from "@/lib/env";
import { apiClient } from "./apiClient";

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
  const res = await apiClient.get<Project>(`/project/${id}`, {
    credentials: "include",
  });
  return res.success ? (res.data ?? null) : null;
}

/**
 * Fetch all projects for the authenticated user.
 * Returns null if request fails.
 */
export async function getProjects(): Promise<Project[] | null> {
  const res = await apiClient.get<Project[]>("/project", {
    credentials: "include",
  });
  return res.success ? (res.data ?? null) : null;
}

export async function getPhoneBookContacts(projectId: string, bookId: string) {
  const res = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/project/${projectId}/phoneBooks/${bookId}/contacts`,
    {
      credentials: "include",
      cache: "no-store",
    },
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.data as { id: string; name: string; phone: string }[];
}
