// lib/apiClient.ts
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
};

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`${this.baseUrl}${path}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
      });

      const data = await res.json();
      return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unexpected error";
      return { success: false, error: msg, code: "NETWORK_ERROR" };
    }
  }

  get<T>(path: string, headers?: HeadersInit) {
    return this.request<T>(path, { method: "GET", headers });
  }

  post<T>(path: string, body: unknown, headers?: HeadersInit) {
    return this.request<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });
  }

  put<T>(path: string, body: unknown, headers?: HeadersInit) {
    return this.request<T>(path, {
      method: "PUT",
      body: JSON.stringify(body),
      headers,
    });
  }

  delete<T>(path: string, headers?: HeadersInit) {
    return this.request<T>(path, { method: "DELETE", headers });
  }
}

export const apiClient = new ApiClient();
