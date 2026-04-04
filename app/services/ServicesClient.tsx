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
    title: "AI Development",
    sub: "Intelligence built into products",
    desc: "We build AI-powered products and automation systems that streamline operations, improve customer engagement, and add intelligence to your business workflows. From LLM integrations to custom AI assistants, we turn complex ideas into usable systems.",
    deliverables: [
      "AI Chatbots & Virtual Assistants",
      "LLM / OpenAI Integrations",
      "Workflow Automation",
      "Custom AI Features",
      "Machine Learning Solutions",
    ],
    stat: "24/7",
    statLabel: "Automation Ready",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <rect x="12" y="12" width="24" height="24" rx="6" />
        <path d="M24 6v6M24 36v6M6 24h6M36 24h6" />
        <circle cx="19" cy="22" r="1.5" fill="currentColor" />
        <circle cx="29" cy="22" r="1.5" fill="currentColor" />
        <path d="M18 29c2 2 10 2 12 0" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Mobile App Development",
    sub: "Built for every screen",
    desc: "We design and develop mobile applications for iOS and Android with a strong focus on performance, scalability, and user experience. Whether it is an MVP, a consumer app, or a business platform, we build mobile products ready for real-world growth.",
    deliverables: [
      "React Native Development",
      "Flutter App Development",
      "Cross-platform Architecture",
      "API & Backend Integration",
      "App Store Deployment Support",
    ],
    stat: "iOS + Android",
    statLabel: "Production Ready",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <rect x="14" y="4" width="20" height="40" rx="4" />
        <line x1="20" y1="10" x2="28" y2="10" />
        <circle cx="24" cy="36" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    num: "04",
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
    num: "05",
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
    num: "06",
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
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    left: "24%",
    top: "18%",
    colorFrom: "#7C3AED",
    colorTo: "#A855F7",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "TypeScript",
    left: "42%",
    top: "8%",
    colorFrom: "#2563EB",
    colorTo: "#60A5FA",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Node.js",
    left: "66%",
    top: "12%",
    colorFrom: "#15803D",
    colorTo: "#4ADE80",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "MERN",
    left: "80%",
    top: "22%",
    colorFrom: "#166534",
    colorTo: "#22C55E",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Python",
    left: "10%",
    top: "40%",
    colorFrom: "#2563EB",
    colorTo: "#A855F7",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Three.js",
    left: "34%",
    top: "48%",
    colorFrom: "#7C3AED",
    colorTo: "#EC4899",
    icon: "https://skillicons.dev/icons?i=threejs",
  },
  {
    name: "Tailwind CSS",
    left: "54%",
    top: "38%",
    colorFrom: "#0891B2",
    colorTo: "#22D3EE",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "AWS",
    left: "72%",
    top: "50%",
    colorFrom: "#D97706",
    colorTo: "#F59E0B",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    name: "Shopify",
    left: "22%",
    top: "72%",
    colorFrom: "#4D7C0F",
    colorTo: "#84CC16",
    icon: "https://cdn.worldvectorlogo.com/logos/shopify.svg",
  },
  {
    name: "Framer Motion",
    left: "70%",
    top: "74%",
    colorFrom: "#7C3AED",
    colorTo: "#F472B6",
    icon: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
  },
  {
    name: "WordPress",
    left: "6%",
    top: "82%",
    colorFrom: "#1E3A8A",
    colorTo: "#3B82F6",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg",
  },
  {
    name: "PHP",
    left: "18%",
    top: "60%",
    colorFrom: "#4F46E5",
    colorTo: "#818CF8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  },
  {
    name: "MySQL",
    left: "36%",
    top: "86%",
    colorFrom: "#0F766E",
    colorTo: "#2DD4BF",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "PostgreSQL",
    left: "58%",
    top: "86%",
    colorFrom: "#1D4ED8",
    colorTo: "#60A5FA",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "MongoDB",
    left: "78%",
    top: "84%",
    colorFrom: "#14532D",
    colorTo: "#22C55E",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Docker",
    left: "88%",
    top: "60%",
    colorFrom: "#0EA5E9",
    colorTo: "#38BDF8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Firebase",
    left: "30%",
    top: "30%",
    colorFrom: "#CA8A04",
    colorTo: "#FACC15",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  {
    name: "GraphQL",
    left: "50%",
    top: "20%",
    colorFrom: "#BE185D",
    colorTo: "#F472B6",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  },
  {
    name: "GSAP",
    left: "60%",
    top: "65%",
    colorFrom: "#84CC16",
    colorTo: "#4D7C0F",
    icon: "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg",
  },
  {
    name: "Express.js",
    left: "12%",
    top: "22%",
    colorFrom: "#111827",
    colorTo: "#6B7280",
    icon: "https://skillicons.dev/icons?i=express",
  },
  {
    name: "PHP",
    left: "18%",
    top: "60%",
    colorFrom: "#4F46E5",
    colorTo: "#818CF8",
    icon: "https://skillicons.dev/icons?i=php",
  },
  {
    name: "Laravel",
    left: "84%",
    top: "38%",
    colorFrom: "#DC2626",
    colorTo: "#F87171",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
  },
  {
    name: "C#",
    left: "46%",
    top: "68%",
    colorFrom: "#7C3AED",
    colorTo: "#A78BFA",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  },
  {
    name: "C++",
    left: "90%",
    top: "78%",
    colorFrom: "#1D4ED8",
    colorTo: "#93C5FD",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
];

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
                  <img src={tech.icon} alt={tech.name} className="w-8 h-8" />

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
