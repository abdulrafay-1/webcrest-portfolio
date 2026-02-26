"use client";

import React from "react";

type AboutProps = {
  title?: string;
  subtitle?: string;
  bullets?: string[];
};

export default function About({
  title = "About",
  subtitle = "We build fast, reliable products with clean UI and solid backend foundations.",
  bullets = [
    "Mobile & Web app development",
    "Clean UI, scalable architecture",
    "Fast delivery with clear communication",
  ],
}: AboutProps) {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="font-body text-xs font-medium tracking-[0.4em] uppercase text-muted-foreground">
            Who we are
          </p>

          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>

          <p className="font-body mt-4 text-base leading-7 text-muted-foreground">
            {subtitle}
          </p>

          <ul className="mt-6 space-y-3">
            {bullets.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span
                  className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-primary"
                  aria-hidden="true"
                />
                <span className="font-body text-sm text-foreground/80 sm:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="font-body inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium tracking-wider text-primary-foreground transition-shadow duration-500 hover:shadow-[0_8px_40px_-8px_hsl(var(--primary)/0.5)]"
            >
              Contact
            </a>
            <a
              href="#work"
              className="font-body inline-flex items-center justify-center rounded-full border border-border/60 bg-transparent px-6 py-2.5 text-sm font-medium tracking-wider text-foreground transition-all duration-500 hover:border-primary/40 hover:bg-primary/5"
            >
              View Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
