"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/W-Logo.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type HeaderProps = {
  brand?: string;
};





export default function Header({ brand }: HeaderProps) {
  const container = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.set(".header-item", { opacity: 0, y: 12 });

      gsap.to(".header-item", {
        opacity: 1,
        y: 0,
        duration: 0.95,
        ease: "power3.out",
        stagger: { each: 0.04 }, // mostly together
        delay: 0.03,
      });
    },
    { scope: container },
  );

  return (
    <header ref={container} className="fixed top-0 left-0 right-0 z-50">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent" />

      <div className="relative mx-auto flex w-full max-w-[1400px] items-start justify-between px-6 pt-6">
        <Link href="/" aria-label="Home" className="header-item shrink-0">
          <Image
            src={Logo}
            alt="Webcrest Logo"
            priority
            className="h-[60px] w-auto sm:h-[75px] md:h-[90px] lg:h-[105px]"
          />
        </Link>

        <nav className="header-item mt-3 hidden flex-1 items-start justify-center sm:flex">
          <Link
            href="/work"
            className="text-5xl font-semibold tracking-tight text-white/95 hover:text-white"
          >
            Work
          </Link>
        </nav>

        <div className="header-item mt-3 flex items-start justify-end gap-6">
          <Link
            href="/studio"
            className="text-5xl font-semibold tracking-tight text-white/95 hover:text-white"
          >
            Studio
          </Link>
        </div>
      </div>
    </header>
  );
}
