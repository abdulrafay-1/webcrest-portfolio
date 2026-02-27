"use client";

import Link from "next/link";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Work" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-0 h-[100vh] w-full overflow-hidden bg-black">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-purple-600/35 blur-[120px]" />
        <div className="absolute top-0 right-0 h-[420px] w-[520px] rounded-full bg-fuchsia-500/25 blur-[120px]" />
        <div className="absolute -bottom-24 left-0 h-[380px] w-[560px] rounded-full bg-violet-500/20 blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/25 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_30%_20%,rgba(255,255,255,0.06),transparent_45%)]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col px-6 pb-10 pt-16 sm:px-10 sm:pb-12 sm:pt-20 lg:px-12 lg:pt-24">
        {/* Top section */}
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-10">
          {/* Nav (fixed alignment + premium treatment) */}
          <div className="md:col-span-4">
            <p className="text-xs font-medium tracking-[0.22em] text-white/45">
              STUDIO INDEX
            </p>

            <p className="mt-4 max-w-[22rem] text-sm leading-relaxed text-white/65">
              Award-winning digital experiences—crafted with taste, built for
              performance.
            </p>

            <nav className="mt-7">
              <ul className="space-y-2">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="
                        group inline-flex w-full max-w-[18rem] items-center justify-between
                        rounded-xl border border-white/10 bg-white/0 px-4 py-3
                        text-[15px] font-medium text-white/85 transition
                        hover:border-white/15 hover:bg-white/[0.04] hover:text-white
                      "
                    >
                      <span className="flex items-center gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/30 transition group-hover:bg-white/60" />
                        {l.label}
                      </span>

                      <span className="text-white/40 transition group-hover:translate-x-0.5 group-hover:text-white/70">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-5 md:col-start-8 md:text-right">
            <p className="text-xs font-medium tracking-[0.22em] text-white/45">
              INSIDER NOTES
            </p>

            <p className="mt-5 text-base leading-relaxed text-white/80">
              Award-winning insights, sharp product thinking, and design
              references—occasionally.
            </p>

            <form
              className="mt-8 flex w-full items-center gap-3 md:ml-auto md:max-w-md md:justify-end"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Email address"
                  className="h-12 w-full rounded-full border border-white/15 bg-white/5 px-5 pr-14 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  →
                </button>
              </div>
            </form>

            <p className="mt-3 text-xs text-white/45 md:ml-auto md:max-w-md">
              No noise. No spam. Opt out anytime.
            </p>
          </div>
        </div>

        {/* Brand word */}
        <div className="mt-10 flex flex-1 items-end">
          <h2 className="select-none text-[72px] font-semibold leading-[0.9] tracking-tight text-white sm:text-[110px] md:text-[170px] lg:text-[200px]">
            Webcrest
          </h2>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-white/15 pt-6">
          <div className="flex flex-col gap-4 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} Webcrest Studio. Crafted with intent.
            </p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
              <span className="text-white/55">Karachi, PK</span>

              {socialLinks.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/70 transition hover:text-white"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
