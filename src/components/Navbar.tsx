"use client";

import Link from "next/link";
import { clearToken, getToken } from "@/lib/auth";

export default function Navbar() {
  const loggedIn = !!getToken();

  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-[#0B1F3B]">
          NTEF
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/#beneficiaries" className="hover:underline">
            Beneficiaries
          </Link>
          <Link href="/#how" className="hover:underline">
            How it works
          </Link>

          {!loggedIn ? (
            <>
              <Link
                href="/login"
                className="px-3 py-2 rounded border hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-3 py-2 rounded bg-[#0B1F3B] text-white"
              >
                Apply
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="px-3 py-2 rounded bg-[#0B1F3B] text-white"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  clearToken();
                  window.location.href = "/login";
                }}
                className="px-3 py-2 rounded border hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
