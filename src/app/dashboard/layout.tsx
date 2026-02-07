import SideNav from "@/components/SideNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <SideNav />
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
