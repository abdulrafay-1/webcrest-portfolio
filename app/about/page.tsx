"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AboutPage = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const parallaxBg = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /* ---------------- HERO TEXT STAGGER ---------------- */

      const heroItems = heroRef.current?.children;
      if (!heroItems) return;

      gsap.from(heroItems, {
        y: 120,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        stagger: {
          amount: 0.5,
        },
      });

      /* ---------------- SECTION REVEAL ---------------- */

      sectionsRef.current.forEach((section) => {
        if (!section) return;

        gsap.from(section.children, {
          opacity: 0,
          y: 120,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });
      });

      /* ---------------- BACKGROUND PARALLAX ---------------- */

      gsap.to(parallaxBg.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: parallaxBg.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* ---------------- CARD FLOAT EFFECT ---------------- */

      gsap.utils.toArray(".expertise-card").forEach((card: any) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-black text-white overflow-hidden">
      {/* HERO */}
      <section className="relative py-40 text-center border-b border-zinc-800">
        <div
          ref={parallaxBg}
          className="absolute inset-0 opacity-20 bg-gradient-to-br from-purple-600 via-purple-500 to-transparent blur-[140px]"
        />

        <div ref={heroRef} className="relative max-w-5xl mx-auto px-6">
          <h1 className="text-6xl font-bold mb-6">
            About <span className="text-purple-500">Web Crest</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            We build scalable software, modern web platforms, and intelligent
            digital systems that help businesses innovate and grow in the
            digital world.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section
        ref={(el) => {
          sectionsRef.current[0] = el;
        }}
        className="py-32 bg-[#0b0b0b]"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-purple-500">
              Who We Are
            </h2>

            <p className="text-gray-400 mb-4">
              Web Crest is a dynamic IT startup headquartered in Karachi,
              Pakistan. Founded in 2024, we focus on building cutting-edge
              software, innovative digital platforms, and intelligent automation
              systems.
            </p>

            <p className="text-gray-400">
              Our goal is to empower startups and businesses by transforming
              ideas into scalable digital solutions using modern technologies
              and efficient engineering practices.
            </p>
          </div>

          <div className="text-gray-400">
            <p className="mb-4">
              From product design to software architecture, our team delivers
              reliable solutions that combine performance, security, and
              exceptional user experience.
            </p>

            <p>
              We collaborate with businesses globally to build platforms that
              drive growth and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        ref={(el) => {
          sectionsRef.current[1] = el;
        }}
        className="py-32 border-y border-zinc-800"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-20">
            Our Expertise
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Web Development",
                text: "Scalable SaaS platforms and modern web apps using React, Next.js and Node.js.",
              },
              {
                title: "Mobile Apps",
                text: "High-performance cross-platform mobile applications with seamless UX.",
              },
              {
                title: "AI & Automation",
                text: "AI-powered tools, automation systems and data-driven applications.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="expertise-card p-8 border border-zinc-800 rounded-xl hover:border-purple-500 transition transform hover:-translate-y-3"
              >
                <h4 className="text-xl font-semibold text-purple-500 mb-3">
                  {item.title}
                </h4>

                <p className="text-gray-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section
        ref={(el) => {
          sectionsRef.current[2] = el;
        }}
        className="py-32 bg-[#0b0b0b]"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-20">
            Why Choose Web Crest
          </h2>

          <div className="grid md:grid-cols-4 gap-10 text-center">
            {[
              "Modern Technology",
              "Scalable Architecture",
              "Reliable Delivery",
              "Global Collaboration",
            ].map((item, i) => (
              <div key={i}>
                <h4 className="text-purple-500 font-semibold mb-2">{item}</h4>

                <p className="text-gray-400 text-sm">
                  We design systems that are built for performance and future
                  scalability.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={(el) => {
          sectionsRef.current[3] = el;
        }}
        className="py-36 text-center"
      >
        <h2 className="text-4xl font-bold mb-6">
          Let’s Build Something Powerful
        </h2>

        <p className="text-gray-400 mb-10 max-w-xl mx-auto">
          Have a project idea? Our team is ready to transform your vision into a
          powerful digital product.
        </p>

        <button className="bg-purple-600 hover:bg-purple-700 px-10 py-4 rounded-full font-semibold">
          Start Your Project
        </button>
      </section>
    </main>
  );
};

export default AboutPage;
