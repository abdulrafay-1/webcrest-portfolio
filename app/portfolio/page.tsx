"use client";

import { useEffect, useRef } from "react";

const projects = [
  {
    id: "01",
    title: "IusBlock",
    category: "Brand Identity & Web",
    year: "2024",
    tags: ["Design System", "Next.js", "Motion"],
    image: "projects/iusblock.png",
    accent: "hsl(var(--primary))",
    desc: "A complete visual identity for a luxury SaaS brand, from logo system to interactive design language.",
  },
  {
    id: "02",
    title: "Meet Coin",
    category: "A Stable Crypto E-Commerce Token",
    year: "2024",
    tags: ["Cryptocurrency", "Tokens", "Stable"],
    image: "/projects/meetcoin.png",
    accent: "hsl(var(--primary))",
    desc: "An immersive e-commerce platform with real-time 3D product previews and augmented reality try-on.",
  },
  {
    id: "03",
    title: "PagoMeet",
    category: "BlockChain & Crypto Wallet",
    year: "2023",
    tags: ["React Native", "WebGL", "Real-time"],
    image: "/projects/pagomeet.png",
    accent: "hsl(var(--primary))",
    desc: "A data-dense operations platform that turns complex infrastructure metrics into beautiful clarity.",
  },
  {
    id: "04",
    title: "MercadoMeet",
    category: "A detailed website for Mercado Meet Ecommerce Mobile App",
    year: "2023",
    tags: ["Three.js", "GLSL", "Canvas"],
    image: "/projects/mercadomeet.png",
    accent: "hsl(var(--primary))",
    desc: "A generative art installation that reacts to visitor movement, blending code with physical space.",
  },
  // {
  //   id: "05",
  //   title: "Axiom",
  //   category: "Fintech Platform",
  //   year: "2023",
  //   tags: ["Dashboard", "D3.js", "API"],
  //   image:
  //     "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2400&auto=format&fit=crop",
  //   accent: "hsl(var(--primary))",
  //   desc: "Next-generation trading interface with sub-millisecond data visualization and predictive analytics.",
  // },
];

