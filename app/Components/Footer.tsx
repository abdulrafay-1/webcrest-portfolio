"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-black">
      {/* Purple glow / gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-purple-600/35 blur-[120px]" />
        <div className="absolute top-0 right-0 h-[420px] w-[520px] rounded-full bg-fuchsia-500/25 blur-[120px]" />
        <div className="absolute -bottom-24 left-0 h-[380px] w-[560px] rounded-full bg-violet-500/20 blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/25 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-8 pt-10 md:px-10 md:pb-10 md:pt-14">
        {/* Top row */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Left menu */}
          <div className="text-sm font-medium text-white/90">
            <div className="leading-6">
              <Link className="block w-fit hover:text-white" href="/services">
                Services
              </Link>
              <Link className="block w-fit hover:text-white" href="/portfolio">
                Portfolio
              </Link>
              <Link className="block w-fit hover:text-white" href="/contact">
                Contact
              </Link>
            </div>
          </div>

          {/* Right newsletter */}
          <div className="w-full max-w-md md:text-right">
            <p className="text-xs leading-5 text-white/70">
              Get product updates, case studies, and growth insights from
              Webcrest straight to your inbox.
            </p>

            <div className="mt-3 flex items-center gap-2 md:justify-end">
              <div className="relative w-full md:w-[320px]">
                <input
                  type="email"
                  placeholder="Email address"
                  className="h-11 w-full rounded-full border border-white/15 bg-white/5 px-4 pr-12 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-purple-400/60 focus:bg-white/7"
                />
                <button
                  type="button"
                  aria-label="Subscribe"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs text-white/85 transition hover:bg-white/15"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Big brand word */}
        <div className="mt-10 md:mt-14">
          <h2 className="select-none text-[64px] font-semibold leading-[0.95] tracking-tight text-white/90 sm:text-[92px] md:text-[130px] lg:text-[168px]">
            Webcrest
          </h2>
        </div>

        {/* Bottom row */}
        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-4 text-[11px] text-white/55 md:flex-row md:items-center md:justify-between">
          <p>Copyright © {new Date().getFullYear()} Webcrest Studio</p>

          <div className="flex flex-wrap items-center gap-4">
            <span>📍 Karachi, PK</span>
            <span>
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>

            <div className="ml-0 flex items-center gap-4 md:ml-6">
              <Link
                className="hover:text-white"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </Link>
              <Link
                className="hover:text-white"
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
