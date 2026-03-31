"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import CurtainLayout from "../Components/CurtainLayout";

const services = [
  {
    num: "01",
    title: "Web Development",
    sub: "Engineered to perform",
    desc: "Next.js, edge-deployed, pixel-perfect. We build sites and apps that load in milliseconds and feel alive. From monolithic marketing sites to dynamic web applications, our architecture ensures you never compromise on speed, SEO, or user experience.",
    deliverables: [
      "Next.js App Router Architecture",
      "React Ecosystem Integrations",
      "Headless CMS Integration",
      "Edge Deployment",
      "Technical SEO Auditing",
    ],
    stat: "99.9%",
    statLabel: "Uptime SLA",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <rect x="4" y="8" width="40" height="32" rx="2" />
        <line x1="4" y1="16" x2="44" y2="16" />
        <polyline points="14,28 20,22 14,16" strokeWidth="1.5" />
        <line x1="22" y1="28" x2="34" y2="28" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Motion & 3D",
    sub: "Where code meets cinema",
    desc: "GSAP, Three.js, WebGL shaders. We bring depth and drama to digital experiences — interactive 3D scenes, scroll-driven storytelling, and animations that make people stop scrolling. Every interaction is calculated to delight without disrupting the user journey.",
    deliverables: [
      "Three.js & WebGL Environments",
      "Scroll-driven Storytelling",
      "GLSL Custom Shaders",
      "Lottie / Rive Integrations",
      "GSAP Micro-interactions",
    ],
    stat: "60fps",
    statLabel: "Always Smooth",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <polygon points="24,4 44,36 4,36" />
        <polygon points="24,14 38,36 10,36" opacity="0.4" />
        <circle cx="24" cy="30" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "E-Commerce",
    sub: "Built to convert",
    desc: "Shopify Plus, custom storefronts, headless commerce. We design buying experiences that feel effortless — from first impression to repeat purchase. We blend conversion-rate optimization with cutting-edge design to elevate your brand's digital flagship store.",
    deliverables: [
      "Custom Headless Storefronts",
      "Shopify Plus Development",
      "AR Try-On Integration",
      "Payment Gateway Architectures",
      "Inventory & ERP Sync",
    ],
    stat: "3.8×",
    statLabel: "Avg. Conversion Lift",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M6 6h4l6 24h20l4-16H14" />
        <circle cx="20" cy="38" r="3" />
        <circle cx="34" cy="38" r="3" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "SaaS & Platforms",
    sub: "Complexity, tamed",
    desc: "We design and build SaaS products that handle real complexity gracefully. Between intense data visualization, complex onboarding flows, and secure multi-tenant architectures, we help you launch platforms that your users actually enjoy logging into.",
    deliverables: [
      "Complex Dashboard UX/UI",
      "D3.js Data Visualization",
      "Real-time Data Architecture",
      "Auth & Multi-tenancy Systems",
      "B2B Platform Scaling",
    ],
    stat: "12min",
    statLabel: "Avg. Onboarding",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <rect x="4" y="4" width="18" height="18" rx="1" />
        <rect x="26" y="4" width="18" height="18" rx="1" />
        <rect x="4" y="26" width="18" height="18" rx="1" />
        <rect x="26" y="26" width="18" height="18" rx="1" />
      </svg>
    ),
  },
];

const techStack = [
  {
    name: "React",
    left: "4%",
    top: "10%",
    colorFrom: "#8B5CF6",
    colorTo: "#3B82F6",
    icon: "https://cdn.simpleicons.org/react/ffffff",
  },
  {
    name: "Next.js",
    left: "24%",
    top: "18%",
    colorFrom: "#7C3AED",
    colorTo: "#A855F7",
    icon: "https://cdn.simpleicons.org/nextdotjs/ffffff",
  },
  {
    name: "TypeScript",
    left: "42%",
    top: "8%",
    colorFrom: "#2563EB",
    colorTo: "#60A5FA",
    icon: "https://cdn.simpleicons.org/typescript/ffffff",
  },
  {
    name: "Node.js",
    left: "66%",
    top: "12%",
    colorFrom: "#15803D",
    colorTo: "#4ADE80",
    icon: "https://cdn.simpleicons.org/nodedotjs/ffffff",
  },
  {
    name: "MERN",
    left: "80%",
    top: "22%",
    colorFrom: "#166534",
    colorTo: "#22C55E",
    icon: "https://cdn.simpleicons.org/mongodb/ffffff",
  },
  {
    name: "AI / Python",
    left: "10%",
    top: "40%",
    colorFrom: "#2563EB",
    colorTo: "#A855F7",
    icon: "https://cdn.simpleicons.org/python/ffffff",
  },
  {
    name: "Three.js",
    left: "34%",
    top: "48%",
    colorFrom: "#7C3AED",
    colorTo: "#EC4899",
    icon: "https://cdn.simpleicons.org/threedotjs/ffffff",
  },
  {
    name: "Tailwind",
    left: "54%",
    top: "38%",
    colorFrom: "#0891B2",
    colorTo: "#22D3EE",
    icon: "https://cdn.simpleicons.org/tailwindcss/ffffff",
  },
  {
    name: "AWS",
    left: "72%",
    top: "50%",
    colorFrom: "#D97706",
    colorTo: "#F59E0B",
    icon: "https://img.icons8.com/?size=48&id=33039&format=png",
  },
  {
    name: "Shopify",
    left: "22%",
    top: "72%",
    colorFrom: "#4D7C0F",
    colorTo: "#84CC16",
    icon: "https://cdn.simpleicons.org/shopify/ffffff",
  },
  {
    name: "WebGL",
    left: "48%",
    top: "72%",
    colorFrom: "#6D28D9",
    colorTo: "#C026D3",
    icon: "https://cdn.simpleicons.org/webgl/ffffff",
  },
  {
    name: "Framer Motion",
    left: "70%",
    top: "74%",
    colorFrom: "#7C3AED",
    colorTo: "#F472B6",
    icon: "https://cdn.simpleicons.org/framer/ffffff",
  },
];

