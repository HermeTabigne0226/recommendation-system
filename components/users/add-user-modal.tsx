"use client";

import { useState } from "react";
import axios from "axios";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  positionsList: { id: number; position: string }[];
}

export default function AddUserModal({
  isOpen,
  onClose,
  onSuccess,
  positionsList,
}: AddUserModalProps) {
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    role: "USER",
    position: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormLoading(true);

    try {
      await axios.post("/api/users", formData);
      setFormData({
        username: "",
        password: "",
        firstName: "",
        middleName: "",
        lastName: "",
        suffix: "",
        role: "USER",
        position: "",
      });
      onSuccess();
      onClose();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setFormError(err.response?.data?.error || "Failed to create user.");
      } else {
        setFormError("An unexpected error occurred.");
      }
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Add New System Operator
            </h3>
            <p className="text-xs text-slate-500">
              Fill in the details to register a new user in PostgreSQL.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg p-1 rounded-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {formError && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
            {formError}
          </div>
        )}

        <form onSubmit={handleCreateUser} className="space-y-3.5">
          {/* Row 1: First Name & Middle Name */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="e.g. Josh"
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#439849] focus:ring-1 focus:ring-[#439849] transition-all bg-slate-50/40 focus:bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Middle Name
              </label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                placeholder="e.g. Z."
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#439849] focus:ring-1 focus:ring-[#439849] transition-all bg-slate-50/40 focus:bg-white"
              />
            </div>
          </div>

          {/* Row 2: Last Name & Suffix */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="e.g. Daborbor"
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#439849] focus:ring-1 focus:ring-[#439849] transition-all bg-slate-50/40 focus:bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Suffix
              </label>
              <input
                type="text"
                name="suffix"
                value={formData.suffix}
                onChange={handleInputChange}
                placeholder="e.g. Jr., II, III (optional)"
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#439849] focus:ring-1 focus:ring-[#439849] transition-all bg-slate-50/40 focus:bg-white"
              />
            </div>
          </div>

          {/* Row 3: Username & Password */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Username *
              </label>
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleInputChange}
                placeholder="e.g. josh_daborbor"
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#439849] focus:ring-1 focus:ring-[#439849] transition-all bg-slate-50/40 focus:bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Password *
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#439849] focus:ring-1 focus:ring-[#439849] transition-all bg-slate-50/40 focus:bg-white"
              />
            </div>
          </div>

          {/* Row 4: Role & Position */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#439849] focus:ring-1 focus:ring-[#439849] bg-white transition-all"
              >
                <option value="USER">USER (Standard Operator)</option>
                <option value="ADMIN">ADMIN (System Administrator)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Position / Department *
              </label>
              <select
                name="position"
                required
                value={formData.position}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#439849] focus:ring-1 focus:ring-[#439849] bg-white transition-all"
              >
                <option value="">-- Select Position --</option>
                {positionsList.map((p) => (
                  <option key={p.id} value={p.position}>
                    {p.position}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formLoading}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#439849] hover:bg-[#367c3b] transition-all shadow-sm shadow-[#439849]/30 cursor-pointer flex items-center gap-1.5 disabled:opacity-60"
            >
              {formLoading ? "Saving..." : "Save Operator"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
