"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import CalendlyWidgetAssets from "@/app/Components/CalendlyWidgetAssets";
import { openCalendlyPopup } from "@/app/lib/calendly";

const navItems = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", id: "services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [calendlyReady, setCalendlyReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const calendlyUrl = "https://calendly.com/webcrestllc/30min";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (pathname !== "/") {
      router.push(`/#${id}`);
      setMobileOpen(false);
      return;
    }

    const target = document.getElementById(id);
    if (!target) return;

    window.dispatchEvent(
      new CustomEvent("app:scroll-to", {
        detail: { target, offset: -20 },
      }),
    );

    setMobileOpen(false);
  };

  const openCalendly = () => {
    openCalendlyPopup({ url: calendlyUrl });
  };

  return (
    <>
      <CalendlyWidgetAssets
        onReady={() => setCalendlyReady(true)}
        onError={() => setCalendlyReady(false)}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-2 border-b border-primary/20 bg-gradient-to-r from-primary/15 via-accent/10 to-secondary/40 backdrop-blur-xl shadow-[0_10px_40px_-20px_hsl(var(--glow-primary)/0.7)]"
            : "py-4 bg-gradient-to-r from-background/70 via-background/50 to-background/70"
        }`}
      >
        <div className="section-padding flex items-center justify-between">
          {/* Logo */}
          <motion.img
            src={"W-Logo.png"}
            alt="Web Crest"
            className="h-6 md:h-14 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}
          />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item, i) =>
              item.href ? (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <Link
                    href={item.href}
                    className="font-body text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300 relative group py-1"
                  >
                    {item.label}
                    <span className="absolute left-0 -bottom-[2px] w-0 h-[1.5px] bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ) : (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  onClick={() => scrollTo(item.id!)}
                  className="font-body text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300 relative group py-1 cursor-pointer"
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-[2px] w-0 h-[1.5px] bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
                </motion.button>
              ),
            )}

            {/* Book a Call Button */}
            <motion.button
              onClick={openCalendly}
              className="group relative cursor-pointer overflow-hidden rounded-full border border-purple-400/40 px-6 py-2.5 text-sm font-medium text-white"
              aria-label="Open Calendly booking modal"
              title={calendlyReady ? "Book a Call" : "Open booking page"}
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                Book a Call
              </span>

              {/* Hover Fill */}
              <span className="pointer-events-none absolute left-0 bottom-[-3.2vw] h-[100%] w-full scale-110 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:bottom-0" />
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <motion.span
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
              className="w-6 h-px bg-foreground block"
            />
            <motion.span
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              className="w-6 h-px bg-foreground block"
            />
            <motion.span
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
              className="w-6 h-px bg-foreground block"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/90 flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, i) =>
              item.href ? (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-4xl font-medium hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ) : (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(item.id!)}
                  className="text-4xl font-medium hover:text-primary transition-colors"
                >
                  {item.label}
                </motion.button>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
