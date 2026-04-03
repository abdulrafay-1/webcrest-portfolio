"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const projects = [
  {
    id: "01",
    title: "IusBlock",
    category: "Brand Identity & Web",
    tab: "Branding",
    year: "2024",
    tags: ["React.js", "Design System", "Motion"],
    image: "projects/iusblock.png",
    href: "https://iusblock.com",
    accent: "hsl(var(--primary))",
    desc: "A premium SaaS brand system built with a scalable design language, motion-driven UI, and a high-performance React frontend, ensuring consistency across digital touchpoints.",
  },
  {
    id: "02",
    title: "Meet Coin",
    category: "A Stable Crypto E-Commerce Token",
    tab: "Crypto",
    year: "2024",
    tags: ["Next.js", "Cryptocurrency", "Web3"],
    image: "/projects/meetcoin.png",
    href: "https://meetcoin.io",
    accent: "hsl(var(--primary))",
    desc: "A blockchain-powered ecosystem token designed for marketplace transactions, enabling seamless crypto payments, low-fee transfers, and integration with a scalable Web3 infrastructure.",
  },
  {
    id: "03",
    title: "PagoMeet",
    category: "BlockChain & Crypto Wallet",
    tab: "Blockchain",
    year: "2023",
    tags: ["React Native", "Blockchain", "Crypto Wallet"],
    image: "/projects/pagomeet.png",
    href: "https://pagomeet.com",
    accent: "hsl(var(--primary))",
    desc: "A multi-chain crypto wallet with secure key management, ERC-4337 account abstraction, gasless transactions, and real-time balance tracking, built with React Native and Node.js backend.",
  },
  {
    id: "04",
    title: "MercadoMeet",
    category: "A detailed website for Mercado Meet Ecommerce Mobile App",
    tab: "E-Commerce",
    year: "2023",
    tags: ["React Native", "E-Commerce", "Mobile App"],
    image: "/projects/mercadomeet.png",
    href: "https://mercadomeet.com",
    accent: "hsl(var(--primary))",
    desc: "A full-scale marketplace ecosystem combining mobile commerce, real-time order workflows, WhatsApp automation, and integrated crypto payments, powering a scalable multi-vendor platform.",
  },
];

