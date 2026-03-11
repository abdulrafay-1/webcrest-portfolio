"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CurtainLayout from "../Components/CurtainLayout";
import {
  Globe,
  Smartphone,
  Bot,
  Users,
  ShieldCheck,
  Layers3,
  Cpu,
} from "lucide-react";
const AboutPage = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const parallaxBg = useRef<HTMLDivElement | null>(null);

  const whatsappNumber = "+923442667537";
  const whatsappMessage =
    "Hi Webcrest, I want to discuss my project. Please share the next available slot.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

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

  /* ---------------- WHY US STAGGER ANIMATION ---------------- */

  const whySection = sectionsRef.current[2];

  if (whySection) {
    const whyHeading = whySection.querySelector(".why-heading");
    const whyCards = whySection.querySelectorAll(".why-card");

    if (whyHeading) {
      gsap.from(whyHeading, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: whySection,
          start: "top 78%",
        },
      });
    }

    gsap.from(whyCards, {
      opacity: 0,
      y: 90,
      scale: 0.92,
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.16,
      scrollTrigger: {
        trigger: whySection,
        start: "top 72%",
      },
      onStart: () => {
        whyCards.forEach((card) => {
          const icon = card.querySelector(".why-icon");
          const title = card.querySelector(".why-title");
          const text = card.querySelector(".why-text");

          gsap.fromTo(
            [icon, title, text],
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.08,
              delay: 0.2,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            },
          );
        });
      },
    });
  }

  return (
    <CurtainLayout>
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
                software, innovative digital platforms, and intelligent
                automation systems.
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
                  icon: Globe,
                },
                {
                  title: "Mobile Apps",
                  text: "High-performance cross-platform mobile applications with seamless UX.",
                  icon: Smartphone,
                },
                {
                  title: "AI & Automation",
                  text: "AI-powered tools, automation systems and data-driven applications.",
                  icon: Bot,
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="expertise-card group p-8 border border-zinc-800 rounded-xl bg-zinc-950/40 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-3"
                  >
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10 text-purple-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-500/15 group-hover:text-purple-300">
                      <Icon size={28} strokeWidth={1.8} />
                    </div>

                    <h4 className="text-xl font-semibold text-purple-500 mb-3">
                      {item.title}
                    </h4>

                    <p className="text-gray-400 leading-7">{item.text}</p>
                  </div>
                );
              })}
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
            <h2 className="why-heading text-3xl font-bold text-center mb-20">
              Why Choose <span className="text-purple-500">Web Crest</span>
            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
              {[
                {
                  title: "Modern Technology",
                  text: "We use current frameworks, performant architectures, and future-ready engineering patterns for robust digital products.",
                  icon: Cpu,
                },
                {
                  title: "Scalable Architecture",
                  text: "Our systems are structured to support growth, maintainability, and high-performance delivery across products and platforms.",
                  icon: Layers3,
                },
                {
                  title: "Reliable Delivery",
                  text: "From planning to deployment, we focus on quality execution, clear communication, and dependable implementation.",
                  icon: ShieldCheck,
                },
                {
                  title: "Global Collaboration",
                  text: "We work closely with clients worldwide, aligning strategy, design, and development for efficient project outcomes.",
                  icon: Users,
                },
              ].map((item, i) => {
                const Icon = item.icon;

                return (
                  <div
                    key={i}
                    className="why-card group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/40 p-8 text-center transition-all duration-300 hover:-translate-y-3 hover:border-purple-500/60 hover:shadow-[0_0_40px_rgba(168,85,247,0.12)]"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.16),_transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="why-icon relative mb-6 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10 text-purple-400 transition-all duration-300 group-hover:scale-110 group-hover:border-purple-400/40 group-hover:bg-purple-500/15 group-hover:text-purple-300">
                      <Icon size={30} strokeWidth={1.8} />
                    </div>

                    <h4 className="why-title relative text-lg font-semibold text-purple-500 mb-3">
                      {item.title}
                    </h4>

                    <p className="why-text relative text-sm leading-7 text-gray-400">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </CurtainLayout>
  );
};

export default AboutPage;
