"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SideBar() {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [showDate, setShowDate] = useState<boolean>(true);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <aside className="w-64 h-screen bg-[#1c3f22] text-emerald-50 flex flex-col justify-between border-r border-[#152f19]">
      {/* Top Section */}
      <div>
        {/* Brand Header */}
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <Image
            src="/DGCD.jpg"
            alt="DGCD Logo"
            width={36}
            height={36}
            className="object-contain rounded-md"
          />
          <div>
            <h1 className="font-bold text-white text-sm tracking-wide">DGCD System</h1>
            <span className="text-[10px] text-emerald-300 font-semibold">Recommendation Engine</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1">
          <span className="px-3 text-[10px] font-bold text-emerald-200/60 uppercase tracking-wider block mb-4">
            Menu
          </span>

          {/* Link 1: Dashboard */}
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all hover:bg-white/10 hover:text-white text-emerald-50 hover:scale-[1.02]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
            Dashboard
          </Link>

          {/* Link 2: Inventory Items */}
          <Link
            href="/inventory"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all hover:bg-white/10 hover:text-white text-emerald-50 hover:scale-[1.02]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            Inventory Items
          </Link>

          {/* Link 3: Recommendations */}
          <Link
            href="/recommendations"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all hover:bg-white/10 hover:text-white text-emerald-50 hover:scale-[1.02]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-5.096c.712-.404 1.17-1.135 1.205-1.954l.004-.08a2.646 2.646 0 00-.707-1.928l-.02-.022a2.646 2.646 0 00-1.928-.707l-.08.004c-.819.035-1.55.493-1.954 1.205l-5.096 8.983zm0 0L3 18l5.096-8.982c.404-.712 1.135-1.17 1.954-1.205l.08-.004c.819-.035 1.55.493 1.954 1.205l.022.02a2.646 2.646 0 001.928.707l.08-.004c.819-.035 1.55-.493 1.954-1.205l5.096-8.983m-10.192 10.192l-5.096 8.983" />
            </svg>
            Recommendations
          </Link>
        </nav>
      </div>

      {/* Bottom Section: Logout / User Profile */}
      <div className="p-4 border-t border-white/10 space-y-3 bg-white/5 rounded-b-lg">
        {/* Date & Time Widget */}
        {time && date && (
          <div
            onClick={() => setShowDate(!showDate)}
            className="px-3 py-2 bg-white/5 rounded-md border border-white/5 text-center flex flex-col items-center select-none cursor-pointer hover:bg-white/10 transition-colors"
            title="Click to toggle date"
          >
            <span className="text-xs font-semibold text-emerald-300 font-mono tracking-wider">{time}</span>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showDate ? "max-h-6 opacity-100 mt-0.5" : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <span className="text-[10px] text-emerald-100/60 block">{date}</span>
            </div>
          </div>
        )}

        {/* User Card */}
        <div className="flex items-center gap-3 px-3 py-1">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-white border border-white/10 text-sm">
            AD
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white leading-tight">Admin User</h4>
            <span className="text-[10px] text-emerald-200">System Operator</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            alert("Logging out...");
            window.location.href = "/sign-in";
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all text-red-300 hover:bg-white/10 hover:text-red-200 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}
