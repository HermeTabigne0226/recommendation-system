"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "../../components/sidebar";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/sign-in");
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 0);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f7f5]">
        <div className="text-emerald-800 font-semibold text-lg animate-pulse">
          Verifying session...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f4f7f5]">
      {/* Sidebar navigation */}
      <SideBar />

      {/* Main content page area */}
      <main className="flex-1 h-screen overflow-y-auto p-8">{children}</main>
    </div>
  );
}
