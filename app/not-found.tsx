import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat px-4 relative"
      style={{ backgroundImage: "url('/hardware_bg.jpg')" }}
    >
      {/* Light overlay with a subtle backdrop blur */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xs"></div>

      <div className="bg-white p-8 rounded-2xl border border-[#439849]/20 shadow-2xl shadow-[#439849]/5 max-w-md w-full text-center flex flex-col items-center relative z-10">
        {/* Logo Section */}
        <div className="mb-6">
          <Image
            src="/DGCD.jpg"
            alt="DGCD Logo"
            width={96}
            height={96}
            className="object-contain"
            priority
          />
        </div>

        {/* 404 Branding */}
        <span className="px-3 py-1 text-xs font-semibold text-[#439849] bg-[#439849]/10 rounded-full mb-4">
          404 Error
        </span>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-600 mb-8 max-w-xs">
          Sorry, we couldn&apos;t find the page you are looking for. It might have been moved or doesn&apos;t exist.
        </p>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="w-full py-3 px-4 text-sm rounded-md font-semibold text-white border border-[#439849] bg-[#439849] hover:bg-[#367c3b] transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#439849]"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
