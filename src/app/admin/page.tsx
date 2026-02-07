"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { authHeader, clearToken } from "@/lib/auth";

export default function AdminPage() {
  const [apps, setApps] = useState<any[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  async function load() {
    setMsg(null);
    const res = await api.get("/admin/applications", { headers: authHeader() });
    setApps(res.data);
  }

  useEffect(() => {
    load().catch(() => setMsg("Admin access failed. Make sure your user role is ADMIN."));
  }, []);

  async function approve(id: string) {
    await api.patch(`/admin/application/${id}/approve`, {}, { headers: authHeader() });
    setMsg("Approved ✅");
    load();
  }

  async function reject(id: string) {
    await api.patch(`/admin/application/${id}/reject`, {}, { headers: authHeader() });
    setMsg("Rejected ✅");
    load();
  }

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-[#0B1F3B]">Admin Dashboard</h1>
        <button
          className="px-4 py-2 rounded border bg-white"
          onClick={() => {
            clearToken();
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>

      {msg && (
        <div className="mt-4 p-3 rounded-xl bg-gray-50 border text-sm">
          {msg}
        </div>
      )}

      <div className="mt-6 bg-white border rounded-2xl overflow-x-auto">
        <table className="min-w-[800px] w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Submitted</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((a) => (
              <tr key={a.id} className="border-b">
                <td className="p-3">{a.user.email}</td>
                <td className="p-3 font-semibold">{a.status}</td>
                <td className="p-3">
                  {a.submittedAt ? new Date(a.submittedAt).toLocaleString() : "-"}
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => approve(a.id)}
                    className="px-3 py-2 rounded bg-green-600 text-white"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => reject(a.id)}
                    className="px-3 py-2 rounded bg-red-600 text-white"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}

            {apps.length === 0 && (
              <tr>
                <td className="p-3" colSpan={4}>
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        If you see “Admin access failed”, open Prisma Studio and set your user role to ADMIN.
      </p>
    </div>
  );
}
