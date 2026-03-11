"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import SmoothScrollProvider from "../Components/SmoothScrollProvider";

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
    x: "5%",
    y: "10%",
    size: 140,
    color: "#61DAFB",
    icon: "https://cdn.simpleicons.org/react/61DAFB",
  },
  {
    name: "MERN",
    x: "calc(100% - 180px)",
    y: "5%",
    size: 160,
    color: "#47A248",
    icon: "https://cdn.simpleicons.org/mongodb/47A248",
  },
  {
    name: "AI / Python",
    x: "calc(50% - 65px)",
    y: "2%",
    size: 130,
    color: "#3776AB",
    icon: "https://cdn.simpleicons.org/python/3776AB",
  },
  {
    name: "Next.js",
    x: "calc(100% - 170px)",
    y: "calc(100% - 170px)",
    size: 150,
    color: "#ffffff",
    icon: "https://cdn.simpleicons.org/nextdotjs/ffffff",
  },
  {
    name: "Three.js",
    x: "2%",
    y: "calc(100% - 130px)",
    size: 120,
    color: "#ffffff",
    icon: "https://cdn.simpleicons.org/threedotjs/ffffff",
  },
  {
    name: "Tailwind",
    x: "25%",
    y: "25%",
    size: 110,
    color: "#06B6D4",
    icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  },
  {
    name: "Node.js",
    x: "calc(45% - 65px)",
    y: "calc(100% - 140px)",
    size: 130,
    color: "#339933",
    icon: "https://cdn.simpleicons.org/nodedotjs/339933",
  },
  {
    name: "AWS",
    x: "calc(100% - 130px)",
    y: "45%",
    size: 110,
    color: "#FF9900",
    icon: "https://img.icons8.com/?size=48&id=33039&format=png",
  },
  {
    name: "Shopify",
    x: "35%",
    y: "50%",
    size: 90,
    color: "#95BF47",
    icon: "https://cdn.simpleicons.org/shopify/95BF47",
  },
  {
    name: "TypeScript",
    x: "calc(60% - 50px)",
    y: "40%",
    size: 100,
    color: "#3178C6",
    icon: "https://cdn.simpleicons.org/typescript/3178C6",
  },
];

