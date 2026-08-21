"use client";
import SideBar from "../../components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f4f7f5]">
      {/* Sidebar navigation */}
      <SideBar />

      {/* Main content page area */}
      <main className="flex-1 h-screen overflow-y-auto p-8">{children}</main>
    </div>
  );
}
