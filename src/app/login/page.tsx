"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { setToken } from "@/lib/auth";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    try {
      const res = await api.post("/auth/login", { email, password });
      setToken(res.data.token);

      // If admin, send to /admin, else /dashboard
      if (res.data.role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      setMsg(err?.response?.data?.message ?? "Login failed");
    }
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <form
          onSubmit={submit}
          className="w-full max-w-md bg-white border rounded-2xl p-8"
        >
          <h1 className="text-2xl font-bold text-[#0B1F3B]">
            Applicant Login
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Login to your NTEF dashboard.
          </p>

          {msg && (
            <div className="mt-4 p-3 rounded bg-red-50 border border-red-200 text-sm text-red-700">
              {msg}
            </div>
          )}

          <label className="block mt-6 text-sm font-medium">Email</label>
          <input
            className="w-full mt-2 p-3 border rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          <label className="block mt-4 text-sm font-medium">Password</label>
          <input
            className="w-full mt-2 p-3 border rounded-xl"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            required
          />

          <button className="w-full mt-6 bg-[#0B1F3B] text-white p-3 rounded-xl font-medium">
            Login
          </button>

          <p className="text-sm text-gray-600 mt-4">
            New here?{" "}
            <a className="text-[#0B1F3B] underline" href="/register">
              Create account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
