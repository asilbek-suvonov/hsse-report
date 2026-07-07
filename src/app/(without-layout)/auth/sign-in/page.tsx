import Signin from "@/components/Auth/Signin";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Kirish | HSSE Report",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen bg-gray-2 dark:bg-[#020D1A]">
      {/* ── Left panel: form ── */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-10 sm:px-8 lg:w-1/2 lg:px-16 xl:px-24">

        {/* Logo — only on mobile (lg: logo is in the right panel) */}
        <div className="mb-8 flex items-center gap-3 lg:hidden">
          <Image
            src="/images/logo/logo-icon.svg"
            alt="HSSE Logo"
            width={36}
            height={36}
            priority
          />
          <span className="text-xl font-bold text-dark dark:text-white">HSSE Report</span>
        </div>

        {/* Card */}
        <div className="w-full max-w-[480px] rounded-2xl border border-stroke bg-white p-6 shadow-sm dark:border-dark-3 dark:bg-gray-dark sm:p-10">
          {/* Heading */}
          <div className="mb-7">
            <h1 className="mb-2 text-2xl font-bold text-dark dark:text-white sm:text-3xl">
              Tizimga kirish
            </h1>
            <p className="text-sm text-gray-500 dark:text-dark-6">
              Akkauntingizga kirish uchun ma'lumotlarni kiriting
            </p>
          </div>

          <Signin />
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400 dark:text-dark-6">
          © {new Date().getFullYear()} HSSE Report. Barcha huquqlar himoyalangan.
        </p>
      </div>

      {/* ── Right panel: branding — hidden on mobile ── */}
      <div className="relative hidden overflow-hidden lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/90 via-primary to-blue-700 dark:from-primary/80 dark:via-primary/70 dark:to-blue-900" />

        {/* Decorative blobs */}
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-12 text-center xl:px-20">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Image
                src="/images/logo/logo-icon.svg"
                alt="HSSE Logo"
                width={36}
                height={36}
                priority
              />
            </div>
            <span className="text-2xl font-bold text-white">HSSE Report</span>
          </div>

          {/* Headline */}
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white xl:text-4xl">
            Xavfsizlik monitoring<br />tizimi
          </h2>
          <p className="mb-10 max-w-sm text-base text-white/80 leading-relaxed">
            Hodisa va kuzatuvlarni real vaqtda kuzating, boshqaring va tahlil qiling.
          </p>

          {/* Feature pills */}
          <div className="flex flex-col gap-3 w-full max-w-xs">
            {[
              { icon: "📊", text: "Real-time analitika va hisobotlar" },
              { icon: "🔔", text: "Hodisalarni zudlik bilan kuzatish" },
              { icon: "👥", text: "Xodimlar boshqaruvi" },
              { icon: "📅", text: "Kalendar va monitoring" },
            ].map(item => (
              <div key={item.text}
                className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 text-left backdrop-blur-sm">
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium text-white">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Illustration */}
          <div className="mt-10 opacity-30">
            <Image
              src="/images/grids/grid-02.svg"
              alt=""
              role="presentation"
              width={340}
              height={240}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
