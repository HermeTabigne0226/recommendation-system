"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  RecommendationIcon,
  ClockIcon,
  RefreshIcon,
  ShieldCheckIcon,
} from "@/components/icons";
import axios from "axios";

interface StoredUser {
  name?: string | null;
  username?: string;
  role?: string;
  position?: string;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

type UserList = {
  id: string;
  name: string;
  username: string;
  role: string;
  position: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const greeting = getGreeting();
  const [userlist, setUserlist] = useState<UserList[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setTimeout(() => {
          setUser(parsed);
        }, 0);
      } catch (e) {
        console.error("Error reading user data", e);
      }
    }

    const loadUserList = async () => {
      try {
        const response = await axios.get("/api/users");
        // 4. In Axios, JSON data is in response.data
        setUserlist(response.data);
        console.log("Fetched users:", response.data);
      } catch (error) {
        console.error("Failed to fetch user list:", error);
      }
    };

    loadUserList();
  }, []);

  const stats = [
    {
      title: "Total Recommendations",
      value: "248",
      change: "+18.2% this month",
      isPositive: true,
      icon: <RecommendationIcon className="w-5 h-5 text-[#439849]" />,
      bg: "bg-emerald-50",
    },
    {
      title: "Pending Department Requests",
      value: "14 Requests",
      change: "Awaiting review",
      isPositive: false,
      icon: <ClockIcon className="w-5 h-5 text-amber-600" />,
      bg: "bg-amber-50",
    },
    {
      title: "Active Requests",
      value: "32 In Progress",
      change: "Currently processing",
      isPositive: true,
      icon: <RefreshIcon className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      title: "System Status",
      value: "Online",
      change: "All services operational",
      isPositive: true,
      icon: <ShieldCheckIcon className="w-5 h-5 text-[#439849]" />,
      bg: "bg-emerald-50",
    },
  ];

  const recentRecommendations = [
    {
      id: "REQ-001",
      request_date: "2026-08-19",
      item_description: "IPCAM 4MP & 8 PORTS POE SWITCH",
      prepared_by: "JOSH Z. DABORBOR",
      request_by: "JOSH Z. DABORBOR",
      urgency: "High",
    },
    {
      id: "REQ-002",
      request_date: "2026-08-19",
      item_description: '18.5" INCH LED MONITOR',
      prepared_by: "JOSE D. SANICO II",
      request_by: "SHEEN CASIANO",
      urgency: "Medium",
    },
    {
      id: "REQ-003",
      request_date: "2026-08-19",
      item_description: "LAPTOP (INTEL I3, 16GB RAM, 250GB SSD)",
      prepared_by: "JOSH Z. DABORBOR",
      request_by: "JOSH Z. DABORBOR",
      urgency: "High",
    },
    {
      id: "REQ-004",
      request_date: "2026-08-19",
      item_description: "PASS THROUGH CRIMPING TOOL & TOOL BAG",
      prepared_by: "EUGENE CHRIS C. ELMIDO",
      request_by: "EUGENE CHRIS C. ELMIDO",
      urgency: "Medium",
    },
    {
      id: "REQ-005",
      request_date: "2026-08-19",
      item_description: "512GB SATA SSD",
      prepared_by: "JOSE D. SANICO II",
      request_by: "FRANCES JANE ACHAS",
      urgency: "High",
    },
    {
      id: "REQ-006",
      request_date: "2026-08-06",
      item_description: "24-CHANNEL NVR & 16-PORT POE SWITCH",
      prepared_by: "JUELLIER D. ANDAYA",
      request_by: "REX GERAL",
      urgency: "Critical",
    },
    {
      id: "REQ-007",
      request_date: "2026-08-06",
      item_description: "DOME & BULLET CCTV CAMERAS",
      prepared_by: "JUELLIER D. ANDAYA",
      request_by: "REX GERAL",
      urgency: "Critical",
    },
    {
      id: "REQ-008",
      request_date: "2026-08-04",
      item_description: "512GB SSD SATA & 8GB DDR4 RAM",
      prepared_by: "JEVONNI C. TEJADA",
      request_by: "CHERYL RAMIREZ",
      urgency: "High",
    },
  ];

  const recentActivities = [
    {
      time: "5m ago",
      title: "CCTV & POE Request Logged",
      desc: "Josh Z. Daborbor submitted request for IPCAM 4MP & 8 Ports POE.",
    },
    {
      time: "35m ago",
      title: "Workstation Monitor & SSD",
      desc: 'Jose D. Sanico II requested 18.5" LED Monitor for Sheen Casiano.',
    },
    {
      time: "1h ago",
      title: "IT Tool Bag & Crimper Logged",
      desc: "Eugene Chris C. Elmido requested Pass Through Crimping Tool.",
    },
    {
      time: "2h ago",
      title: "NVR Surveillance Deployment",
      desc: "Juellier D. Andaya logged 24-Channel NVR for Rex Geral.",
    },
    {
      time: "4h ago",
      title: "Server License & RAM Upgrade",
      desc: "Jevonni C. Tejada logged Windows Server 2025 license & 8GB RAM.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#439849]/15 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">
              {greeting}, {user?.name || "Admin"}!
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-[#439849]/10 text-[#439849] border border-[#439849]/20">
              {user?.position || "System Operator"}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Here is your daily snapshot of department equipment requests and
            recommendations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/users"
            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-[#1c3f22] bg-[#439849]/10 hover:bg-[#439849]/20 border border-[#439849]/20 transition-all text-center"
          >
            Manage Users
          </Link>
          <Link
            href="/recommendations"
            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#439849] hover:bg-[#367c3b] transition-all shadow-sm shadow-[#439849]/30 text-center"
          >
            Run Recommendations
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm hover:border-[#439849]/40 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {stat.title}
              </span>
              <div className={`p-2 rounded-lg ${stat.bg}`}>{stat.icon}</div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-slate-900">
                {stat.value}
              </div>
              <div
                className={`text-xs font-medium mt-1 ${
                  stat.isPositive
                    ? "text-emerald-600"
                    : "text-amber-600 font-semibold"
                }`}
              >
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Two-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recommendations */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 min-h-[52px]">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Department Equipment Requests
              </h2>
              <p className="text-xs text-slate-500">
                Recent item requests and department assignments
              </p>
            </div>
            <Link
              href="/recommendations"
              className="text-xs font-semibold text-[#439849] hover:underline"
            >
              See all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="text-xs uppercase bg-slate-50 text-slate-500">
                <tr>
                  <th className="w-12 px-3 py-2.5 rounded-l-lg text-center">
                    #
                  </th>
                  <th className="px-3 py-2.5">Item Description</th>
                  <th className="px-3 py-2.5">Prepared By</th>
                  <th className="px-3 py-2.5">Requested By</th>
                  <th className="px-3 py-2.5">Date</th>
                  <th className="px-3 py-2.5 rounded-r-lg">Urgency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentRecommendations.map((rec, idx) => (
                  <tr
                    key={rec.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="px-3 py-3 text-center font-mono text-xs font-semibold text-slate-400">
                      {(idx + 1).toString().padStart(2, "0")}
                    </td>
                    <td className="px-3 py-3 font-semibold text-slate-800">
                      {rec.item_description}
                    </td>
                    <td className="px-3 py-3 text-xs font-medium text-slate-700">
                      {rec.prepared_by}
                    </td>
                    <td className="px-3 py-3 text-xs text-slate-600">
                      {rec.request_by}
                    </td>
                    <td className="px-3 py-3 text-xs font-mono text-slate-500 whitespace-nowrap">
                      {rec.request_date}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                          rec.urgency === "Critical"
                            ? "bg-red-50 text-red-600 border border-red-200"
                            : rec.urgency === "High"
                              ? "bg-amber-50 text-amber-600 border border-amber-200"
                              : "bg-blue-50 text-blue-600 border border-blue-200"
                        }`}
                      >
                        {rec.urgency}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Recent Activities */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 min-h-[52px]">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  System Activity
                </h2>
                <p className="text-xs text-slate-500">
                  Recent logs & automated events
                </p>
              </div>
              <span className="text-[11px] font-medium text-slate-400">
                5 events
              </span>
            </div>

            {/* Minimalist Activity List */}
            <div className="divide-y divide-slate-100 mt-2">
              {recentActivities.map((activity, idx) => (
                <div
                  key={idx}
                  className="group py-3 first:pt-2 last:pb-1 px-2.5 -mx-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#439849] transition-colors shrink-0"></span>
                      <h3 className="text-xs font-semibold text-slate-800 group-hover:text-slate-950 truncate">
                        {activity.title}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 shrink-0">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 pl-3.5 leading-relaxed line-clamp-2">
                    {activity.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-6">
            <div className="p-3 bg-gradient-to-r from-emerald-50/90 via-white to-emerald-50/50 rounded-xl border border-emerald-500/30 shadow-[0_0_18px_rgba(67,152,73,0.18)] ring-1 ring-emerald-400/30 flex items-center justify-between gap-3 transition-all">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border-2 border-emerald-500/40 ring-2 ring-emerald-400/20 bg-white shadow-xs">
                  <Image
                    src="/dgcd logo.jpg"
                    alt="DGCD Logo"
                    width={72}
                    height={72}
                    priority
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-xs min-w-0">
                  <span className="font-bold text-slate-900 block truncate">
                    DGCD Recommendation System
                  </span>
                  <div className="flex items-center gap-2 text-slate-500 mt-0.5">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] font-medium text-emerald-700 truncate">
                      Active & Processing Requests
                    </span>
                  </div>
                </div>
              </div>
              <span className="px-2 py-1 text-[10px] font-bold text-[#1c3f22] bg-emerald-100/90 border border-emerald-300 rounded-md shrink-0 animate-pulse shadow-xs">
                ● Live
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
