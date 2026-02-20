"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type HeroProps = {
  titleTop?: string;
  titleBottom?: string;
  rightLines?: string[];
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
};

function splitToSpans(text: string, className: string) {
  return text.split("").map((ch, i) => (
    <span
      key={`${className}-${i}-${ch}`}
      className={className}
      style={{ display: "inline-block", willChange: "transform, opacity" }}
    >
      {ch === " " ? "\u00A0" : ch}
    </span>
  ));
}

export default function Hero({
  titleTop = "WEB",
  titleBottom = "CREST",
  rightLines = [
    "Digital Excellence",
    "Global Innovation",
    "Business Meets Art",
    "Unlock Brand Depth",
  ],
  ctaPrimaryText = "View Work",
  ctaPrimaryHref = "/work",
  ctaSecondaryText = "Contact",
  ctaSecondaryHref = "/contact",
}: HeroProps) {
  const container = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      // initial state
      gsap.set(".title-char", { opacity: 0, y: 26 });
      gsap.set(".right-line", { opacity: 0, y: 10 });
      gsap.set(".cta-btn", { opacity: 0, y: 10 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // ✅ "all at once" feel: very small stagger, longer duration
      tl.to(".title-char", {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: { each: 0.006, from: "start" }, // almost simultaneous
      });

      // ✅ overlap everything so it feels like one unified reveal
      tl.to(
        ".right-line",
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: { each: 0.03, from: "start" }, // still mostly together
        },
        "-=0.95",
      );

      tl.to(
        ".cta-btn",
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.04,
        },
        "-=0.75",
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(circle_at_70%_55%,rgba(255,255,255,0.06),transparent_60%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1400px] flex-col px-6 pb-16 pt-36">
        <div className="flex flex-1 flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <h1 className="select-none text-[72px] font-extrabold uppercase leading-[0.85] tracking-tight text-white sm:text-[92px] md:text-[120px] lg:text-[150px]">
              <span aria-label={titleTop}>
                {splitToSpans(titleTop, "title-char")}
              </span>
              <br />
              <span aria-label={titleBottom}>
                {splitToSpans(titleBottom, "title-char")}
              </span>
            </h1>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={ctaPrimaryHref}
                className="cta-btn rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                {ctaPrimaryText}
              </Link>

              <Link
                href={ctaSecondaryHref}
                className="cta-btn rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60"
              >
                {ctaSecondaryText}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-right -mt-18 px-45 text-lg font-light tracking-tight text-white/90 sm:text-xl">
            {rightLines.map((line) => (
              <p
                key={line}
                className="right-line"
                style={{ willChange: "transform, opacity" }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
