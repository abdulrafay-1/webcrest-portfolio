"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const projects = [
  {
    id: "01",
    title: "IusBlock",
    category: "Brand Identity & Web",
    tab: "Branding",
    year: "2024",
    tags: ["Design System", "Next.js", "Motion"],
    image: "projects/iusblock.png",
    href: "https://iusblock.com",
    accent: "hsl(var(--primary))",
    desc: "A complete visual identity for a luxury SaaS brand, from logo system to interactive design language.",
  },
  {
    id: "02",
    title: "Meet Coin",
    category: "A Stable Crypto E-Commerce Token",
    tab: "Crypto",
    year: "2024",
    tags: ["Cryptocurrency", "Tokens", "Stable"],
    image: "/projects/meetcoin.png",
    href: "https://meetcoin.io",
    accent: "hsl(var(--primary))",
    desc: "An immersive e-commerce platform with real-time 3D product previews and augmented reality try-on.",
  },
  {
    id: "03",
    title: "PagoMeet",
    category: "BlockChain & Crypto Wallet",
    tab: "Blockchain",
    year: "2023",
    tags: ["React Native", "WebGL", "Real-time"],
    image: "/projects/pagomeet.png",
    href: "https://pagomeet.com",
    accent: "hsl(var(--primary))",
    desc: "A data-dense operations platform that turns complex infrastructure metrics into beautiful clarity.",
  },
  {
    id: "04",
    title: "MercadoMeet",
    category: "A detailed website for Mercado Meet Ecommerce Mobile App",
    tab: "E-Commerce",
    year: "2023",
    tags: ["Three.js", "GLSL", "Canvas"],
    image: "/projects/mercadomeet.png",
    href: "https://mercadomeet.com",
    accent: "hsl(var(--primary))",
    desc: "A generative art installation that reacts to visitor movement, blending code with physical space.",
  },
];

