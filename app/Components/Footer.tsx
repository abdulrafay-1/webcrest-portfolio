"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Footer() {
  const container = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.set(".footer-item", { opacity: 0, y: 10 });

      gsap.to(".footer-item", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: { each: 0.03 }, // mostly together
        delay: 0.05,
      });
    },
    { scope: container },
  );

  return (
    <footer
      ref={container}
      className="fixed bottom-0 left-0 right-0 z-40 px-6 pb-6 text-sm text-white/70"
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
        <div className="footer-item flex flex-col">
          <span>© WEB CREST STUDIO</span>
          <span className="text-xs text-white/40">Reg No. 2026-Design-001</span>
        </div>

        <Link
          href="/contact"
          className="footer-item rounded-full bg-purple-800 px-6 py-2 text-sm font-semibold text-white transition hover:bg-purple-900"
        >
          Contact
        </Link>
      </div>
    </footer>
  );
}
