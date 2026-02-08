"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { authHeader } from "@/lib/auth";

type MyApplication = {
  fullName?: string | null;
  institution?: string | null;
  essay?: string | null;
};

export default function ApplicationPage() {
  const [fullName, setFullName] = useState("");
  const [institution, setInstitution] = useState("");
  const [essay, setEssay] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await api<MyApplication>("/application/me", {
          headers: { ...authHeader() },
        });

        setFullName(data.fullName ?? "");
        setInstitution(data.institution ?? "");
        setEssay(data.essay ?? "");
      } catch {
        // If user isn't logged in or doesn't have app yet, ignore
      }
    }
    load();
  }, []);

  async function save() {
    setMsg(null);
    try {
      await api("/application/me", {
        method: "PATCH",
        headers: { ...authHeader() },
        body: JSON.stringify({ fullName, institution, essay }),
      });
      setMsg("Saved successfully ✅");
    } catch (e: any) {
      setMsg(e?.message ?? "Save failed ❌");
    }
  }

  return (
    <div className="max-w-3xl bg-white border rounded-2xl p-6">
      <h1 className="text-xl font-bold text-[#0B1F3B]">Application Form</h1>
      <p className="text-sm text-gray-600 mt-1">
        Fill and save. Then go to Payment to pay ₦1,000 and submit.
      </p>

      {msg && (
        <div className="mt-4 p-3 rounded-xl bg-gray-50 border text-sm">
          {msg}
        </div>
      )}

      <label className="block mt-6 text-sm font-medium">Full Name</label>
      <input
        className="w-full mt-2 p-3 border rounded-xl"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Your full name"
      />

      <label className="block mt-4 text-sm font-medium">Institution</label>
      <input
        className="w-full mt-2 p-3 border rounded-xl"
        value={institution}
        onChange={(e) => setInstitution(e.target.value)}
        placeholder="Your school name"
      />

      <label className="block mt-4 text-sm font-medium">Essay</label>
      <textarea
        className="w-full mt-2 p-3 border rounded-xl min-h-[160px]"
        value={essay}
        onChange={(e) => setEssay(e.target.value)}
        placeholder="Why should NTEF support you?"
      />

      <button
        onClick={save}
        className="mt-6 px-5 py-3 rounded-xl bg-[#0B1F3B] text-white font-medium"
      >
        Save Application
      </button>
    </div>
  );
}
