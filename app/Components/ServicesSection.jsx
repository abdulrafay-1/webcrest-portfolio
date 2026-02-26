"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    num: "01",
    title: "Brand & Identity",
    sub: "The face of your vision",
    desc: "We craft visual languages that are impossible to ignore — logo systems, motion identities, design tokens, and brand guidelines that scale from a favicon to a billboard.",
    tags: [
      "Logo Design",
      "Design Systems",
      "Brand Strategy",
      "Motion Identity",
    ],
    stat: "200+",
    statLabel: "Brands Launched",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <circle cx="24" cy="24" r="20" />
        <circle cx="24" cy="24" r="10" />
        <line x1="24" y1="4" x2="24" y2="44" />
        <line x1="4" y1="24" x2="44" y2="24" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Web Development",
    sub: "Engineered to perform",
    desc: "Next.js, edge-deployed, pixel-perfect. We build sites and apps that load in milliseconds and feel alive — with animations, interactions, and architecture that scales.",
    tags: ["Next.js", "React", "WebGL", "Edge Deployment"],
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
    num: "03",
    title: "Motion & 3D",
    sub: "Where code meets cinema",
    desc: "GSAP, Three.js, WebGL shaders. We bring depth and drama to digital experiences — interactive 3D scenes, scroll-driven storytelling, and animations that make people stop scrolling.",
    tags: ["Three.js", "GSAP", "GLSL Shaders", "Lottie"],
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
    num: "04",
    title: "E-Commerce",
    sub: "Built to convert",
    desc: "Shopify Plus, custom storefronts, headless commerce. We design buying experiences that feel effortless — from first impression to repeat purchase.",
    tags: ["Shopify Plus", "Headless CMS", "AR Try-On", "Payment UX"],
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
    num: "05",
    title: "SaaS & Platforms",
    sub: "Complexity, tamed",
    desc: "We design and build SaaS products that handle real complexity gracefully — dashboards, data visualization, onboarding flows, and multi-tenant architectures.",
    tags: ["Dashboard Design", "D3.js", "Real-time Data", "Auth Systems"],
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

