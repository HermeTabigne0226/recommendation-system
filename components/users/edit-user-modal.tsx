"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface UserItem {
  id: string;
  userId: number;
  username: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  suffix: string | null;
  name: string;
  role: string;
  position: string;
  isActive: boolean;
  createdAt: string;
}

interface EditUserModalProps {
  isOpen: boolean;
  user: UserItem | null;
  onClose: () => void;
  onSuccess: () => void;
  positionsList: { id: number; position: string }[];
}

export default function EditUserModal({
  isOpen,
  user,
  onClose,
  onSuccess,
  positionsList,
}: EditUserModalProps) {
  const [editFormLoading, setEditFormLoading] = useState(false);
  const [editFormError, setEditFormError] = useState("");
  const [editFormData, setEditFormData] = useState({
    id: "",
    username: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    role: "USER",
    position: "",
    isActive: true,
  });

  useEffect(() => {
    if (user) {
      setEditFormError("");
      setEditFormData({
        id: user.id,
        username: user.username,
        password: "",
        firstName: user.firstName || "",
        middleName: user.middleName || "",
        lastName: user.lastName || "",
        suffix: user.suffix || "",
        role: user.role,
        position: user.position,
        isActive: user.isActive,
      });
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const value =
      e.target.name === "isActive"
        ? e.target.value === "true"
        : e.target.value;
    setEditFormData({ ...editFormData, [e.target.name]: value });
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditFormError("");
    setEditFormLoading(true);

    try {
      await axios.put("/api/users", editFormData);
      onSuccess();
      onClose();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setEditFormError(err.response?.data?.error || "Failed to update user.");
      } else {
        setEditFormError("An unexpected error occurred.");
      }
    } finally {
      setEditFormLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Edit System Operator
            </h3>
            <p className="text-xs text-slate-500">
              Update operator profile and permissions in PostgreSQL.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg p-1 rounded-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {editFormError && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
            {editFormError}
          </div>
        )}

        <form onSubmit={handleUpdateUser} className="space-y-3.5">
          {/* Row 1: First Name & Middle Name */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={editFormData.firstName}
                onChange={handleEditInputChange}
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
                value={editFormData.middleName}
                onChange={handleEditInputChange}
                placeholder="e.g. Z."
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#439849] focus:ring-1 focus:ring-[#439849] transition-all bg-slate-50/40 focus:bg-white"
              />
            </div>
          </div>

          {/* Row 2: Last Name & Suffix */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={editFormData.lastName}
                onChange={handleEditInputChange}
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
                value={editFormData.suffix}
                onChange={handleEditInputChange}
                placeholder="e.g. Jr., II, III"
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#439849] focus:ring-1 focus:ring-[#439849] transition-all bg-slate-50/40 focus:bg-white"
              />
            </div>
          </div>

          {/* Row 3: Username & New Password */}
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={editFormData.username}
                onChange={handleEditInputChange}
                placeholder="e.g. josh_daborbor"
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#439849] focus:ring-1 focus:ring-[#439849] transition-all bg-slate-50/40 focus:bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={editFormData.password}
                onChange={handleEditInputChange}
                placeholder="Leave blank to keep unchanged"
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
                value={editFormData.role}
                onChange={handleEditInputChange}
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
                value={editFormData.position}
                onChange={handleEditInputChange}
                className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#439849] focus:ring-1 focus:ring-[#439849] bg-white transition-all"
              >
                <option value="">-- Select Position --</option>
                {positionsList.map((p) => (
                  <option key={p.id} value={p.position}>
                    {p.position}
                  </option>
                ))}
                {editFormData.position &&
                  !positionsList.some(
                    (p) => p.position === editFormData.position,
                  ) && (
                    <option value={editFormData.position}>
                      {editFormData.position}
                    </option>
                  )}
              </select>
            </div>
          </div>

          {/* Row 5: Account Status */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Account Status
            </label>
            <select
              name="isActive"
              value={editFormData.isActive ? "true" : "false"}
              onChange={handleEditInputChange}
              className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-[#439849] focus:ring-1 focus:ring-[#439849] bg-white transition-all"
            >
              <option value="true">Active (Account Enabled)</option>
              <option value="false">Disabled (Cannot Login)</option>
            </select>
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
              disabled={editFormLoading}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#439849] hover:bg-[#367c3b] transition-all shadow-sm shadow-[#439849]/30 cursor-pointer flex items-center gap-1.5 disabled:opacity-60"
            >
              {editFormLoading ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
