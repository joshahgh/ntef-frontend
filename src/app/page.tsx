import Navbar from "@/components/Navbar";
import Link from "next/link";

const BENEFICIARIES = [
  {
    name: "Aisha M.",
    school: "Ahmadu Bello University",
    year: "2024",
    quote: "NTEF helped me stay in school and focus on my studies.",
  },
  {
    name: "Chinedu O.",
    school: "University of Lagos",
    year: "2023",
    quote: "The process was transparent and the support was real.",
  },
  {
    name: "Fatima S.",
    school: "University of Maiduguri",
    year: "2024",
    quote: "This scholarship changed my story. I’m grateful.",
  },
];

export default function Home() {
  return (
    <div>
      <Navbar />

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-sm text-gray-600 mb-2">
            National Tertiary Education Fund
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0B1F3B] leading-tight">
            NTEF Scholarship Program
          </h1>
          <p className="mt-4 text-gray-700">
            Supporting Nigerian students with access to higher education through
            transparent and structured scholarship support.
          </p>

          <div className="mt-8 flex gap-3">
            <Link
              href="/register"
              className="px-5 py-3 rounded bg-[#0B1F3B] text-white font-medium"
            >
              Apply for Scholarship
            </Link>
            <a
              href="#beneficiaries"
              className="px-5 py-3 rounded border bg-white font-medium"
            >
              View Beneficiaries
            </a>
          </div>

          <div className="mt-6 text-xs text-gray-500">
            Application fee: ₦1,000 (Paystack, test mode for now)
          </div>
        </div>

        <div className="bg-white rounded-2xl border p-6">
          <div className="text-sm font-semibold text-[#0B1F3B] mb-2">
            What you get
          </div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• Tuition / support assistance (based on selection)</li>
            <li>• Transparent review process</li>
            <li>• Applicant dashboard for updates</li>
            <li>• Admin-managed approvals</li>
          </ul>
          <div className="mt-6 p-4 bg-gray-50 rounded-xl text-sm">
            <span className="font-semibold">Tip:</span> Create an account, fill
            your application, then pay ₦1,000 to submit.
          </div>
        </div>
      </section>

      {/* BENEFICIARIES */}
      <section id="beneficiaries" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-[#0B1F3B]">
          Proof of Awarded Scholarships
        </h2>
        <p className="mt-2 text-gray-700">
          Past beneficiaries (sample demo content — replace with real students).
        </p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {BENEFICIARIES.map((b) => (
            <div key={b.name} className="bg-white border rounded-2xl p-6">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[#0B1F3B]">
                {b.name.charAt(0)}
              </div>
              <div className="mt-4 font-semibold">{b.name}</div>
              <div className="text-sm text-gray-600">
                {b.school} • {b.year}
              </div>
              <p className="mt-4 text-sm text-gray-700">“{b.quote}”</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-white border-y">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-[#0B1F3B]">How it works</h2>

          <div className="mt-8 grid md:grid-cols-5 gap-4">
            {[
              "Create account",
              "Fill application",
              "Review details",
              "Pay ₦1,000",
              "Track status",
            ].map((s) => (
              <div key={s} className="border rounded-2xl p-4 bg-gray-50">
                <div className="font-semibold text-sm">{s}</div>
                <div className="text-xs text-gray-600 mt-2">
                  Simple, transparent steps.
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-[#0B1F3B]">FAQ</h2>
        <div className="mt-6 space-y-4">
          <div className="bg-white border rounded-2xl p-6">
            <div className="font-semibold">Why is there a ₦1,000 fee?</div>
            <div className="text-sm text-gray-700 mt-2">
              It covers application processing and helps prevent spam entries.
            </div>
          </div>
          <div className="bg-white border rounded-2xl p-6">
            <div className="font-semibold">How do I know my status?</div>
            <div className="text-sm text-gray-700 mt-2">
              Your applicant dashboard shows your current status after payment.
            </div>
          </div>
          <div className="bg-white border rounded-2xl p-6">
            <div className="font-semibold">Is this live?</div>
            <div className="text-sm text-gray-700 mt-2">
              This version is set up for testing with Paystack test keys. When you’re
              ready, we switch to live keys.
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0B1F3B] text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm flex flex-col md:flex-row gap-3 justify-between">
          <div>© {new Date().getFullYear()} NTEF — National Tertiary Education Fund</div>
          <div className="opacity-80">Contact: support@ntef.example</div>
        </div>
      </footer>
    </div>
  );
}
