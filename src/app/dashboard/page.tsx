"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { authHeader, clearToken } from "@/lib/auth";

export default function DashboardHome() {
  const [app, setApp] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/application/me", { headers: authHeader() });
        setApp(res.data);
      } catch (e: any) {
        setErr("You are not logged in. Please login again.");
      }
    }
    load();
  }, []);

  if (err) {
    return (
      <div className="max-w-lg bg-white border rounded-2xl p-6">
        <div className="font-semibold text-red-700">{err}</div>
        <button
          className="mt-4 px-4 py-2 rounded bg-[#0B1F3B] text-white"
          onClick={() => {
            clearToken();
            window.location.href = "/login";
          }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-[#0B1F3B]">Dashboard</h1>
      <p className="text-gray-700 mt-2">
        Track your NTEF scholarship application status.
      </p>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white border rounded-2xl p-5">
          <div className="text-sm text-gray-600">Status</div>
          <div className="mt-1 font-bold">{app?.status ?? "-"}</div>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <div className="text-sm text-gray-600">Submitted At</div>
          <div className="mt-1 font-bold">
            {app?.submittedAt ? new Date(app.submittedAt).toLocaleString() : "-"}
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <div className="text-sm text-gray-600">Next step</div>
          <div className="mt-1 font-bold">
            {app?.status === "DRAFT" ? "Complete form + Pay ₦1,000" : "Wait for review"}
          </div>
        </div>
      </div>
    </div>
  );
}
