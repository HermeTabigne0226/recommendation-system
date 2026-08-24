"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      router.push("/dashboard");
    }
  }, [router]);
  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat px-4 relative"
      style={{ backgroundImage: "url('/hardware_bg.jpg')" }}
    >
      {/* Light overlay with a subtle backdrop blur to keep the card readable */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xs"></div>

      <div className="bg-white p-8 rounded-2xl border border-[#439849]/20 shadow-2xl shadow-[#439849]/5 max-w-md w-full text-center flex flex-col items-center relative z-10">
        {/* Logo Section */}
        <div className="mb-6">
          <Image
            src="/DGCD.jpg"
            alt="DGCD Logo"
            width={128}
            height={128}
            className="object-contain"
            priority
          />
        </div>

        {/* Brand Headers */}
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          DGCD Recommendation System
        </h1>
        <p className="text-sm text-slate-600 mb-8 max-w-xs">
          Welcome to the MIS recommendation system. Please sign in to your
          account to continue.
        </p>

        {/* Proceed Action Button */}
        <Link
          href="/sign-in"
          className="w-full py-3 px-4 text-sm rounded-md font-semibold text-white border border-[#439849] bg-[#439849] hover:bg-[#367c3b] transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#439849]"
        >
          Proceed to Sign In
        </Link>
      </div>
    </div>
  );
}
