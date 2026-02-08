type ApiOptions = RequestInit & { headers?: Record<string, string> };

function buildUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) throw new Error("NEXT_PUBLIC_API_URL is not set");
  return `${base}${path}`;
}

async function request<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const res = await fetch(buildUrl(path), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const message =
      (data && (data.message || data.error)) || `Request failed (${res.status})`;
    throw new Error(message);
  }

  return data as T;
}

/**
 * api(...) supports BOTH styles:
 * 1) fetch-style: await api<T>("/path", { method, headers, body })
 * 2) axios-style: await api.get<T>("/path", { headers })
 *                await api.post<T>("/path", body, { headers })
 */
export const api: {
  <T>(path: string, options?: ApiOptions): Promise<T>;
  get: <T>(path: string, options?: ApiOptions) => Promise<{ data: T }>;
  post: <T>(
    path: string,
    body?: any,
    options?: ApiOptions
  ) => Promise<{ data: T }>;
  patch: <T>(
    path: string,
    body?: any,
    options?: ApiOptions
  ) => Promise<{ data: T }>;
  del: <T>(path: string, options?: ApiOptions) => Promise<{ data: T }>;
} = (async function <T>(path: string, options: ApiOptions = {}) {
  return request<T>(path, options);
}) as any;

// Axios-like helpers returning { data }
api.get = async function <T>(path: string, options: ApiOptions = {}) {
  const data = await request<T>(path, { ...options, method: "GET" });
  return { data };
};

api.post = async function <T>(
  path: string,
  body: any = {},
  options: ApiOptions = {}
) {
  const data = await request<T>(path, {
    ...options,
    method: "POST",
    body: JSON.stringify(body),
  });
  return { data };
};

api.patch = async function <T>(
  path: string,
  body: any = {},
  options: ApiOptions = {}
) {
  const data = await request<T>(path, {
    ...options,
    method: "PATCH",
    body: JSON.stringify(body),
  });
  return { data };
};

api.del = async function <T>(path: string, options: ApiOptions = {}) {
  const data = await request<T>(path, { ...options, method: "DELETE" });
  return { data };
};
