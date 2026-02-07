"use client";

import { api } from "@/lib/api";
import { authHeader } from "@/lib/auth";
import { useState } from "react";

export default function PaymentPage() {
  const [msg, setMsg] = useState<string | null>(null);

  async function pay() {
    setMsg(null);
    try {
      const res = await api.post("/payment/initiate", {}, { headers: authHeader() });
      // backend returns { authorization_url, reference }
      window.location.href = res.data.authorization_url;
    } catch {
      setMsg("Payment init failed ❌ (Are you logged in?)");
    }
  }

  return (
    <div className="max-w-md bg-white border rounded-2xl p-6">
      <h1 className="text-xl font-bold text-[#0B1F3B]">Payment</h1>
      <p className="text-gray-700 mt-2">
        Pay <span className="font-bold">₦1,000</span> to submit your NTEF application.
      </p>

      {msg && (
        <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
          {msg}
        </div>
      )}

      <button
        onClick={pay}
        className="w-full mt-6 px-5 py-3 rounded-xl bg-green-600 text-white font-medium"
      >
        Pay ₦1,000 (Test Mode)
      </button>

      <p className="text-xs text-gray-500 mt-4">
        You will be redirected to Paystack. After payment, Paystack webhook updates your status.
      </p>
    </div>
  );
}
