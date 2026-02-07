"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    try {
      await api.post("/auth/register", { email, password });
      window.location.href = "/login";
    } catch (err: any) {
      setMsg(err?.response?.data?.message ?? "Registration failed");
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
          <h1 className="text-2xl font-bold text-[#0B1F3B]">Apply to NTEF</h1>
          <p className="text-sm text-gray-600 mt-1">
            Create an account to start your application.
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
            placeholder="Create a password"
            required
          />

          <button className="w-full mt-6 bg-[#0B1F3B] text-white p-3 rounded-xl font-medium">
            Create Account
          </button>

          <p className="text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a className="text-[#0B1F3B] underline" href="/login">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