export default function ServicesPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const ballsContainerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // We'll use a vertical stacked approach with sticky un-stacking
  // providing a massive canvas for each service

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(
        ".svc-hero-title span",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: "power4.out",
          delay: 0,
        },
      );
      gsap.fromTo(
        ".svc-hero-sub",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.1 },
      );

      // Section animations
      const serviceSections: any[] = gsap.utils.toArray(".svc-section");

      serviceSections.forEach((sec: any, i: number) => {
        const icon = sec.querySelector(".svc-icon") as HTMLElement;
        const title = sec.querySelector(".svc-title") as HTMLElement;
        const num = sec.querySelector(".svc-num") as HTMLElement;
        const descItems = sec.querySelectorAll(
          ".svc-desc-reveal",
        ) as unknown as HTMLElement[];
        const listItems = sec.querySelectorAll(
          ".svc-list-item",
        ) as unknown as HTMLElement[];
        const statWrapper = sec.querySelector(
          ".svc-stat-wrapper",
        ) as HTMLElement;

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
    <div
      className="bg-background text-foreground min-h-screen"
      ref={containerRef}
    >
      <style>{`
        .svc-hero {
          min-height: 50vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0 24px;
          position: relative;
          border-bottom: 1px solid hsl(var(--border) / 0.2);
        }
        
        .svc-hero-title {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(40px, 6vw, 100px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 24px;
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 16px;
          padding-top: 4vh;
        }
        .svc-hero-title span { display: inline-block; }

        .svc-hero-sub {
          font-family: var(--font-body, sans-serif);
          font-size: clamp(16px, 2vw, 20px);
          max-width: 600px;
          color: hsl(var(--muted-foreground));
          line-height: 1.6;
        }

        .svc-section {
          padding: 80px 24px;
          border-bottom: 1px solid hsl(var(--border) / 0.15);
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
          color: hsl(var(--primary));
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
        }

        .svc-icon {
          width: 80px; height: 80px;
          color: hsl(var(--primary));
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
          color: hsl(var(--muted-foreground));
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
          color: hsl(var(--foreground));
          margin-bottom: 24px;
          border-bottom: 1px solid hsl(var(--border) / 0.3);
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
          .svc-list { grid-template-columns: 1fr; }
        }

        .svc-list-item {
          font-family: var(--font-body, sans-serif);
          font-size: 14px;
          color: hsl(var(--muted-foreground));
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .svc-list-item::before {
          content: '';
          display: block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: hsl(var(--primary) / 0.6);
        }

        .svc-stat-wrapper {
          margin-top: 48px;
          padding: 32px;
          background: hsl(var(--primary) / 0.03);
          border: 1px solid hsl(var(--primary) / 0.1);
          border-radius: 16px;
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .svc-stat-num {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(48px, 4vw, 64px);
          font-weight: 700;
          color: hsl(var(--foreground));
          line-height: 1;
          margin-bottom: 8px;
        }

        .svc-stat-label {
          font-family: var(--font-body, sans-serif);
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: hsl(var(--primary));
        }
      `}</style>

      <section className="svc-hero" ref={heroRef}>
        <h1 className="svc-hero-title">
          <span>Our</span>{" "}
          <span className="text-gradient-primary">Expertise</span>
        </h1>
        <p className="svc-hero-sub">
          A definitive look at what we do best. From brand inception to final
          code deployment, we cover the entire digital lifecycle with exact
          precision and artistry.
        </p>
      </section>

      <div className="svc-content-wrap">
        {services.map((svc, index) => (
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
                  {svc.deliverables.map((item: string, i: number) => (
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

      {/* Tech Stack Balls Area */}
      <section className="py-24 px-6 flex flex-col items-center">
        <h2 className="font-display font-semibold pb-2 text-4xl md:text-5xl mb-12 text-center text-gradient-primary">
          Technologies We Breathe
        </h2>
        <div
          ref={ballsContainerRef}
          className="relative w-full max-w-[1400px] h-[650px] border border-border/30 rounded-[40px] overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at center, hsl(var(--primary)/0.03) 0%, transparent 70%)",
          }}
        >
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              drag
              dragConstraints={ballsContainerRef}
              dragElastic={0.4}
              dragTransition={{ bounceStiffness: 400, bounceDamping: 10 }}
              whileHover={{ scale: 1.1, zIndex: 50 }}
              whileDrag={{ scale: 1.15, cursor: "grabbing", zIndex: 100 }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0,
              }}
              className="absolute rounded-full border border-white/5 flex flex-col items-center justify-center p-4 cursor-grab select-none will-change-transform backdrop-blur-md transition-colors duration-500"
              style={
                {
                  left: tech.x,
                  top: tech.y,
                  width: tech.size,
                  height: tech.size,
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  backgroundImage: `linear-gradient(135deg, ${tech.color}20 0%, transparent 80%)`,
                  borderColor: `${tech.color}30`,
                  boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 0 0 1px ${tech.color}20, 0 0 40px -10px ${tech.color}50`,
                } as React.CSSProperties
              }
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="pointer-events-none mb-2"
                style={{
                  width: tech.size * 0.35,
                  height: tech.size * 0.35,
                }}
              />
              <span
                className="font-body font-medium tracking-wide"
                style={{
                  fontSize: Math.max(10, tech.size * 0.1),
                  color: "#ffffff",
                }}
              >
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Call to Action area, kept simple but tying into the aesthetic */}
      <section className="py-32 text-center px-6">
        <h2 className="font-display text-4xl md:text-5xl mb-6">
          Ready to start?
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-10">
          We are currently accepting new projects. Let's discuss how our
          expertise can align with your next big move.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_8px_40px_-8px_hsl(var(--primary)/0.5)] transition-all uppercase tracking-widest text-xs"
        >
          Get in touch
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path
              d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      </section>
    </div>
  );
}