export default function PortfolioSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const cleanups: (() => void)[] = [];

    const init = async () => {
      if (typeof window === "undefined") return;

      if (!(window as any).gsap) {
        await new Promise<void>((res, rej) => {
          const s = document.createElement("script");
          s.src =
            "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
          s.onload = () => res();
          s.onerror = rej;
          document.head.appendChild(s);
        });
      }
      if (!(window as any).ScrollTrigger) {
        await new Promise<void>((res, rej) => {
          const s = document.createElement("script");
          s.src =
            "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
          s.onload = () => res();
          s.onerror = rej;
          document.head.appendChild(s);
        });
      }

      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // ── Easing helpers ────────────────────────────────────────────────
      const easeExpoOut = (t: number) =>
        t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
      const easeExpoIn = (t: number) => (t <= 0 ? 0 : Math.pow(2, 10 * t - 10));
      const easePow4Out = (t: number) => 1 - Math.pow(1 - t, 4);
      const clamp = (v: number, a: number, b: number) =>
        Math.max(a, Math.min(b, v));

      // ── Heading: word-slot reveal ─────────────────────────────────────
      const words = titleRef.current
        ? (titleRef.current as HTMLElement).querySelectorAll(".pw-word")
        : [];
      const eyebrow = titleRef.current
        ? (titleRef.current as HTMLElement).querySelector(".pw-eyebrow")
        : null;
      const introRight = titleRef.current
        ? (titleRef.current as HTMLElement).querySelector(".pw-intro-right")
        : null;
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

      const titleEl = titleRef.current as HTMLElement | null;
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

      // ── Cards: strip curtain reveal ───────────────────────────────────
      const STRIP_COUNT = 4;

      const cards = (
        sectionRef.current as HTMLElement | null
      )?.querySelectorAll(".pw-card");

      cards?.forEach((card) => {
        const img = card.querySelector(".pw-card-img") as HTMLElement | null;
        const content = card.querySelector(
          ".pw-card-content",
        ) as HTMLElement | null;
        const ghostNum = card.querySelector(
          ".pw-ghost-num",
        ) as HTMLElement | null;
        const accentLine = card.querySelector(
          ".pw-accent-line",
        ) as HTMLElement | null;
        const strips = card.querySelectorAll(".pw-strip");

        // Init strip clip-paths: fully covering (bottom 0% means strip is visible from top)
        strips.forEach((strip) => {
          gsap.set(strip, { clipPath: "inset(0% 0 0% 0)" });
        });
        if (content) gsap.set(content, { opacity: 0, y: 38 });
        if (ghostNum) gsap.set(ghostNum, { opacity: 0, y: 20 });
        if (accentLine)
          gsap.set(accentLine, { scaleY: 0, transformOrigin: "top center" });

        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          end: "+=190%",
          pin: true,
          scrub: 1.4,
          anticipatePin: 1,
          onUpdate: (self: { progress: number }) => {
            const p = self.progress;

            // ── Image parallax ──
            if (img) {
              gsap.set(img, {
                y: -p * 55,
                scale: 1 + p * 0.06,
              });
            }

            // ── Ghost number ──
            if (ghostNum) {
              const gnEnter = clamp((p - 0.05) / 0.45, 0, 1);
              const gnExit = clamp((p - 0.68) / 0.32, 0, 1);
              gsap.set(ghostNum, {
                opacity:
                  easeExpoOut(gnEnter) * 0.055 * (1 - easeExpoOut(gnExit)),
                y: -p * 35,
              });
            }

            // ── Vertical strips: curtain open/close ──
            //   OPEN  : strips start VISIBLE (covering image), lift away bottom-up
            //           → clipBottom: 0→100  (bottom edge rises, image revealed)
            //   CLOSE : strips fall back from top to re-cover the image
            //           → clipBottom: 100→0  (top appears first, extends downward)
            //   Both use only the bottom inset axis to avoid overlap artifacts.
            strips.forEach((strip, si) => {
              const staggerStep = 0.1;

              const openDelay = si * staggerStep;
              const openRaw = clamp((p - openDelay) / 0.36, 0, 1);

              const clipBottom = easeExpoOut(openRaw) * 100;

              gsap.set(strip, {
                clipPath: `inset(0% 0 ${clipBottom}% 0)`,
              });
            });
            // ── Content fade ──
            if (content) {
              const cEnter = clamp((p - 0.18) / 0.38, 0, 1);
              const cExit = clamp((p - 0.68) / 0.32, 0, 1);
              const opacity = Math.max(
                0,
                easePow4Out(cEnter) - easeExpoIn(cExit),
              );
              const y = (1 - easePow4Out(cEnter)) * 38 - easeExpoIn(cExit) * 42;
              gsap.set(content, { opacity, y });
            }

            // ── Accent line grows during entry ──
            if (accentLine) {
              const alP = clamp((p - 0.18) / 0.45, 0, 1);
              const alOut = clamp((p - 0.68) / 0.32, 0, 1);
              gsap.set(accentLine, {
                scaleY: easeExpoOut(alP) * (1 - easeExpoIn(alOut)),
                opacity: easeExpoOut(alP) * (1 - easeExpoIn(alOut)),
              });
            }
          },
        });
      });

      // ── Magnetic cursor ───────────────────────────────────────────────
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

          const onEnter = () =>
            gsap.to(cursor, {
              scale: 1,
              opacity: 1,
              duration: 0.35,
              ease: "back.out(2)",
            });
          const onLeave = () =>
            gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.25 });

          (sectionRef.current as HTMLElement | null)
            ?.querySelectorAll(".pw-card")
            .forEach((card) => {
              card.addEventListener("mouseenter", onEnter);
              card.addEventListener("mouseleave", onLeave);
              cleanups.push(() => {
                card.removeEventListener("mouseenter", onEnter);
                card.removeEventListener("mouseleave", onLeave);
              });
            });

          cleanups.push(() => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(raf);
          });
        }
      }

      cleanups.push(() =>
        ScrollTrigger.getAll().forEach((t: { kill: () => void }) => t.kill()),
      );
    };

    init();
    return () => cleanups.forEach((fn) => fn());
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
        /* ── Cursor ─────────────────────────────────────────────── */
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

        /* ── Section ────────────────────────────────────────────── */
        .pw-section { background: hsl(var(--background)); color: hsl(var(--foreground)); }

        /* ── Intro ──────────────────────────────────────────────── */
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

        /* Word-slot heading */
        .pw-intro-heading {
          font-size: clamp(54px, 7.2vw, 108px); font-weight: 600;
          line-height: 0.9; letter-spacing: -0.035em;
          color: hsl(var(--foreground));
        }
        .pw-word-outer {
          display: inline-block; overflow: hidden;
          vertical-align: bottom; /* keeps baseline aligned */
          padding-bottom: 0.08em; /* prevent descender clip */
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

        /* ── Scroll hint ────────────────────────────────────────── */
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

        /* ── Cards ──────────────────────────────────────────────── */
        .pw-cards { position: relative; }
        .pw-card {
          position: relative; width: 100%; height: 100vh;
          overflow: hidden; background: hsl(var(--background));
        }

        /* Image */
        .pw-card-bg { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
        .pw-card-img {
          width: 100%; height: 110%; object-fit: cover; object-position: center;
          display: block; transform-origin: center top; will-change: transform;
        }

        /* Gradients */
        .pw-card-grad {
          position: absolute; inset: 0; z-index: 1;
          background:
            linear-gradient(to right, hsl(var(--background) / 0.84) 0%, hsl(var(--background) / 0.12) 55%, transparent 100%),
            linear-gradient(to top, hsl(var(--background) / 0.72) 0%, transparent 50%);
        }

        /* ── Vertical strips (curtain) ──────────────────────────── */
        .pw-strips {
          position: absolute; inset: 0; z-index: 8;
          display: flex; pointer-events: none;
        }
        .pw-strip {
          flex: 1; height: 100%;
          background: hsl(var(--background));
          will-change: clip-path;
        }

        /* Ghost number */
        .pw-ghost-num {
          position: absolute;
          right: -0.04em; bottom: -0.08em;
          z-index: 2;
          font-size: clamp(200px, 28vw, 400px); font-weight: 700;
          line-height: 1; letter-spacing: -0.06em;
          color: transparent;
          -webkit-text-stroke: 1px hsl(var(--foreground) / 0.5);
          user-select: none; pointer-events: none;
          will-change: transform, opacity;
        }

        /* Accent line (left edge of content) */
        .pw-accent-line {
          position: absolute; left: 64px; bottom: 72px;
          width: 2px; height: 200px;
          background: linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--primary) / 0));
          z-index: 6; transform-origin: top center;
          will-change: transform, opacity;
        }

        /* Content */
        .pw-card-content {
          position: absolute; inset: 0; z-index: 5;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 0 80px 80px 88px;
          max-width: 800px;
          will-change: transform, opacity;
        }
        .pw-card-num {
          font-size: 10px; letter-spacing: 0.42em; text-transform: uppercase;
          color: hsl(var(--muted-foreground) / 0.5); margin-bottom: 20px;
        }
        .pw-card-cat {
          font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase;
          color: hsl(var(--muted-foreground)); margin-bottom: 12px;
          display: flex; align-items: center; gap: 14px;
        }
        .pw-card-cat-line {
          display: inline-block; height: 1px; width: 28px;
          background: hsl(var(--primary)); flex-shrink: 0;
        }
        .pw-card-title {
          font-size: clamp(46px, 6vw, 88px); font-weight: 600;
          line-height: 0.92; letter-spacing: -0.03em;
          color: hsl(var(--foreground)); margin-bottom: 20px;
        }
        .pw-card-desc {
          font-size: 14px; line-height: 1.7;
          color: hsl(var(--muted-foreground)); max-width: 440px;
          margin-bottom: 28px; font-weight: 300;
        }
        .pw-card-tags { display: flex; gap: 7px; flex-wrap: wrap; }
        .pw-card-tag {
          font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
          padding: 5px 14px; border-radius: 100px;
          color: hsl(var(--foreground) / 0.65);
          border: 1px solid hsl(var(--border) / 0.55);
          backdrop-filter: blur(4px);
        }

        /* Year badge */
        .pw-card-year {
          position: absolute; top: 38px; right: 52px; z-index: 5;
          font-size: 10px; letter-spacing: 0.42em; text-transform: uppercase;
          color: hsl(var(--muted-foreground) / 0.32);
        }

        /* ── Progress indicator (vertical segments) ────────────── */
        .pw-progress {
          position: absolute; top: 50%; right: 44px;
          transform: translateY(-50%);
          z-index: 6; display: flex; flex-direction: column;
          gap: 5px; align-items: center;
        }
        .pw-prog-seg {
          width: 1px; height: 22px;
          background: hsl(var(--muted-foreground) / 0.18);
          position: relative; overflow: hidden;
          border-radius: 1px;
        }
        .pw-prog-seg::after {
          content: '';
          position: absolute; inset: 0;
          background: hsl(var(--primary));
          transform: scaleY(0); transform-origin: top;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pw-prog-seg.active::after { transform: scaleY(1); }

        /* ── Footer ─────────────────────────────────────────────── */
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

        /* ── Responsive ─────────────────────────────────────────── */
        @media (max-width: 768px) {
          .pw-intro { padding: 80px 24px 50px; flex-direction: column; align-items: flex-start; }
          .pw-intro-right { text-align: left; }
          .pw-scroll-hint { padding: 0 24px 36px; }
          .pw-card-content { padding: 0 28px 52px 34px; }
          .pw-accent-line { left: 24px; bottom: 52px; height: 140px; }
          .pw-card-year, .pw-progress { right: 18px; }
          .pw-footer { padding: 60px 24px 80px; flex-direction: column; align-items: flex-start; }
        }
        @media (hover: none), (pointer: coarse) {
          .pw-cursor { display: none !important; }
        }
      `}</style>

      {/* Custom cursor */}
      <div className="pw-cursor">
        <span className="pw-cursor-text">View</span>
      </div>

      <section id="work" className="pw-section" ref={sectionRef}>
        {/* ── Intro header ────────────────────────────────────────── */}
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
            <span className="pw-total">05</span>
            <p className="pw-intro-sub">Projects</p>
          </div>
        </div>

        {/* ── Scroll hint ─────────────────────────────────────────── */}
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

        {/* ── Project cards ───────────────────────────────────────── */}
        <div className="pw-cards">
          {projects.map((p, i) => (
            <div key={p.id} className="pw-card">
              {/* Background image */}
              <div className="pw-card-bg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.title} className="pw-card-img" />
              </div>

              {/* Gradient veil */}
              <div className="pw-card-grad" />

              {/* Ghost number */}
              <div className="pw-ghost-num">{p.id}</div>

              {/* Vertical strip curtain */}
              <div className="pw-strips">
                {Array.from({ length: 4 }).map((_, si) => (
                  <div key={si} className="pw-strip" />
                ))}
              </div>

              {/* Year badge */}
              <span className="pw-card-year">{p.year}</span>

              {/* Progress segments */}
              <div className="pw-progress">
                {projects.map((_, di) => (
                  <div
                    key={di}
                    className={`pw-prog-seg${di === i ? " active" : ""}`}
                  />
                ))}
              </div>

              {/* Left accent line */}
              <div className="pw-accent-line" />

              {/* Content */}
              <div className="pw-card-content">
                <span className="pw-card-num">
                  {p.id} / 0{projects.length}
                </span>
                <div className="pw-card-cat">
                  <span className="pw-card-cat-line" />
                  {p.category}
                </div>
                <h3 className="pw-card-title">{p.title}</h3>
                <p className="pw-card-desc">{p.desc}</p>
                <div className="pw-card-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="pw-card-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer CTA ──────────────────────────────────────────── */}
        <div className="pw-footer">
          <div>
            <p className="pw-footer-label">Ready to build something?</p>
            <p className="pw-footer-heading">Start a Project</p>
          </div>
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
        </div>
      </section>
    </>
  );
}
