"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [displayedError, setDisplayedError] = useState("");

  if (error && error !== displayedError) {
    setDisplayedError(error);
  }
  const [loading, setLoading] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUsername(val);
    if (/\s/.test(val)) {
      setUsernameError("Username cannot contain spaces");
    } else {
      setUsernameError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameError) return;

    setLoading(true);
    setError("");

    try {
      await axios.post("/api/auth/login", { username, password });

      // Redirect to homepage on successful login
      router.push("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setError("Invalid username or password");
        } else {
          setError(
            error.response?.data?.error ||
              error.message ||
              "An unexpected error occurred.",
          );
        }
      } else {
        setError(
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
        );
      }

      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center min-h-screen items-center w-full bg-cover bg-center bg-no-repeat relative px-4"
      style={{ backgroundImage: "url('/hardware_bg.jpg')" }}
    >
      <style>{`
        @keyframes slideDownFade {
          from {
            transform: translateY(-3rem) scale(0.95);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        .animate-entrance {
          animation: slideDownFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Light overlay with a subtle backdrop blur */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xs"></div>

      <main className="w-full max-w-lg flex flex-col items-center justify-center relative z-10">
        <div className="py-4 w-full">
          <div className="p-6 rounded-lg bg-white border border-[#439849]/20 shadow-xl shadow-[#439849]/5 md:p-8 animate-entrance">
            <div className="mb-2 flex flex-col items-center justify-center">
              <Link href="/" className="flex flex-col items-center">
                <Image
                  src="/DGCD.jpg"
                  alt="DGCD Recommendation"
                  width={112}
                  height={112}
                  className="object-contain"
                  priority
                />
                <span className="text-xl font-bold text-slate-900 mt-2">
                  DGCD Recommendation
                </span>
              </Link>
            </div>
            <div className="text-center mb-6">
              <p className="text-sm text-slate-600">
                Enter your username and password to sign in.
              </p>
            </div>

            <form className="mt-6" onSubmit={handleSubmit}>
              {/* General Login Error Message */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  error ? "max-h-20 opacity-100 mb-4" : "max-h-0 opacity-0 mb-0"
                }`}
              >
                <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-600 text-sm text-center font-medium">
                  {error || displayedError}
                </div>
              </div>

              <div className="mb-1">
                <label
                  htmlFor="username"
                  className="mb-1 text-slate-900 font-medium text-sm inline-block"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="john_doe"
                  required
                  pattern="^\S+$"
                  title="Username cannot contain spaces"
                  disabled={loading}
                  className={`px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 disabled:bg-slate-50 ${
                    usernameError
                      ? "outline-red-500 focus:outline-red-500"
                      : "focus:outline-[#439849]"
                  }`}
                />
                <div className="h-5 mt-1 overflow-hidden">
                  <p
                    className={`text-red-500 text-xs transition-all duration-300 ease-in-out transform ${
                      usernameError
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    {usernameError || "\u00A0"}
                  </p>
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="mb-1 text-slate-900 font-medium text-sm inline-block"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={loading}
                    className="px-3 py-2.5 pr-10 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 disabled:bg-slate-50 focus:outline-[#439849]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    disabled={loading}
                    className="absolute right-3 flex items-center cursor-pointer text-slate-400 focus:outline-none disabled:cursor-not-allowed"
                  >
                    {showPassword ? (
                      <Image
                        src="/view.png"
                        alt="Show"
                        width={18}
                        height={18}
                        className="object-contain opacity-50 hover:opacity-100 transition-opacity duration-200"
                      />
                    ) : (
                      <Image
                        src="/hide.png"
                        alt="Hide"
                        width={18}
                        height={18}
                        className="object-contain opacity-50 hover:opacity-100 transition-opacity duration-200"
                      />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start flex-wrap gap-2 mb-6">
                <label className="flex items-center group has-[input:checked]:text-slate-900 cursor-pointer">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    disabled={loading}
                    className="sr-only"
                  />
                  {/* Custom box */}
                  <span
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 outline-slate-300 bg-white group-has-[input:checked]:bg-[#439849] group-has-[input:checked]:outline-[#439849] group-focus-within:outline-2 group-focus-within:outline-[#439849] group-disabled:bg-slate-100"
                    aria-hidden="true"
                  >
                    {/* Checkmark */}
                    <svg
                      className="size-3 text-white opacity-0 group-has-[input:checked]:opacity-100"
                      viewBox="0 0 12 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 5l3 3 7-7" />
                    </svg>
                  </span>
                  <span className="ml-3 text-sm text-slate-700">
                    Remember me
                  </span>
                </label>

                <Link
                  href="#"
                  className="ml-auto text-sm font-medium text-[#439849] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#439849] rounded"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-3.5 mb-6 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-[#439849] bg-[#439849] hover:bg-[#367c3b] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#439849] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <div className="text-slate-900 text-sm text-center">
                Don&apos;t have an account?{" "}
                <Link
                  href="#"
                  className="text-[#439849] hover:underline ml-1 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#439849] rounded"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