export default function ServicesSection() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const titleRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const cleanups = [];

    const init = async () => {
      if (typeof window === "undefined") return;

      if (!window.gsap) {
        await new Promise((res, rej) => {
          const s = document.createElement("script");
          s.src =
            "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
          s.onload = res;
          s.onerror = rej;
          document.head.appendChild(s);
        });
      }
      if (!window.ScrollTrigger) {
        await new Promise((res, rej) => {
          const s = document.createElement("script");
          s.src =
            "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
          s.onload = res;
          s.onerror = rej;
          document.head.appendChild(s);
        });
      }

      const { gsap } = window;
      const { ScrollTrigger } = window;
      gsap.registerPlugin(ScrollTrigger);

      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (!track || !wrap) return;

      // ── Heading reveal ───────────────────────────────────────────
      const titleChars = titleRef.current?.querySelectorAll(".sv-char");
      const titleLine2 = titleRef.current?.querySelector(".sv-line2");
      const titleRect = titleRef.current?.getBoundingClientRect();
      const titleInView = titleRect ? titleRect.top < window.innerHeight : true;

      const animTitle = () => {
        if (titleChars?.length) {
          gsap.fromTo(
            titleChars,
            { y: 70, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.035,
              duration: 0.85,
              ease: "power3.out",
            },
          );
        }
        if (titleLine2) {
          gsap.fromTo(
            titleLine2,
            { y: 60, clipPath: "inset(0 0 100% 0)" },
            {
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 1.1,
              ease: "power4.out",
              delay: 0.2,
            },
          );
        }
      };

      if (titleInView) requestAnimationFrame(animTitle);
      else
        ScrollTrigger.create({
          trigger: titleRef.current,
          start: "top 90%",
          once: true,
          onEnter: animTitle,
        });

      // ── Horizontal scroll ────────────────────────────────────────
      // Total distance to scroll = track width minus one viewport width
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      const st = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Update progress bar
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      // ── Card entrance animations (staggered as they scroll into view) ──
      const cards = track.querySelectorAll(".sv-card");
      cards.forEach((card, i) => {
        const inner = card.querySelector(".sv-card-inner");
        const num = card.querySelector(".sv-card-num");
        const title = card.querySelector(".sv-card-title");
        const tags = card.querySelectorAll(".sv-tag");
        const statEl = card.querySelector(".sv-stat");
        const iconEl = card.querySelector(".sv-icon");

        // Initial state — hidden
        gsap.set([inner], { opacity: 0, y: 40 });
        gsap.set(iconEl, { opacity: 0, scale: 0.7, rotate: -15 });

        ScrollTrigger.create({
          trigger: card,
          containerAnimation: st, // ties to the horizontal scroll
          start: "left 90%",
          once: true,
          onEnter: () => {
            gsap.to(inner, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              delay: i === 0 ? 0.1 : 0,
            });
            gsap.to(iconEl, {
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 1,
              ease: "back.out(1.5)",
              delay: 0.15,
            });
            if (tags.length) {
              gsap.fromTo(
                tags,
                { opacity: 0, y: 10 },
                {
                  opacity: 1,
                  y: 0,
                  stagger: 0.06,
                  duration: 0.5,
                  ease: "power2.out",
                  delay: 0.3,
                },
              );
            }
          },
        });

        // Hover — icon rotates, stat pops
        const onEnter = () => {
          gsap.to(iconEl, {
            rotate: 8,
            scale: 1.08,
            duration: 0.5,
            ease: "power2.out",
          });
          if (statEl)
            gsap.to(statEl, {
              scale: 1.06,
              duration: 0.4,
              ease: "back.out(2)",
            });
        };
        const onLeave = () => {
          gsap.to(iconEl, {
            rotate: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          });
          if (statEl) gsap.to(statEl, { scale: 1, duration: 0.3 });
        };
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      // ── Marquee text in header scrolls opposite direction ────────
      const marquee = wrapRef.current?.querySelector(".sv-marquee-inner");
      if (marquee) {
        gsap.to(marquee, {
          x: "-50%",
          ease: "none",
          duration: 18,
          repeat: -1,
        });
      }

      cleanups.push(() => ScrollTrigger.getAll().forEach((t) => t.kill()));
    };

    init();
    return () => cleanups.forEach((fn) => fn());
  }, []);

  const splitChars = (text) =>
    text.split("").map((ch, i) => (
      <span key={i} className="sv-char" style={{ display: "inline-block" }}>
        {ch === " " ? "\u00A0" : ch}
      </span>
    ));

  return (
    <>
      <style>{`
        /* ── Wrapper — this gets pinned ── */
        .sv-wrap {
          background: hsl(var(--background));
          overflow: hidden;
          position: relative;
        }

        /* ── Sticky header above the scroll track ── */
        .sv-header {
          position: absolute;
          top: 0; left: 0; right: 0;
          z-index: 10;
          padding: 48px 60px 0;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          pointer-events: none;
        }

        .sv-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body, sans-serif);
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: hsl(var(--muted-foreground));
          border: 1px solid hsl(var(--border) / 0.4);
          border-radius: 100px;
          padding: 6px 16px;
          pointer-events: auto;
        }
        .sv-eyebrow-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: hsl(var(--primary));
        }

        .sv-header-count {
          font-family: var(--font-display, sans-serif);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: hsl(var(--muted-foreground) / 0.35);
          text-transform: uppercase;
          padding-top: 4px;
        }

        /* ── Big title block ── */
        .sv-title-block {
          position: absolute;
          bottom: 72px;
          left: 60px;
          z-index: 10;
          pointer-events: none;
        }

        .sv-title-block .sv-heading {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(64px, 8vw, 120px);
          font-weight: 600;
          line-height: 0.9;
          letter-spacing: -0.03em;
          color: hsl(var(--foreground));
          perspective: 800px;
          overflow: visible;
        }

        .sv-line2 {
          display: block;
        }

        .sv-char { display: inline-block; will-change: transform, opacity; }

        /* ── Progress bar ── */
        .sv-progress-wrap {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: hsl(var(--border) / 0.3);
          z-index: 20;
        }
        .sv-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.4));
          transform-origin: left center;
          transform: scaleX(0);
          will-change: transform;
        }

        /* ── Scroll track — lays out cards horizontally ── */
        .sv-track {
          display: flex;
          align-items: stretch;
          height: 100vh;
          padding: 0;
          will-change: transform;
        }

        /* ── First panel — full height title ── */
        .sv-panel-intro {
          flex-shrink: 0;
          width: 45vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 64px 140px 60px;
          border-right: 1px solid hsl(var(--border) / 0.15);
          position: relative;
        }

        .sv-panel-intro-sub {
          font-family: var(--font-body, sans-serif);
          font-size: 14px;
          line-height: 1.7;
          color: hsl(var(--muted-foreground));
          max-width: 380px;
          margin-top: 28px;
          font-weight: 300;
        }

        .sv-scroll-cue {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 40px;
          font-family: var(--font-body, sans-serif);
          font-size: 9px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: hsl(var(--muted-foreground) / 0.45);
        }
        .sv-scroll-line {
          width: 40px; height: 1px;
          background: hsl(var(--border));
        }
        .sv-scroll-arrow {
          animation: sv-slide 2s ease-in-out infinite;
        }
        @keyframes sv-slide {
          0%, 100% { transform: translateX(0); }
          50%       { transform: translateX(6px); }
        }

        /* ── Service cards ── */
        .sv-card {
          flex-shrink: 0;
          width: clamp(340px, 36vw, 520px);
          height: 100vh;
          border-right: 1px solid hsl(var(--border) / 0.12);
          display: flex;
          align-items: center;
          cursor: default;
          position: relative;
          overflow: hidden;
        }

        /* Subtle hover bg */
        .sv-card::before {
          content: '';
          position: absolute; inset: 0;
          background: hsl(var(--primary) / 0.03);
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .sv-card:hover::before { opacity: 1; }

        .sv-card-inner {
          padding: 0 52px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0;
          will-change: transform, opacity;
        }

        /* Icon */
        .sv-icon {
          width: 48px; height: 48px;
          color: hsl(var(--primary));
          margin-bottom: 36px;
          will-change: transform, opacity;
          transform-origin: center center;
        }

        .sv-card-num {
          font-family: var(--font-body, sans-serif);
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: hsl(var(--muted-foreground) / 0.4);
          margin-bottom: 14px;
        }

        .sv-card-title {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(36px, 3.5vw, 56px);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 0.95;
          color: hsl(var(--foreground));
          margin-bottom: 8px;
        }

        .sv-card-sub {
          font-family: var(--font-body, sans-serif);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: hsl(var(--primary) / 0.7);
          margin-bottom: 22px;
        }

        .sv-divider {
          width: 32px; height: 1px;
          background: hsl(var(--border) / 0.6);
          margin-bottom: 22px;
        }

        .sv-card-desc {
          font-family: var(--font-body, sans-serif);
          font-size: 13px;
          line-height: 1.7;
          color: hsl(var(--muted-foreground));
          font-weight: 300;
          margin-bottom: 28px;
        }

        .sv-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 32px;
        }

        .sv-tag {
          font-family: var(--font-body, sans-serif);
          font-size: 8px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 4px 11px;
          border-radius: 100px;
          color: hsl(var(--foreground) / 0.6);
          border: 1px solid hsl(var(--border) / 0.5);
        }

        /* Stat block */
        .sv-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
          will-change: transform;
        }

        .sv-stat-num {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(32px, 3vw, 46px);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1;
          color: hsl(var(--foreground));
        }

        .sv-stat-label {
          font-family: var(--font-body, sans-serif);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: hsl(var(--muted-foreground) / 0.5);
        }

        /* ── End panel ── */
        .sv-panel-end {
          flex-shrink: 0;
          width: 30vw;
          min-width: 280px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 0 60px;
          gap: 24px;
        }

        .sv-cta-label {
          font-family: var(--font-body, sans-serif);
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: hsl(var(--muted-foreground) / 0.4);
        }

        .sv-cta-heading {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(32px, 3.5vw, 52px);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1;
          color: hsl(var(--foreground));
        }

        .sv-cta-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 28px;
          border-radius: 100px;
          border: 1px solid hsl(var(--border) / 0.6);
          background: transparent;
          color: hsl(var(--foreground));
          font-family: var(--font-body, sans-serif);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: border-color 0.35s, box-shadow 0.5s;
          margin-top: 8px;
        }
        .sv-cta-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: hsl(var(--primary) / 0.08);
          opacity: 0;
          transition: opacity 0.35s;
        }
        .sv-cta-btn:hover::before { opacity: 1; }
        .sv-cta-btn:hover {
          border-color: hsl(var(--primary) / 0.4);
          box-shadow: 0 8px 40px -8px hsl(var(--primary) / 0.3);
        }
        .sv-cta-btn span, .sv-cta-ico { position: relative; z-index: 1; }
        .sv-cta-ico { width: 15px; height: 15px; transition: transform 0.3s; }
        .sv-cta-btn:hover .sv-cta-ico { transform: translateX(4px); }

        @media (max-width: 768px) {
          .sv-header { padding: 32px 24px 0; }
          .sv-title-block { left: 24px; bottom: 48px; }
          .sv-panel-intro { padding: 0 32px 120px 24px; width: 90vw; }
          .sv-card { width: 85vw; }
          .sv-card-inner { padding: 0 28px; }
        }
      `}</style>

      {/* Pinned wrapper */}
      <div className="sv-wrap" ref={wrapRef}>
        {/* Sticky header */}
        <div className="sv-header">
          <div className="sv-eyebrow">
            <span className="sv-eyebrow-dot" />
            What We Do
          </div>
          <span className="sv-header-count">05 Services</span>
        </div>

        {/* Progress bar */}
        <div className="sv-progress-wrap">
          <div className="sv-progress-bar" ref={progressRef} />
        </div>

        {/* Horizontal track */}
        <div className="sv-track" ref={trackRef}>
          {/* Intro panel with title */}
          <div className="sv-panel-intro">
            <div className="sv-heading" ref={titleRef}>
              <div className="sv-line1 text-2xl">{splitChars("Our")}</div>
              <div className="sv-line2 text-gradient-primary text-5xl font-semibold">Services</div>
            </div>
            <p className="sv-panel-intro-sub">
              From concept to launch — we cover every discipline needed to build
              digital products that stand out and hold up.
            </p>
            <div className="sv-scroll-cue">
              <span className="sv-scroll-line" />
              Scroll to explore
              <svg
                className="sv-scroll-arrow"
                width="20"
                height="12"
                viewBox="0 0 20 12"
                fill="none"
              >
                <path
                  d="M1 6h16M12 1l6 5-6 5"
                  stroke="hsl(var(--muted-foreground) / 0.4)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Service cards */}
          {services.map((s) => (
            <div key={s.num} className="sv-card">
              <div className="sv-card-inner">
                <div className="sv-icon">{s.icon}</div>
                <span className="sv-card-num">{s.num}</span>
                <h3 className="sv-card-title">{s.title}</h3>
                <p className="sv-card-sub">{s.sub}</p>
                <div className="sv-divider" />
                <p className="sv-card-desc">{s.desc}</p>
                <div className="sv-tags">
                  {s.tags.map((t) => (
                    <span key={t} className="sv-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="sv-stat">
                  <span className="sv-stat-num">{s.stat}</span>
                  <span className="sv-stat-label">{s.statLabel}</span>
                </div>
              </div>
            </div>
          ))}

          {/* End CTA panel */}
          <div className="sv-panel-end">
            <span className="sv-cta-label">Ready to start?</span>
            <p className="sv-cta-heading">Let's build something great</p>
            <button className="sv-cta-btn">
              <span>Start a Project</span>
              <svg
                className="sv-cta-ico"
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
        </div>
      </div>
    </>
  );
}
