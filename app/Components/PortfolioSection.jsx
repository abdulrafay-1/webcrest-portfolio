"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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
    const cleanups = [];

    const init = async () => {
      if (typeof window === "undefined") return;

      gsap.registerPlugin(ScrollTrigger);

      // ── Heading reveal ───────────────────────────────────────────
      const line1Chars =
        titleRef.current?.querySelectorAll(".pw-line1 .pw-char");
      const line2El = titleRef.current?.querySelector(".pw-line2");
      const rect = titleRef.current?.getBoundingClientRect();
      const inView = rect ? rect.top < window.innerHeight : true;

      const animateHeading = () => {
        if (line1Chars?.length) {
          gsap.fromTo(
            line1Chars,
            { y: 70, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.04,
              duration: 0.85,
              ease: "power3.out",
            },
          );
        }
        if (line2El) {
          gsap.fromTo(
            line2El,
            { y: 60, clipPath: "inset(0 0 100% 0)" },
            {
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 1.1,
              ease: "power4.out",
              delay: 0.18,
            },
          );
        }
      };

      if (inView) {
        requestAnimationFrame(animateHeading);
      } else {
        ScrollTrigger.create({
          trigger: titleRef.current,
          start: "top 90%",
          once: true,
          onEnter: animateHeading,
        });
      }

      // ── Per-card: pin + zoom + bidirectional tile shatter ───────
      const cards = sectionRef.current?.querySelectorAll(".pw-card");

      cards?.forEach((card) => {
        const img = card.querySelector(".pw-card-img");
        const content = card.querySelector(".pw-card-content");
        const num = card.querySelector(".pw-card-num");
        const tileGrid = card.querySelector(".pw-tile-grid");
        const tiles = card.querySelectorAll(".pw-tile");
        const chromaR = card.querySelector(".pw-chroma-r");
        const chromaB = card.querySelector(".pw-chroma-b");

        // Track animation state: null | "closed" | "open"
        let shatterState = null; // null = never run

        const COLS = 8,
          ROWS = 5;
        const tileData = Array.from(tiles).map((tile, ti) => {
          const col = ti % COLS;
          const row = Math.floor(ti / COLS);
          const fromLeft = col < COLS / 2;
          const fromTop = row < ROWS / 2;
          return {
            tile,
            x: (fromLeft ? -1 : 1) * (100 + Math.random() * 160) * 3,
            y: (fromTop ? -1 : 1) * (80 + Math.random() * 120) * 3,
            skewX: fromLeft ? -12 : 12,
            skewY: fromTop ? -6 : 6,
            delay:
              (Math.abs(col - 3.5) + Math.abs(row - 2)) * 0.018 +
              Math.random() * 0.04,
          };
        });

        // ── FORWARD: tiles fly IN from edges (card closes) ──────
        const fireShatterClose = () => {
          if (shatterState === "closed") return;
          shatterState = "closed";

          gsap.killTweensOf([...tiles, chromaR, chromaB]);
          gsap.set(tileGrid, { visibility: "visible" });

          tileData.forEach(({ tile, x, y, skewX, skewY, delay }) => {
            gsap.fromTo(
              tile,
              { x, y, opacity: 0, skewX, skewY },
              {
                x: 0,
                y: 0,
                opacity: 1,
                skewX: 0,
                skewY: 0,
                ease: "expo.out",
                duration: 0.7,
                delay,
              },
            );
          });

          if (chromaR) {
            gsap.set(chromaR, { visibility: "visible" });
            gsap.fromTo(
              chromaR,
              { opacity: 0, x: -16, scaleX: 1.06 },
              {
                opacity: 0.5,
                x: 0,
                scaleX: 1,
                ease: "expo.out",
                duration: 0.2,
              },
            );
            gsap.to(chromaR, { opacity: 0, duration: 0.2, delay: 0.22 });
          }
          if (chromaB) {
            gsap.set(chromaB, { visibility: "visible" });
            gsap.fromTo(
              chromaB,
              { opacity: 0, x: 16, scaleX: 1.06 },
              {
                opacity: 0.5,
                x: 0,
                scaleX: 1,
                ease: "expo.out",
                duration: 0.2,
              },
            );
            gsap.to(chromaB, { opacity: 0, duration: 0.2, delay: 0.22 });
          }
        };

        // ── REVERSE: tiles fly BACK OUT to edges (card reopens) ─
        const fireShatterOpen = () => {
          if (shatterState === "open" || shatterState === null) return;
          shatterState = "open";

          gsap.killTweensOf([...tiles, chromaR, chromaB]);
          gsap.set(tileGrid, { visibility: "visible" });

          // Chroma flash first
          if (chromaR) {
            gsap.set(chromaR, {
              visibility: "visible",
              opacity: 0,
              x: 0,
              scaleX: 1,
            });
            gsap.to(chromaR, {
              opacity: 0.45,
              x: -10,
              scaleX: 1.04,
              ease: "expo.out",
              duration: 0.15,
            });
            gsap.to(chromaR, { opacity: 0, duration: 0.18, delay: 0.16 });
          }
          if (chromaB) {
            gsap.set(chromaB, {
              visibility: "visible",
              opacity: 0,
              x: 0,
              scaleX: 1,
            });
            gsap.to(chromaB, {
              opacity: 0.45,
              x: 10,
              scaleX: 1.04,
              ease: "expo.out",
              duration: 0.15,
            });
            gsap.to(chromaB, { opacity: 0, duration: 0.18, delay: 0.16 });
          }

          // Tiles fly OUT — mirror of fly-in: start at 0,0 → end at offscreen
          tileData.forEach(({ tile, x, y, skewX, skewY, delay }) => {
            gsap.fromTo(
              tile,
              { x: 0, y: 0, opacity: 1, skewX: 0, skewY: 0 },
              {
                x,
                y,
                opacity: 0,
                skewX,
                skewY,
                ease: "expo.in", // ← expo.in for an accelerating burst feel
                duration: 0.55,
                delay,
                onComplete: () => {
                  // After last tile, hide the whole grid
                  const maxDelay = Math.max(...tileData.map((d) => d.delay));
                  if (delay >= maxDelay - 0.01) {
                    gsap.set(tileGrid, { visibility: "hidden" });
                    gsap.set(tiles, {
                      opacity: 0,
                      x: 0,
                      y: 0,
                      skewX: 0,
                      skewY: 0,
                    });
                    gsap.set([chromaR, chromaB], {
                      visibility: "hidden",
                      opacity: 0,
                    });
                  }
                },
              },
            );
          });
        };

        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Image zoom
            gsap.set(img, {
              scale: 1 + self.progress * 0.25,
              transformOrigin: "center center",
            });

            // Content fade
            if (self.progress < 0.55) {
              gsap.set(content, {
                opacity: 1 - self.progress * 1.6,
                y: -self.progress * 60,
              });
              gsap.set(num, { opacity: 1 - self.progress * 2 });
            }

            // ── Threshold logic: close at 0.6, reopen below 0.5 ──
            if (self.progress >= 0.6) {
              fireShatterClose();
            } else if (self.progress < 0.5 && shatterState === "closed") {
              fireShatterOpen();
            }
          },
        });

        gsap.fromTo(
          content,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 95%", once: true },
          },
        );
        gsap.fromTo(
          num,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 95%", once: true },
          },
        );
      });

      // ── Magnetic cursor ──────────────────────────────────────────
      const canHover =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;

      if (canHover) {
        const cursor = document.querySelector(".pw-cursor");
        if (cursor) {
          let mx = 0,
            my = 0,
            cx = 0,
            cy = 0,
            raf;
          const onMove = (e) => {
            mx = e.clientX;
            my = e.clientY;
          };
          window.addEventListener("mousemove", onMove);
          const tick = () => {
            cx += (mx - cx) * 0.12;
            cy += (my - cy) * 0.12;
            gsap.set(cursor, { x: cx, y: cy });
            raf = requestAnimationFrame(tick);
          };
          tick();

          const onEnter = () =>
            gsap.to(cursor, {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: "back.out(2)",
            });
          const onLeave = () =>
            gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.3 });

          sectionRef.current?.querySelectorAll(".pw-card").forEach((card) => {
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

      // cleanups.push(() => ScrollTrigger.getAll().forEach((t) => t.kill()));
    };

    const ctx = gsap.context(() => {
      init();
    }, sectionRef);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  const splitChars = (text) =>
    text.split("").map((ch, i) => (
      <span key={i} className="pw-char" style={{ display: "inline-block" }}>
        {ch === " " ? "\u00A0" : ch}
      </span>
    ));

  return (
    <>
      <style>{`
        .pw-cursor {
          position: fixed; top: 0; left: 0;
          width: 84px; height: 84px; border-radius: 50%;
          background: hsl(var(--primary) / 0.08);
          border: 1px solid hsl(var(--primary) / 0.35);
          display: flex; align-items: center; justify-content: center;
          pointer-events: none; z-index: 9999;
          transform: translate(-50%, -50%) scale(0); opacity: 0;
          backdrop-filter: blur(4px);
        }
        .pw-cursor-text { font-family: var(--font-body, sans-serif); font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: hsl(var(--foreground) / 0.8); }
        .pw-section { background: hsl(var(--background)); color: hsl(var(--foreground)); }
        .pw-intro { padding: 130px 60px 70px; max-width: 1400px; margin: 0 auto; display: flex; align-items: flex-end; justify-content: space-between; gap: 40px; }
        .pw-intro-left { max-width: 680px; }
        .pw-eyebrow { display: flex; align-items: center; gap: 12px; font-family: var(--font-body, sans-serif); font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; color: hsl(var(--muted-foreground)); margin-bottom: 20px; border: 1px solid hsl(var(--border) / 0.4); border-radius: 100px; padding: 6px 16px; width: fit-content; }
        .pw-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: hsl(var(--primary)); flex-shrink: 0; }
        .pw-char { display: inline-block; will-change: transform, opacity; }
        .pw-intro-heading { font-family: var(--font-display, sans-serif); font-size: clamp(52px, 7vw, 104px); font-weight: 600; line-height: 0.9; letter-spacing: -0.03em; color: hsl(var(--foreground)); perspective: 800px; overflow: visible; }
        .pw-line2 { display: block; }
        .pw-intro-right { text-align: right; flex-shrink: 0; padding-bottom: 8px; }
        .pw-total { font-family: var(--font-display, sans-serif); font-size: clamp(38px, 3.8vw, 62px); color: transparent; -webkit-text-stroke: 1px hsl(var(--border)); display: block; line-height: 1; font-weight: 600; }
        .pw-intro-sub { font-family: var(--font-body, sans-serif); font-size: 11px; color: hsl(var(--muted-foreground)); letter-spacing: 0.06em; margin-top: 6px; text-transform: uppercase; }
        .pw-scroll-hint { padding: 0 60px 52px; display: flex; align-items: center; gap: 16px; max-width: 1400px; margin: 0 auto; }
        .pw-scroll-hint-line { width: 48px; height: 1px; background: hsl(var(--border)); }
        .pw-scroll-hint-text { font-family: var(--font-body, sans-serif); font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase; color: hsl(var(--muted-foreground) / 0.5); }
        .pw-scroll-hint-arrow { animation: pw-bob 2s ease-in-out infinite; }
        @keyframes pw-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
        .pw-cards { position: relative; }
        .pw-card { position: relative; width: 100%; height: 100vh; overflow: hidden; background: hsl(var(--background)); isolation: isolate; }
        .pw-card-bg { position: absolute; inset: 0; z-index: 0; overflow: hidden; transform-origin: center center; }
        .pw-card-img { width: 100%; height: 100%; object-fit: cover; object-position: center; transform-origin: center center; will-change: transform; display: block; }
        .pw-card-grad { position: absolute; inset: 0; background: linear-gradient(to right, hsl(var(--background) / 0.82) 0%, hsl(var(--background) / 0.1) 55%, transparent 100%), linear-gradient(to top, hsl(var(--background) / 0.65) 0%, transparent 45%); z-index: 1; }
        .pw-tile-grid { position: absolute; inset: 0; z-index: 8; display: grid; grid-template-columns: repeat(8, 1fr); grid-template-rows: repeat(5, 1fr); pointer-events: none; overflow: hidden; visibility: hidden; }
        .pw-tile { background: hsl(var(--background)); opacity: 0; will-change: transform, opacity; }
        .pw-chroma-r { position: absolute; inset: 0; z-index: 9; background: hsl(var(--background)); mix-blend-mode: screen; opacity: 0; pointer-events: none; visibility: hidden; }
        .pw-chroma-b { position: absolute; inset: 0; z-index: 9; background: hsl(var(--background)); mix-blend-mode: screen; opacity: 0; pointer-events: none; visibility: hidden; }
        .pw-card-content { position: absolute; inset: 0; z-index: 5; display: flex; flex-direction: column; justify-content: flex-end; padding: 0 72px 72px; max-width: 760px; will-change: transform, opacity; }
        .pw-card-num { font-family: var(--font-body, sans-serif); font-size: 10px; letter-spacing: 0.4em; color: hsl(var(--muted-foreground) / 0.6); margin-bottom: 18px; will-change: opacity, transform; text-transform: uppercase; }
        .pw-card-cat { font-family: var(--font-body, sans-serif); font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; color: hsl(var(--muted-foreground)); margin-bottom: 10px; display: flex; align-items: center; gap: 12px; }
        .pw-card-cat-line { display: inline-block; height: 1px; width: 32px; background: hsl(var(--primary)); flex-shrink: 0; }
        .pw-card-title { font-family: var(--font-display, sans-serif); font-size: clamp(44px, 5.8vw, 84px); font-weight: 600; line-height: 0.92; letter-spacing: -0.03em; color: hsl(var(--foreground)); margin-bottom: 18px; }
        .pw-card-desc { font-family: var(--font-body, sans-serif); font-size: 14px; line-height: 1.65; color: hsl(var(--muted-foreground)); max-width: 440px; margin-bottom: 28px; font-weight: 300; }
        .pw-card-tags { display: flex; gap: 7px; flex-wrap: wrap; }
        .pw-card-tag { font-family: var(--font-body, sans-serif); font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; padding: 5px 13px; border-radius: 100px; color: hsl(var(--foreground) / 0.7); border: 1px solid hsl(var(--border) / 0.6); backdrop-filter: blur(4px); }
        .pw-card-year { position: absolute; top: 36px; right: 48px; z-index: 5; font-family: var(--font-body, sans-serif); font-size: 10px; letter-spacing: 0.4em; color: hsl(var(--muted-foreground) / 0.35); text-transform: uppercase; }
        .pw-card-progress { position: absolute; top: 50%; right: 40px; transform: translateY(-50%); z-index: 6; display: flex; flex-direction: column; gap: 8px; align-items: center; }
        .pw-card-prog-dot { width: 4px; height: 4px; border-radius: 50%; background: hsl(var(--muted-foreground) / 0.25); transition: background 0.3s, transform 0.3s; }
        .pw-card-prog-dot.active { background: hsl(var(--primary)); transform: scale(1.6); }
        .pw-footer { background: hsl(var(--background)); padding: 100px 60px 120px; display: flex; align-items: center; justify-content: space-between; max-width: 1400px; margin: 0 auto; gap: 40px; border-top: 1px solid hsl(var(--border) / 0.4); }
        .pw-footer-label { font-family: var(--font-body, sans-serif); font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: hsl(var(--muted-foreground) / 0.5); margin-bottom: 8px; }
        .pw-footer-heading { font-family: var(--font-display, sans-serif); font-size: clamp(36px, 4.5vw, 68px); font-weight: 600; letter-spacing: -0.03em; color: hsl(var(--foreground)); line-height: 1; }
        .pw-footer-btn { display: flex; align-items: center; gap: 12px; padding: 14px 32px; border-radius: 100px; border: 1px solid hsl(var(--border) / 0.6); background: transparent; color: hsl(var(--foreground)); font-family: var(--font-body, sans-serif); font-size: 12px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; position: relative; overflow: hidden; transition: border-color 0.35s, box-shadow 0.5s; white-space: nowrap; flex-shrink: 0; }
        .pw-footer-btn::before { content: ''; position: absolute; inset: 0; background: hsl(var(--primary) / 0.08); opacity: 0; transition: opacity 0.35s; }
        .pw-footer-btn:hover::before { opacity: 1; }
        .pw-footer-btn:hover { border-color: hsl(var(--primary) / 0.4); box-shadow: 0 8px 40px -8px hsl(var(--primary) / 0.3); }
        .pw-footer-btn span, .pw-footer-ico { position: relative; z-index: 1; }
        .pw-footer-ico { width: 16px; height: 16px; transition: transform 0.3s ease; }
        .pw-footer-btn:hover .pw-footer-ico { transform: translateX(4px); }
        @media (max-width: 768px) {
          .pw-intro { padding: 80px 24px 50px; flex-direction: column; align-items: flex-start; }
          .pw-intro-right { text-align: left; }
          .pw-scroll-hint { padding: 0 24px 36px; }
          .pw-card-content { padding: 0 28px 48px; }
          .pw-card-year { right: 24px; }
          .pw-card-progress { right: 16px; }
          .pw-footer { padding: 60px 24px 80px; flex-direction: column; align-items: flex-start; }
        }
        @media (hover: none), (pointer: coarse) {
          .pw-cursor { display: none !important; }
        }
      `}</style>

      <div className="pw-cursor">
        <span className="pw-cursor-text">View</span>
      </div>

      <section id="work" className="pw-section" ref={sectionRef}>
        <div className="pw-intro" ref={titleRef}>
          <div className="pw-intro-left">
            <div className="pw-eyebrow">
              <span className="pw-eyebrow-dot" />
              Selected Work
            </div>
            <div className="pw-intro-heading">
              <div className="pw-line1">{splitChars("Our")}</div>
              <div className="pw-line2 text-gradient-primary">Portfolio</div>
            </div>
          </div>
          <div className="pw-intro-right">
            <span className="pw-total">05</span>
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

        <div className="pw-cards">
          {projects.map((p, i) => (
            <div key={p.id} className="pw-card">
              <div className="pw-card-bg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="pw-card-img"
                  loading="eager"
                />
              </div>
              <div className="pw-card-grad" />
              <div className="pw-tile-grid">
                {Array.from({ length: 40 }).map((_, ti) => (
                  <div key={ti} className="pw-tile" />
                ))}
              </div>
              <div className="pw-chroma-r" />
              <div className="pw-chroma-b" />
              <span className="pw-card-year">{p.year}</span>
              <div className="pw-card-progress">
                {projects.map((_, di) => (
                  <span
                    key={di}
                    className={`pw-card-prog-dot${di === i ? " active" : ""}`}
                  />
                ))}
              </div>
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