const whatsappNumber = "+923442667537";
const whatsappMessage =
  "Hi Webcrest, I want to discuss my project. Please share the next available slot.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState("All");
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);

  const allTabs = ["All", ...projects.map((p) => p.tab)];
  const visibleProjects =
    activeTab === "All"
      ? projects
      : projects.filter((p) => p.tab === activeTab);

  useEffect(() => {
    const cleanups: Array<() => void> = [];

    const init = async () => {
      if (typeof window === "undefined") return;

      gsap.registerPlugin(ScrollTrigger);

      const easeExpoOut = (t: number) =>
        t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
      const easeExpoIn = (t: number) => (t <= 0 ? 0 : Math.pow(2, 10 * t - 10));
      const easePow4Out = (t: number) => 1 - Math.pow(1 - t, 4);
      const clamp = (v: number, a: number, b: number) =>
        Math.max(a, Math.min(b, v));

      const words = titleRef.current?.querySelectorAll(".pw-word") || [];
      const eyebrow = titleRef.current?.querySelector(".pw-eyebrow") || null;
      const introRight =
        titleRef.current?.querySelector(".pw-intro-right") || null;
      const scrollHint = document.querySelector(".pw-scroll-hint");

      if (words.length) {
        gsap.set(words, { yPercent: 115, skewX: 10, opacity: 0 });
      }
      if (eyebrow) gsap.set(eyebrow, { opacity: 0, x: -20 });
      if (introRight) gsap.set(introRight, { opacity: 0, y: 20 });
      if (scrollHint) gsap.set(scrollHint, { opacity: 0, y: 12 });

      const playIntro = () => {
        if (eyebrow) {
          gsap.to(eyebrow, {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
          });
        }

        if (words.length) {
          gsap.to(words, {
            yPercent: 0,
            skewX: 0,
            opacity: 1,
            stagger: 0.09,
            duration: 1.0,
            ease: "power4.out",
            delay: 0.12,
          });
        }

        if (introRight) {
          gsap.to(introRight, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.4,
          });
        }

        if (scrollHint) {
          gsap.to(scrollHint, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.7,
          });
        }
      };

      const titleEl = titleRef.current;
      const rect = titleEl?.getBoundingClientRect();
      const inView = rect ? rect.top < window.innerHeight : true;

      if (inView) {
        requestAnimationFrame(playIntro);
      } else {
        ScrollTrigger.create({
          trigger: titleEl,
          start: "top 88%",
          once: true,
          onEnter: playIntro,
        });
      }

      const cards = sectionRef.current?.querySelectorAll(".pw-proj-card");
      const cardEls = Array.from(cards || []);

      // Stagger cards in on load
      if (cardEls.length) {
        gsap.fromTo(
          cardEls,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.3,
          },
        );
      }

      const canHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;

      if (canHover) {
        const cursor = document.querySelector(
          ".pw-cursor",
        ) as HTMLElement | null;

        if (cursor) {
          let mx = 0,
            my = 0,
            cx = 0,
            cy = 0,
            raf = 0;

          const onMove = (e: MouseEvent) => {
            mx = e.clientX;
            my = e.clientY;
          };

          window.addEventListener("mousemove", onMove);

          const tick = () => {
            cx += (mx - cx) * 0.1;
            cy += (my - cy) * 0.1;
            gsap.set(cursor, { x: cx, y: cy });
            raf = requestAnimationFrame(tick);
          };

          tick();

          sectionRef.current?.querySelectorAll(".pw-card").forEach((card) => {
            const cardEl = card as HTMLElement;
            const href = cardEl.dataset.href || "";

            const onEnter = () =>
              gsap.to(cursor, {
                scale: 1,
                opacity: 1,
                duration: 0.35,
                ease: "back.out(2)",
              });

            const onLeave = () =>
              gsap.to(cursor, {
                scale: 0,
                opacity: 0,
                duration: 0.25,
              });

            const onClick = () => {
              if (!href) return;

              gsap.to(cursor, {
                scale: 0.86,
                duration: 0.12,
                ease: "power2.out",
                onComplete: () => {
                  gsap.to(cursor, {
                    scale: 1,
                    duration: 0.28,
                    ease: "back.out(1.8)",
                  });
                },
              });

              window.open(href, "_blank", "noopener,noreferrer");
            };

            card.addEventListener("mouseenter", onEnter);
            card.addEventListener("mouseleave", onLeave);
            card.addEventListener("click", onClick);

            cleanups.push(() => {
              card.removeEventListener("mouseenter", onEnter);
              card.removeEventListener("mouseleave", onLeave);
              card.removeEventListener("click", onClick);
            });
          });

          cleanups.push(() => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(raf);
          });
        }
      }
    };

    const ctx = gsap.context(() => {
      init();
    }, sectionRef);

    return () => {
      cleanups.forEach((fn) => fn());
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  const splitWords = (text: string) =>
    text.split(" ").map((word, i) => (
      <span key={i} className="pw-word-outer">
        <span className="pw-word">{word}</span>
      </span>
    ));

  return (
    <>
      <style>{`
        .pw-cursor {
          position: fixed; top: 0; left: 0;
          width: 76px; height: 76px; border-radius: 50%;
          background: hsl(var(--primary) / 0.07);
          border: 1px solid hsl(var(--primary) / 0.3);
          display: flex; align-items: center; justify-content: center;
          pointer-events: none; z-index: 9999;
          transform: translate(-50%, -50%) scale(0); opacity: 0;
          backdrop-filter: blur(6px);
          transition: background 0.3s;
        }
        .pw-cursor-text {
          font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
          color: hsl(var(--foreground) / 0.75);
        }

        .pw-section { background: hsl(var(--background)); color: hsl(var(--foreground)); }

        .pw-intro {
          padding: 130px 64px 60px; max-width: 1440px; margin: 0 auto;
          display: flex; align-items: flex-end; justify-content: space-between; gap: 40px;
        }
        .pw-intro-left { max-width: 700px; }
        .pw-eyebrow {
          display: flex; align-items: center; gap: 10px;
          font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase;
          color: hsl(var(--muted-foreground));
          border: 1px solid hsl(var(--border) / 0.5);
          border-radius: 100px; padding: 6px 16px; width: fit-content; margin-bottom: 24px;
        }
        .pw-eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: hsl(var(--primary)); flex-shrink: 0;
          animation: pw-pulse 2.4s ease-in-out infinite;
        }
        @keyframes pw-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.75); }
        }

        .pw-intro-heading {
          font-size: clamp(54px, 7.2vw, 108px); font-weight: 600;
          line-height: 0.9; letter-spacing: -0.035em;
          color: hsl(var(--foreground));
        }
        .pw-word-outer {
          display: inline-block; overflow: hidden;
          vertical-align: bottom;
          padding-bottom: 0.08em;
        }
        .pw-word {
          display: inline-block; will-change: transform, opacity;
          padding-right: 0.28em;
        }

        .pw-intro-right { text-align: right; flex-shrink: 0; padding-bottom: 10px; }
        .pw-total {
          font-size: clamp(40px, 4vw, 66px); color: transparent;
          -webkit-text-stroke: 1px hsl(var(--border)); display: block;
          line-height: 1; font-weight: 600; letter-spacing: -0.03em;
        }
        .pw-intro-sub {
          font-size: 11px; color: hsl(var(--muted-foreground));
          letter-spacing: 0.08em; margin-top: 6px; text-transform: uppercase;
        }

        .pw-scroll-hint {
          padding: 0 64px 56px; display: flex; align-items: center; gap: 14px;
          max-width: 1440px; margin: 0 auto;
        }
        .pw-scroll-hint-line { width: 44px; height: 1px; background: hsl(var(--border)); }
        .pw-scroll-hint-text {
          font-size: 9px; letter-spacing: 0.42em; text-transform: uppercase;
          color: hsl(var(--muted-foreground) / 0.45);
        }
        .pw-scroll-hint-arrow { animation: pw-bob 2.2s ease-in-out infinite; }
        @keyframes pw-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        /* ── TEMPORARILY COMMENTED OUT: old GSAP pin card CSS ──────────────────────────
        .pw-cards { position: relative; }
        .pw-card { position: relative; width: 100%; height: 100vh; overflow: hidden;
          background: hsl(var(--background)); cursor: pointer; }
        .pw-card-bg { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
        .pw-card-img { width: 100%; height: 110%; object-fit: cover; object-position: center;
          display: block; transform-origin: center top; will-change: transform; }
        .pw-card-grad { position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to right, hsl(var(--background)/0.84) 0%,
            hsl(var(--background)/0.12) 55%, transparent 100%),
            linear-gradient(to top, hsl(var(--background)/0.72) 0%, transparent 50%); }
        .pw-strips { position: absolute; inset: 0; z-index: 8; display: flex;
          pointer-events: none; overflow: hidden; }
        .pw-strip { flex: 1 1 0; height: 100%; background: hsl(var(--background));
          will-change: clip-path, transform; position: relative; }
        .pw-strip + .pw-strip { margin-left: -1px; }
        .pw-ghost-num { position: absolute; right: -0.04em; bottom: -0.08em; z-index: 2;
          font-size: clamp(200px, 28vw, 400px); font-weight: 700; line-height: 1;
          letter-spacing: -0.06em; color: transparent;
          -webkit-text-stroke: 1px hsl(var(--foreground)/0.5);
          user-select: none; pointer-events: none; will-change: transform, opacity; }
        .pw-accent-line { position: absolute; left: 64px; bottom: 72px; width: 2px;
          height: 200px; background: linear-gradient(to bottom, hsl(var(--primary)),
          hsl(var(--primary)/0)); z-index: 6; transform-origin: top center;
          will-change: transform, opacity; }
        .pw-card-content { position: absolute; inset: 0; z-index: 5; display: flex;
          flex-direction: column; justify-content: flex-end; padding: 0 80px 80px 88px;
          max-width: 800px; will-change: transform, opacity; }
        .pw-progress { position: absolute; top: 50%; right: 44px; transform: translateY(-50%);
          z-index: 6; display: flex; flex-direction: column; gap: 5px; align-items: center; }
        .pw-prog-seg { width: 1px; height: 22px; background: hsl(var(--muted-foreground)/0.18);
          position: relative; overflow: hidden; border-radius: 1px; }
        .pw-prog-seg::after { content: ''; position: absolute; inset: 0;
          background: hsl(var(--primary)); transform: scaleY(0); transform-origin: top;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .pw-prog-seg.active::after { transform: scaleY(1); }
        ── END TEMPORARILY COMMENTED OUT ── */

        /* ── Showcase: thumb strip + stage ── */
        .pw-filter-bar {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .pw-filter-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .pw-filter-tab {
          font-size: 12px;
          font-family: inherit;
          letter-spacing: 0.04em;
          padding: 8px 20px;
          border-radius: 100px;
          border: 1px solid hsl(var(--border) / 0.4);
          background: transparent;
          color: hsl(var(--muted-foreground));
          cursor: pointer;
          transition: background 0.25s, color 0.25s, border-color 0.25s;
          white-space: nowrap;
        }
        .pw-filter-tab:hover {
          background: hsl(var(--foreground) / 0.06);
          color: hsl(var(--foreground));
          border-color: hsl(var(--border) / 0.65);
        }
        .pw-filter-tab.active {
          background: hsl(var(--foreground));
          color: hsl(var(--background));
          border-color: hsl(var(--foreground));
        }

        /* ── Grid ── */
        .pw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px 80px;
        }

        /* ── Project card ── */
        .pw-proj-card {
          display: flex;
          flex-direction: column;
          background: hsl(var(--foreground) / 0.03);
          border: 1px solid hsl(var(--border) / 0.35);
          border-radius: 14px;
          padding: 24px;
          transition: border-color 0.3s, background 0.3s, transform 0.3s;
          cursor: default;
          gap: 14px;
        }
        .pw-proj-card:hover {
          border-color: hsl(var(--border) / 0.7);
          background: hsl(var(--foreground) / 0.05);
          transform: translateY(-3px);
        }
        .pw-proj-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .pw-proj-year {
          font-size: 11px;
          color: hsl(var(--muted-foreground) / 0.5);
          letter-spacing: 0.04em;
        }
        .pw-proj-badge {
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 4px 11px;
          border-radius: 100px;
          border: 1px solid hsl(var(--border) / 0.5);
          color: hsl(var(--muted-foreground));
          background: hsl(var(--foreground) / 0.04);
        }
        .pw-proj-title {
          font-size: clamp(18px, 1.8vw, 24px);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: hsl(var(--foreground));
          line-height: 1.15;
          margin: 0;
        }
        .pw-proj-desc {
          font-size: 13px;
          line-height: 1.7;
          color: hsl(var(--muted-foreground));
          font-weight: 300;
          margin: 0;
          flex: 1;
        }
        .pw-proj-image-wrap {
          width: 100%;
          height: 170px;
          border-radius: 9px;
          overflow: hidden;
          background: hsl(var(--foreground) / 0.06);
        }
        .pw-proj-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pw-proj-card:hover .pw-proj-img { transform: scale(1.05); }
        .pw-proj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .pw-proj-tag {
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 4px 11px;
          border-radius: 100px;
          border: 1px solid hsl(var(--border) / 0.4);
          color: hsl(var(--foreground) / 0.55);
        }
        .pw-proj-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid hsl(var(--border) / 0.25);
          margin-top: auto;
        }
        .pw-proj-ext {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px; height: 34px;
          border-radius: 9px;
          border: 1px solid hsl(var(--border) / 0.4);
          color: hsl(var(--muted-foreground));
          text-decoration: none;
          transition: border-color 0.25s, color 0.25s, background 0.25s;
        }
        .pw-proj-ext:hover {
          border-color: hsl(var(--primary) / 0.5);
          color: hsl(var(--primary));
          background: hsl(var(--primary) / 0.06);
        }
        .pw-proj-details {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: hsl(var(--foreground) / 0.65);
          text-decoration: none;
          transition: color 0.25s, gap 0.25s;
        }
        .pw-proj-details:hover { color: hsl(var(--foreground)); gap: 10px; }

        @media (max-width: 1024px) {
          .pw-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .pw-grid { grid-template-columns: 1fr; padding: 0 20px 60px; }
          .pw-filter-bar { padding: 0 20px 28px; }
        }

        .pw-footer {
          background: hsl(var(--background));
          padding: 100px 64px 120px;
          display: flex; align-items: center; justify-content: space-between;
          max-width: 1440px; margin: 0 auto; gap: 40px;
          border-top: 1px solid hsl(var(--border) / 0.4);
        }
        .pw-footer-label {
          font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase;
          color: hsl(var(--muted-foreground) / 0.45); margin-bottom: 10px;
        }
        .pw-footer-heading {
          font-size: clamp(38px, 4.8vw, 72px); font-weight: 600;
          letter-spacing: -0.03em; color: hsl(var(--foreground)); line-height: 1;
        }
        .pw-footer-btn {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 32px; border-radius: 100px;
          border: 1px solid hsl(var(--border) / 0.6);
          background: transparent; color: hsl(var(--foreground));
          font-size: 12px; font-weight: 500; letter-spacing: 0.16em;
          text-transform: uppercase; cursor: pointer;
          position: relative; overflow: hidden;
          transition: border-color 0.35s, box-shadow 0.5s;
          white-space: nowrap; flex-shrink: 0;
        }
        .pw-footer-btn::before {
          content: ''; position: absolute; inset: 0;
          background: hsl(var(--primary) / 0.08); opacity: 0;
          transition: opacity 0.35s;
        }
        .pw-footer-btn:hover::before { opacity: 1; }
        .pw-footer-btn:hover {
          border-color: hsl(var(--primary) / 0.4);
          box-shadow: 0 8px 40px -8px hsl(var(--primary) / 0.3);
        }
        .pw-footer-btn span, .pw-footer-ico { position: relative; z-index: 1; }
        .pw-footer-ico { width: 16px; height: 16px; transition: transform 0.3s; }
        .pw-footer-btn:hover .pw-footer-ico { transform: translateX(4px); }

        @media (max-width: 768px) {
          .pw-intro { padding: 80px 24px 50px; flex-direction: column; align-items: flex-start; }
          .pw-intro-right { text-align: left; }
          .pw-scroll-hint { padding: 0 24px 36px; }
          .pw-footer { padding: 60px 24px 80px; flex-direction: column; align-items: flex-start; }
        }
        @media (hover: none), (pointer: coarse) {
          .pw-cursor { display: none !important; }
        }

      `}</style>

      <div className="pw-cursor">
        <span className="pw-cursor-text">Visit ↗</span>
      </div>

      <section id="work" className="pw-section" ref={sectionRef}>
        <div className="pw-intro" ref={titleRef}>
          <div className="pw-intro-left">
            <div className="pw-eyebrow">
              <span className="pw-eyebrow-dot" />
              Selected Work
            </div>
            <div className="pw-intro-heading">
              {splitWords("Our")}
              <span className="pw-word-outer">
                <span className="pw-word text-gradient-primary">Portfolio</span>
              </span>
            </div>
          </div>

          <div className="pw-intro-right">
            <span className="pw-total">
              {String(projects.length).padStart(2, "0")}
            </span>
            <p className="pw-intro-sub">Projects</p>
          </div>
        </div>

        <div className="pw-scroll-hint">
          <span className="pw-scroll-hint-line" />
          <span className="pw-scroll-hint-text">Scroll to explore</span>
          <svg
            className="pw-scroll-hint-arrow"
            width="12"
            height="14"
            viewBox="0 0 12 14"
            fill="none"
          >
            <path
              d="M6 1v10M1 8l5 5 5-5"
              stroke="hsl(var(--muted-foreground) / 0.4)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Filter tabs + grid */}
        <div className="pw-filter-bar">
          <div className="pw-filter-tabs" ref={tabsRef}>
            {allTabs.map((tab) => (
              <button
                key={tab}
                className={`pw-filter-tab${activeTab === tab ? " active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="pw-grid">
          {visibleProjects.map((p) => (
            <div key={p.id} className="pw-proj-card">
              <div className="pw-proj-top">
                <span className="pw-proj-year">{p.year}</span>
                <span className="pw-proj-badge">{p.tab}</span>
              </div>
              <h3 className="pw-proj-title">{p.title}</h3>
              <p className="pw-proj-desc">{p.desc}</p>
              <div className="pw-proj-image-wrap">
                <img src={p.image} alt={p.title} className="pw-proj-img" />
              </div>
              <div className="pw-proj-tags">
                {p.tags.map((t) => (
                  <span key={t} className="pw-proj-tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="pw-proj-footer">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pw-proj-ext"
                  aria-label="Open project"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pw-proj-details"
                >
                  View Details
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7v10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="pw-footer">
          <div>
            <p className="pw-footer-label">Ready to build something?</p>
            <p className="pw-footer-heading">Start a Project</p>
          </div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <button className="pw-footer-btn">
              <span>Get in Touch</span>
              <svg
                className="pw-footer-ico"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </a>
        </div>
      </section>
    </>
  );
}
