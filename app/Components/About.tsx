"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

type AboutProps = {
  title?: string;
  subtitle?: string;
  bullets?: string[];
};

export default function About({
  title = "About",
  subtitle = "We partner with startups and growing businesses to design and deliver digital products that are fast, secure, and easy to scale. From idea validation to launch and iteration, our team focuses on clean user experiences, stable architecture, and measurable business outcomes.",
  bullets = [
    "Mobile & Web app development",
    "Clean UI, scalable architecture",
    "Fast delivery with clear communication",
    "API integrations, dashboards, and admin panels",
    "Performance-focused builds with maintainable code",
    "Post-launch support, improvements, and long-term collaboration",
  ],
}: AboutProps) {
  const whatsappNumber = "+923442667537";
  const whatsappMessage =
    "Hi Webcrest, I want to discuss my project. Please share the next available slot.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleCharsRef = useRef<HTMLSpanElement[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bulletsRef = useRef<HTMLLIElement[]>([]);
  const dotsRef = useRef<HTMLSpanElement[]>([]);
  const btnsRef = useRef<HTMLDivElement>(null);

  const titleChars = title.split("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Label slide up
      tl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      );

      // Title characters stagger reveal
      tl.fromTo(
        titleCharsRef.current,
        { y: 70, rotateX: -40, opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.045,
        },
        "-=0.4",
      );

      // Subtitle fade + slide
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.3",
      );

      // Bullet dots scale in
      tl.fromTo(
        dotsRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          ease: "back.out(2)",
          stagger: 0.12,
        },
        "-=0.5",
      );

      // Bullet text slide in from left
      tl.fromTo(
        bulletsRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12,
        },
        "<",
      );

      // Buttons fade + rise
      tl.fromTo(
        btnsRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.2",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full min-h-screen bg-background flex items-center"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Label */}
          <p
            ref={labelRef}
            className="font-body text-xs font-medium tracking-[0.4em] uppercase text-muted-foreground"
            style={{ opacity: 0 }}
          >
            Who we are
          </p>

          {/* Title — character split */}
          <h2
            className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl overflow-hidden"
            style={{ perspective: "600px" }}
            aria-label={title}
          >
            {titleChars.map((char, i) => (
              <span
                key={i}
                ref={(el) => {
                  if (el) titleCharsRef.current[i] = el;
                }}
                className="inline-block"
                style={{ opacity: 0 }}
                aria-hidden="true"
              >
                {char === " " ? "\u00a0" : char}
              </span>
            ))}
          </h2>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="font-body mt-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8 lg:text-xl"
            style={{ opacity: 0 }}
          >
            {subtitle}
          </p>

          {/* Bullets */}
          <ul className="mt-6 space-y-3">
            {bullets.map((item, idx) => (
              <li
                key={idx}
                ref={(el) => {
                  if (el) bulletsRef.current[idx] = el;
                }}
                className="flex items-start gap-3"
                style={{ opacity: 0 }}
              >
                <span
                  ref={(el) => {
                    if (el) dotsRef.current[idx] = el;
                  }}
                  className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-primary"
                  aria-hidden="true"
                  style={{ opacity: 0, transform: "scale(0)" }}
                />
                <span className="font-body text-sm text-foreground/80 sm:text-base lg:text-lg">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div
            ref={btnsRef}
            className="mt-10 flex flex-wrap gap-3"
            style={{ opacity: 0 }}
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="font-body inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium tracking-wider text-primary-foreground transition-shadow duration-500 hover:shadow-[0_8px_40px_-8px_hsl(var(--primary)/0.5)] sm:text-base"
            >
              Contact
            </a>
            <Link
              href="/portfolio"
              className="font-body inline-flex items-center justify-center rounded-full border border-border/60 bg-transparent px-6 py-2.5 text-sm font-medium tracking-wider text-foreground transition-all duration-500 hover:border-primary/40 hover:bg-primary/5 sm:text-base"
            >
              View Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
