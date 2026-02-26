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
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-gray-500">
            Who we are
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-700">{subtitle}</p>

          <ul className="mt-6 space-y-3">
            {bullets.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-gray-800">
                <span
                  className="mt-2 h-2 w-2 flex-none rounded-full bg-gray-900"
                  aria-hidden="true"
                />
                <span className="text-sm sm:text-base">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Contact
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              View Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