type TechChipProps = {
  tech: (typeof techStack)[number];
  constraintRef: React.RefObject<HTMLDivElement | null>;
  index: number;
};

function TechChip({ tech, constraintRef, index }: TechChipProps) {
  return (
    <motion.div
      drag
      dragConstraints={constraintRef}
      dragElastic={0.16}
      dragMomentum={true}
      dragTransition={{
        bounceStiffness: 260,
        bounceDamping: 22,
      }}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.45,
        delay: index * 0.04,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.06,
        y: -4,
        transition: { type: "spring", stiffness: 320, damping: 18 },
      }}
      whileTap={{
        scale: 0.98,
        cursor: "grabbing",
      }}
      className="absolute cursor-grab active:cursor-grabbing select-none"
      style={{
        left: tech.left,
        top: tech.top,
      }}
    >
      <div
        className="group inline-flex items-center gap-3 rounded-full border px-5 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-transform duration-300"
        style={{
          background: `linear-gradient(135deg, ${tech.colorFrom}, ${tech.colorTo})`,
          borderColor: "rgba(255,255,255,0.14)",
        }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/15">
          <img
            src={tech.icon}
            alt={tech.name}
            draggable={false}
            className="pointer-events-none h-5 w-5 object-contain"
          />
        </div>

        <span className="whitespace-nowrap text-sm md:text-[15px] font-semibold text-white tracking-[0.01em]">
          {tech.name}
        </span>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const ballsContainerRef = useRef<HTMLDivElement | null>(null);
  const parallaxBg = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const heroItems = heroRef.current?.children;

      if (heroItems) {
        gsap.from(heroItems, {
          y: 120,
          opacity: 0,
          duration: 1.4,
          ease: "power4.out",
          stagger: {
            amount: 0.5,
          },
        });
      }

      if (parallaxBg.current) {
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
      }

      const serviceSections = gsap.utils.toArray<HTMLElement>(".svc-section");

      serviceSections.forEach((sec) => {
        const icon = sec.querySelector(".svc-icon") as HTMLElement | null;
        const title = sec.querySelector(".svc-title") as HTMLElement | null;
        const num = sec.querySelector(".svc-num") as HTMLElement | null;
        const descItems = sec.querySelectorAll(".svc-desc-reveal");
        const listItems = sec.querySelectorAll(".svc-list-item");
        const statWrapper = sec.querySelector(
          ".svc-stat-wrapper",
        ) as HTMLElement | null;

        if (!icon || !title || !num || !statWrapper) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: "top 75%",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          num,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" },
        )
          .fromTo(
            title,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
            "-=0.3",
          )
          .fromTo(
            icon,
            { opacity: 0, rotate: -45, scale: 0.5 },
            {
              opacity: 1,
              rotate: 0,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.5)",
            },
            "-=0.4",
          )
          .fromTo(
            descItems,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              duration: 0.5,
              ease: "power3.out",
            },
            "-=0.4",
          )
          .fromTo(
            listItems,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              stagger: 0.05,
              duration: 0.4,
              ease: "power2.out",
            },
            "-=0.4",
          )
          .fromTo(
            statWrapper,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
            "-=0.3",
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <CurtainLayout>
      <div className="bg-black text-white min-h-screen" ref={containerRef}>
        <style>{`
          .svc-section {
            padding: 80px 24px;
            border-bottom: 1px solid rgba(63, 63, 70, 0.55);
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            max-width: 1400px;
            margin: 0 auto;
          }

          @media (max-width: 992px) {
            .svc-section {
              grid-template-columns: 1fr;
              gap: 32px;
              padding: 60px 24px;
            }
          }

          .svc-left {
            position: relative;
          }

          .svc-num {
            font-family: var(--font-body, sans-serif);
            font-size: 14px;
            letter-spacing: 0.3em;
            color: rgb(168 85 247);
            margin-bottom: 24px;
            display: block;
          }

          .svc-title {
            font-family: var(--font-display, sans-serif);
            font-size: clamp(40px, 5vw, 72px);
            font-weight: 600;
            line-height: 1;
            margin-bottom: 24px;
            letter-spacing: -0.02em;
            color: white;
          }

          .svc-icon {
            width: 80px;
            height: 80px;
            color: rgb(168 85 247);
            margin-bottom: 40px;
          }

          .svc-right {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .svc-desc-reveal {
            font-family: var(--font-body, sans-serif);
            font-size: 18px;
            line-height: 1.7;
            color: rgb(156 163 175);
            margin-bottom: 24px;
          }

          .svc-deliverables {
            margin-top: 40px;
          }

          .svc-deliverables h4 {
            font-family: var(--font-body, sans-serif);
            font-size: 12px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: white;
            margin-bottom: 24px;
            border-bottom: 1px solid rgba(63, 63, 70, 0.7);
            padding-bottom: 12px;
          }

          .svc-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }

          @media (max-width: 600px) {
            .svc-list {
              grid-template-columns: 1fr;
            }
          }

          .svc-list-item {
            font-family: var(--font-body, sans-serif);
            font-size: 14px;
            color: rgb(156 163 175);
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .svc-list-item::before {
            content: "";
            display: block;
            width: 6px;
            height: 6px;
            border-radius: 999px;
            background: rgba(168, 85, 247, 0.65);
          }

          .svc-stat-wrapper {
            margin-top: 48px;
            padding: 32px;
            background: rgba(168, 85, 247, 0.04);
            border: 1px solid rgba(168, 85, 247, 0.12);
            border-radius: 16px;
            display: inline-flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .svc-stat-num {
            font-family: var(--font-display, sans-serif);
            font-size: clamp(48px, 4vw, 64px);
            font-weight: 700;
            color: white;
            line-height: 1;
            margin-bottom: 8px;
          }

          .svc-stat-label {
            font-family: var(--font-body, sans-serif);
            font-size: 12px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: rgb(168 85 247);
          }
        `}</style>
        <section className="relative py-40 text-center border-b border-zinc-800 overflow-hidden bg-black">
          <div
            ref={parallaxBg}
            className="absolute inset-0 opacity-20 bg-gradient-to-br from-purple-600 via-purple-500 to-transparent blur-[140px]"
          />

          <div ref={heroRef} className="relative max-w-5xl mx-auto px-6">
            <h1 className="text-6xl font-bold mb-6">
              Our <span className="text-purple-500">Expertise</span>
            </h1>

            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              We craft scalable software, immersive digital platforms, and
              powerful digital systems that help businesses grow through modern
              engineering and intelligent design.
            </p>
          </div>
        </section>
        <div className="svc-content-wrap">
          {services.map((svc) => (
            <section
              key={svc.num}
              className="svc-section"
              id={`service-${svc.num}`}
            >
              <div className="svc-left">
                <span className="svc-num">
                  {svc.num} — {svc.sub}
                </span>
                <div className="svc-icon">{svc.icon}</div>
                <h2 className="svc-title">{svc.title}</h2>

                <div className="svc-stat-wrapper">
                  <div className="svc-stat-num">{svc.stat}</div>
                  <div className="svc-stat-label">{svc.statLabel}</div>
                </div>
              </div>

              <div className="svc-right">
                <p className="svc-desc-reveal">{svc.desc}</p>

                <div className="svc-deliverables">
                  <h4>Core Deliverables</h4>
                  <ul className="svc-list">
                    {svc.deliverables.map((item, i) => (
                      <li key={i} className="svc-list-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>
        <section className="py-24 px-6 bg-black flex justify-center">
          <div className="w-full max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
                Technologies <span className="text-purple-500">We Breathe</span>
              </h2>

              <p className="text-gray-400 max-w-2xl mx-auto">
                The modern stack we use to build fast, scalable and immersive
                digital products.
              </p>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-4 border border-zinc-800 rounded-lg px-5 py-4 hover:bg-white/[0.03] transition"
                >
                  <img src={tech.icon} alt={tech.name} className="w-6 h-6" />

                  <span className="text-white font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </CurtainLayout>
  );
}
