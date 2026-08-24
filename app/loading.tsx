"use client";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4f7f5]">
      <div className="flex flex-col items-center max-w-xs text-center">
        {/* Pulsing Logo Container */}
        <div className="relative mb-6">
          {/* Subtle glowing ring background */}
          <div className="absolute inset-0 bg-[#439849]/15 rounded-full blur-xl animate-ping duration-1500"></div>
          <Image
            src="/dgcd logo.jpg"
            alt="DGCD System Logo"
            width={96}
            height={96}
            className="object-contain rounded-full relative z-10 border border-[#439849]/15 shadow-md"
            priority
          />
        </div>

        {/* Themed Spinner & Text */}
        <div className="flex items-center justify-center gap-2.5 mb-2">
          <div className="w-5 h-5 border-2 border-[#439849]/20 border-t-[#439849] rounded-full animate-spin"></div>
          <span className="text-sm font-bold text-slate-800 tracking-wide">
            Loading System
          </span>
        </div>

        {/* Secondary Subtitle */}
        <p className="text-xs text-slate-500 font-semibold animate-pulse">
          Preparing recommendation system...
        </p>
      </div>
    </div>
  );
}
