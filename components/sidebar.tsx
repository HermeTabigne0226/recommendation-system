"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DashboardIcon,
  RecommendationIcon,
  UsersIcon,
  SettingsIcon,
  LogoutIcon,
} from "./icons";

export default function SideBar() {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [showDate, setShowDate] = useState<boolean>(true);
  const [user, setUser] = useState<{
    name?: string | null;
    position?: string;
    image?: string | null;
  } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setTimeout(() => {
          setUser(parsed);
        }, 0);
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      );
      setDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
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
            src="/dgcd logo.jpg"
            alt="DGCD Logo"
            width={96}
            height={96}
            priority
            unoptimized
            className="w-12 h-12 object-cover rounded-full border-2 border-emerald-400/40 ring-2 ring-white/10 shadow-md shrink-0 bg-white"
          />
          <div>
            <h1 className="font-bold text-white text-sm tracking-wide leading-snug">
              Dadiangas Glass
            </h1>
            <span className="text-[10px] text-emerald-300 font-semibold block">
              Recommendation System
            </span>
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
            <DashboardIcon className="w-5 h-5 shrink-0" />
            Dashboard
          </Link>

          {/* Link 2: Recommendation */}
          <Link
            href="/recommendations"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all hover:bg-white/10 hover:text-white text-emerald-50 hover:scale-[1.02]"
          >
            <RecommendationIcon className="w-5 h-5 shrink-0" />
            Recommendation
          </Link>

          {/* Link 3: Users */}
          <Link
            href="/users"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all hover:bg-white/10 hover:text-white text-emerald-50 hover:scale-[1.02]"
          >
            <UsersIcon className="w-5 h-5 shrink-0" />
            Users
          </Link>

          {/* Link 4: Settings */}
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all hover:bg-white/10 hover:text-white text-emerald-50 hover:scale-[1.02]"
          >
            <SettingsIcon className="w-5 h-5 shrink-0" />
            Settings
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
            <span className="text-xs font-semibold text-emerald-300 font-mono tracking-wider">
              {time}
            </span>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showDate
                  ? "max-h-6 opacity-100 mt-0.5"
                  : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <span className="text-[10px] text-emerald-100/60 block">
                {date}
              </span>
            </div>
          </div>
        )}

        {/* User Card */}
        <div className="flex items-center gap-3 px-3 py-1">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-white border border-white/10 text-sm overflow-hidden shrink-0">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name || "User Avatar"}
                className="w-full h-full object-cover"
              />
            ) : user?.name ? (
              user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()
            ) : (
              "AD"
            )}
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-white leading-tight truncate">
              {user?.name || "Admin User"}
            </h4>
            <span className="text-[10px] text-emerald-200 block truncate">
              {user?.position || "System Operator"}
            </span>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/sign-in";
          }}
          className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm font-medium transition-all text-red-300 hover:bg-white/10 hover:text-red-200 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full bg-red-500/15 flex items-center justify-center text-red-300 border border-red-500/20 group-hover:bg-red-500/25 group-hover:text-red-100 group-hover:border-red-500/30 shrink-0 transition-all">
            <LogoutIcon className="w-4 h-4" />
          </div>
          <span className="font-semibold text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