const whatsappNumber = "+923442667537";
const whatsappMessage =
  "Hi Webcrest, I want to discuss my project. Please share the next available slot.";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);

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

      const cards = sectionRef.current?.querySelectorAll(".pw-card");
      const cardEls = Array.from(cards || []);

      const activateTab = (idx: number) => {
        tabsRef.current?.querySelectorAll(".pw-cat-tab").forEach((tab, ti) => {
          tab.classList.toggle("active", ti === idx);
        });
      };

      // Tab click → scroll to that project
      tabsRef.current?.querySelectorAll(".pw-cat-tab").forEach((tab, ti) => {
        const onClick = () =>
          cardEls[ti]?.scrollIntoView({ behavior: "smooth" });
        tab.addEventListener("click", onClick);
        cleanups.push(() => tab.removeEventListener("click", onClick));
      });

      gsap.set(tabsRef.current, { opacity: 0, y: -16 });
      let tabsVisible = false;

      const showTabs = () => {
        if (tabsVisible) return;
        tabsVisible = true;
        gsap.to(tabsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          overwrite: true,
        });
      };
      const hideTabs = () => {
        if (!tabsVisible) return;
        tabsVisible = false;
        gsap.to(tabsRef.current, {
          opacity: 0,
          y: -16,
          duration: 0.4,
          overwrite: true,
        });
      };

      const lastCardIdx = cardEls.length - 1;

      /* ── TEMPORARILY COMMENTED OUT: GSAP ScrollTrigger pin card animations ──
      cards?.forEach((card, cardIdx) => {
        const img = card.querySelector(".pw-card-img") as HTMLElement | null;
        const content = card.querySelector(".pw-card-content") as HTMLElement | null;
        const ghostNum = card.querySelector(".pw-ghost-num") as HTMLElement | null;
        const accentLine = card.querySelector(".pw-accent-line") as HTMLElement | null;
        const strips = card.querySelectorAll(".pw-strip");
        strips.forEach((strip) => { gsap.set(strip, { clipPath: "inset(0% 0 0% 0)" }); });
        if (content) gsap.set(content, { opacity: 0, y: 38 });
        if (ghostNum) gsap.set(ghostNum, { opacity: 0, y: 20 });
        if (accentLine) { gsap.set(accentLine, { scaleY: 0, transformOrigin: "top center" }); }
        ScrollTrigger.create({
          trigger: card, start: "top top", end: "+=190%",
          pin: true, scrub: 1.4, anticipatePin: 1,
          onEnter: () => { showTabs(); activateTab(cardIdx); },
          onEnterBack: () => { showTabs(); activateTab(cardIdx); },
          onLeave: () => { if (cardIdx === lastCardIdx) hideTabs(); },
          onLeaveBack: () => { if (cardIdx === 0) hideTabs(); },
          onUpdate: (self: { progress: number }) => {
            if (self.progress > 0.01 && self.progress < 0.99) { showTabs(); activateTab(cardIdx); }
            const p = self.progress;
            if (img) { gsap.set(img, { y: -p * 55, scale: 1 + p * 0.06 }); }
            if (ghostNum) {
              const gnEnter = clamp((p - 0.05) / 0.45, 0, 1);
              const gnExit = clamp((p - 0.68) / 0.32, 0, 1);
              gsap.set(ghostNum, { opacity: easeExpoOut(gnEnter) * 0.055 * (1 - easeExpoOut(gnExit)), y: -p * 35 });
            }
            strips.forEach((strip, si) => {
              const openRaw = clamp((p - si * 0.1) / 0.36, 0, 1);
              gsap.set(strip, { clipPath: `inset(0% 0 ${easeExpoOut(openRaw) * 100}% 0)` });
            });
            if (content) {
              const cEnter = clamp((p - 0.18) / 0.38, 0, 1);
              const cExit = clamp((p - 0.68) / 0.32, 0, 1);
              gsap.set(content, { opacity: Math.max(0, easePow4Out(cEnter) - easeExpoIn(cExit)), y: (1 - easePow4Out(cEnter)) * 38 - easeExpoIn(cExit) * 42 });
            }
            if (accentLine) {
              const alP = clamp((p - 0.18) / 0.45, 0, 1);
              const alOut = clamp((p - 0.68) / 0.32, 0, 1);
              gsap.set(accentLine, { scaleY: easeExpoOut(alP) * (1 - easeExpoIn(alOut)), opacity: easeExpoOut(alP) * (1 - easeExpoIn(alOut)) });
            }
          },
        });
      });
      ── END TEMPORARILY COMMENTED OUT ── */

      // CSS card entry animations driven by IntersectionObserver
      const cardsContainer = sectionRef.current?.querySelector(".pw-cards");
      const cardObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const idx = parseInt(
              (entry.target as HTMLElement).dataset.idx ?? "0",
              10,
            );
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              showTabs();
              activateTab(idx);
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -4% 0px" },
      );
      cardEls.forEach((el) => cardObserver.observe(el));

      const containerObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) hideTabs();
        },
        { threshold: 0 },
      );
      if (cardsContainer) containerObserver.observe(cardsContainer);

      cleanups.push(() => {
        cardObserver.disconnect();
        containerObserver.disconnect();
      });

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

        /* ── New smooth CSS card layout ── */
        .pw-cards { position: relative; }

        .pw-card {
          position: relative;
          display: grid;
          grid-template-columns: 52% 48%;
          grid-template-areas: "text media";
          min-height: 88vh;
          border-top: 1px solid hsl(var(--border) / 0.25);
          overflow: hidden;
          cursor: pointer;
          background: hsl(var(--background));
        }
        .pw-card--flip {
          grid-template-columns: 48% 52%;
          grid-template-areas: "media text";
        }
        .pw-card-text {
          grid-area: text;
          display: flex; flex-direction: column; justify-content: center;
          padding: 80px 72px 80px 80px;
          position: relative; z-index: 2;
        }
        .pw-card--flip .pw-card-text { padding: 80px 80px 80px 64px; }

        .pw-card-media {
          grid-area: media;
          position: relative; overflow: hidden;
          clip-path: inset(0 100% 0 0);
          transition: clip-path 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pw-card--flip .pw-card-media {
          clip-path: inset(0 0 0 100%);
        }
        .pw-card.in-view .pw-card-media {
          clip-path: inset(0 0% 0 0);
        }
        .pw-card--flip.in-view .pw-card-media {
          clip-path: inset(0 0 0 0%);
        }
        .pw-card-media-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, hsl(var(--background)/0.18) 0%, transparent 60%);
          z-index: 1; pointer-events: none;
        }
        .pw-card-img {
          width: 100%; height: 100%; object-fit: cover;
          transform: scale(1.1);
          transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1);
          display: block;
        }
        .pw-card.in-view .pw-card-img { transform: scale(1); }
        .pw-card:hover .pw-card-img { transform: scale(1.05); }

        /* Per-element enter animations */
        .pw-card-num,
        .pw-card-cat,
        .pw-card-title,
        .pw-card-desc,
        .pw-card-tags,
        .pw-card-link {
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .pw-card.in-view .pw-card-num   { opacity: 1; transform: none; transition-delay: 0.08s; }
        .pw-card.in-view .pw-card-cat   { opacity: 1; transform: none; transition-delay: 0.18s; }
        .pw-card.in-view .pw-card-title { opacity: 1; transform: none; transition-delay: 0.26s; }
        .pw-card.in-view .pw-card-desc  { opacity: 1; transform: none; transition-delay: 0.36s; }
        .pw-card.in-view .pw-card-tags  { opacity: 1; transform: none; transition-delay: 0.44s; }
        .pw-card.in-view .pw-card-link  { opacity: 1; transform: none; transition-delay: 0.52s; }

        .pw-card-num {
          font-size: 10px; letter-spacing: 0.42em; text-transform: uppercase;
          color: hsl(var(--muted-foreground) / 0.45); margin-bottom: 22px;
        }
        .pw-card-cat {
          font-size: 10px; letter-spacing: 0.38em; text-transform: uppercase;
          color: hsl(var(--muted-foreground)); margin-bottom: 14px;
          display: flex; align-items: center; gap: 14px;
        }
        .pw-card-cat-line {
          display: inline-block; height: 1px; width: 0;
          background: hsl(var(--primary)); flex-shrink: 0;
          transition: width 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.22s;
        }
        .pw-card.in-view .pw-card-cat-line { width: 28px; }
        .pw-card-title {
          font-size: clamp(40px, 5.2vw, 78px); font-weight: 600;
          line-height: 0.94; letter-spacing: -0.03em;
          color: hsl(var(--foreground)); margin-bottom: 22px;
        }
        .pw-card-desc {
          font-size: 14px; line-height: 1.75;
          color: hsl(var(--muted-foreground)); max-width: 400px;
          margin-bottom: 30px; font-weight: 300;
        }
        .pw-card-tags { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 32px; }
        .pw-card-tag {
          font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
          padding: 5px 14px; border-radius: 100px;
          color: hsl(var(--foreground) / 0.6);
          border: 1px solid hsl(var(--border) / 0.5);
          backdrop-filter: blur(4px);
        }
        .pw-card-link {
          display: inline-flex; align-items: center; gap: 9px;
          font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase;
          color: hsl(var(--foreground) / 0.7);
          border-bottom: 1px solid hsl(var(--border) / 0.5);
          padding-bottom: 6px; width: fit-content;
          text-decoration: none;
          transition: color 0.3s, border-color 0.3s, gap 0.3s;
        }
        .pw-card-link:hover { color: hsl(var(--primary)); border-color: hsl(var(--primary) / 0.5); gap: 13px; }
        .pw-card-year {
          position: absolute; top: 32px; right: 40px; z-index: 3;
          font-size: 9px; letter-spacing: 0.42em; text-transform: uppercase;
          color: hsl(var(--muted-foreground) / 0.28);
          opacity: 0; transition: opacity 0.6s 0.5s;
        }
        .pw-card.in-view .pw-card-year { opacity: 1; }

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
          .pw-card {
            grid-template-columns: 1fr;
            grid-template-areas: "media" "text";
            min-height: auto;
          }
          .pw-card--flip {
            grid-template-columns: 1fr;
            grid-template-areas: "media" "text";
          }
          .pw-card-media { height: 56vw; min-height: 220px; clip-path: inset(0 0 100% 0) !important; }
          .pw-card.in-view .pw-card-media { clip-path: inset(0 0 0% 0) !important; }
          .pw-card-text, .pw-card--flip .pw-card-text { padding: 40px 24px 48px; }
          .pw-card-year { top: 16px; right: 20px; }
        }
        @media (hover: none), (pointer: coarse) {
          .pw-cursor { display: none !important; }
        }

        /* ── Category tab bar ── */
        .pw-cat-tabs {
          position: fixed;
          top: 58px;
          left: 0;
          right: 0;
          margin: 0 auto;
          width: fit-content;
          z-index: 200;
          display: flex;
          gap: 4px;
          background: hsl(var(--background) / 0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid hsl(var(--border) / 0.35);
          border-radius: 100px;
          padding: 5px;
          pointer-events: none;
          will-change: opacity, transform;
        }
        .pw-cat-tab {
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: hsl(var(--muted-foreground) / 0.45);
          padding: 6px 16px;
          border-radius: 100px;
          border: none;
          background: transparent;
          cursor: pointer;
          pointer-events: auto;
          transition: color 0.35s, background 0.35s;
          display: flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          font-family: inherit;
          user-select: none;
        }
        .pw-cat-tab-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: hsl(var(--muted-foreground) / 0.18);
          transition: background 0.35s, transform 0.35s;
          flex-shrink: 0;
        }
        .pw-cat-tab.active {
          color: hsl(var(--foreground) / 0.85);
          background: hsl(var(--foreground) / 0.07);
        }
        .pw-cat-tab.active .pw-cat-tab-dot {
          background: hsl(var(--primary));
          transform: scale(1.35);
        }
        @media (max-width: 768px) {
          .pw-cat-tabs {
            top: 56px;
            max-width: calc(100vw - 32px);
          }
          .pw-cat-tab {
            font-size: 8px;
            padding: 5px 10px;
            letter-spacing: 0.18em;
            gap: 6px;
          }
        }
      `}</style>

      <div className="pw-cursor">
        <span className="pw-cursor-text">Visit ↗</span>
      </div>

      {/* Sticky category tab indicator */}
      <div className="pw-cat-tabs" ref={tabsRef}>
        {projects.map((p, i) => (
          <div key={p.id} className={`pw-cat-tab${i === 0 ? " active" : ""}`}>
            <span className="pw-cat-tab-dot" />
            {p.tab}
          </div>
        ))}
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

        <div className="pw-cards">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className={`pw-card${i % 2 === 1 ? " pw-card--flip" : ""}`}
              data-idx={i}
              data-href={p.href}
            >
              {/* Text side */}
              <div className="pw-card-text">
                <span className="pw-card-num">
                  {p.id} / {String(projects.length).padStart(2, "0")}
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
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pw-card-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Project
                  <svg
                    width="14"
                    height="14"
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

              {/* Image side */}
              <div className="pw-card-media">
                <img src={p.image} alt={p.title} className="pw-card-img" />
                <div className="pw-card-media-overlay" />
              </div>

              <span className="pw-card-year">{p.year}</span>
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
