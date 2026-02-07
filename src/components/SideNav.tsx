"use client";

import Link from "next/link";

export default function SideNav() {
  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-[#0B1F3B] text-white p-6">
      <div className="text-xl font-bold mb-8">NTEF</div>

      <nav className="space-y-3 text-sm">
        <Link className="block hover:underline" href="/dashboard">
          Overview
        </Link>
        <Link className="block hover:underline" href="/dashboard/application">
          Application
        </Link>
        <Link className="block hover:underline" href="/dashboard/payment">
          Payment
        </Link>
        <Link className="block hover:underline" href="/admin">
          Admin
        </Link>
      </nav>
    </aside>
  );
}
