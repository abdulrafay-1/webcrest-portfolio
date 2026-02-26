"use client";

// import { useRef } from "react";
// import Link from "next/link";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";

// type HeroProps = {
//   titleTop?: string;
//   titleBottom?: string;
//   rightLines?: string[];
//   ctaPrimaryText?: string;
//   ctaPrimaryHref?: string;
//   ctaSecondaryText?: string;
//   ctaSecondaryHref?: string;
// };

// function splitToSpans(text: string, className: string) {
//   return text.split("").map((ch, i) => (
//     <span
//       key={`${className}-${i}-${ch}`}
//       className={className}
//       style={{ display: "inline-block", willChange: "transform, opacity" }}
//     >
//       {ch === " " ? "\u00A0" : ch}
//     </span>
//   ));
// }

// export default function Hero({
//   titleTop = "WEB",
//   titleBottom = "CREST",
//   rightLines = [
//     "Digital Excellence",
//     "Global Innovation",
//     "Business Meets Art",
//     "Unlock Brand Depth",
//   ],
//   ctaPrimaryText = "View Work",
//   ctaPrimaryHref = "/work",
//   ctaSecondaryText = "Contact",
//   ctaSecondaryHref = "/contact",
// }: HeroProps) {
//   const container = useRef<HTMLElement | null>(null);

//   useGSAP(
//     () => {
//       // initial state
//       gsap.set(".title-char", { opacity: 0, y: 26 });
//       gsap.set(".right-line", { opacity: 0, y: 10 });
//       gsap.set(".cta-btn", { opacity: 0, y: 10 });

//       const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

//       // ✅ "all at once" feel: very small stagger, longer duration
//       tl.to(".title-char", {
//         opacity: 1,
//         y: 0,
//         duration: 1.1,
//         stagger: { each: 0.006, from: "start" }, // almost simultaneous
//       });

//       // ✅ overlap everything so it feels like one unified reveal
//       tl.to(
//         ".right-line",
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.9,
//           stagger: { each: 0.03, from: "start" }, // still mostly together
//         },
//         "-=0.95",
//       );

//       tl.to(
//         ".cta-btn",
//         {
//           opacity: 1,
//           y: 0,
//           duration: 0.85,
//           stagger: 0.04,
//         },
//         "-=0.75",
//       );
//     },
//     { scope: container },
//   );

//   return (
//     <section
//       ref={container}
//       className="relative min-h-screen w-full overflow-hidden bg-black"
//     >
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(circle_at_70%_55%,rgba(255,255,255,0.06),transparent_60%)]" />

//       <div className="relative mx-auto flex min-h-screen w-full max-w-[1400px] flex-col px-6 pb-16 pt-36">
//         <div className="flex flex-1 flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
//           <div className="flex-1">
//             <h1 className="select-none text-[72px] font-extrabold uppercase leading-[0.85] tracking-tight text-white sm:text-[92px] md:text-[120px] lg:text-[150px]">
//               <span aria-label={titleTop}>
//                 {splitToSpans(titleTop, "title-char")}
//               </span>
//               <br />
//               <span aria-label={titleBottom}>
//                 {splitToSpans(titleBottom, "title-char")}
//               </span>
//             </h1>

//             <div className="mt-8 flex flex-wrap gap-3">
//               <Link
//                 href={ctaPrimaryHref}
//                 className="cta-btn rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
//               >
//                 {ctaPrimaryText}
//               </Link>

//               <Link
//                 href={ctaSecondaryHref}
//                 className="cta-btn rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/60"
//               >
//                 {ctaSecondaryText}
//               </Link>
//             </div>
//           </div>

//           <div className="flex flex-col gap-2 text-right -mt-18 px-45 text-lg font-light tracking-tight text-white/90 sm:text-xl">
//             {rightLines.map((line) => (
//               <p
//                 key={line}
//                 className="right-line"
//                 style={{ willChange: "transform, opacity" }}
//               >
//                 {line}
//               </p>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import HeroOrb from "./HeroOrb";

const line1 = ["We", "Build"];
const line2 = ["Digital", "Experiences"];

export default function HeroSection() {
  return (
    <section className=" relative min-h-screen flex items-center justify-center overflow-hidden ">
      <HeroOrb />

      {/* Gradient overlays */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

      <div className="relative z-10 section-padding text-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="inline-block font-body text-xs md:text-sm tracking-[0.4em] uppercase text-muted-foreground border border-border/40 rounded-full px-5 py-2">
            Web Development Agency
          </span>
        </motion.div>

        <h1 className="font-display font-semibold text-[clamp(3rem,8vw,9rem)] leading-[0.95] tracking-[-0.03em] mb-10">
          <span className="block">
            {line1.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 80, rotateX: 40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.5 + i * 0.12,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-[0.2em] text-foreground"
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span className="block">
            {line2.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 80, rotateX: 40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.74 + i * 0.12,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mr-[0.2em] text-gradient-primary"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-base md:text-lg text-muted-foreground max-w-lg mx-auto mb-14 leading-relaxed"
        >
          Crafting immersive, award-winning digital products that push
          boundaries and captivate audiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              document
                .getElementById("work")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-magnetic font-body px-10 py-4 rounded-full bg-primary text-primary-foreground text-sm tracking-wider font-medium hover:shadow-[0_8px_40px_-8px_hsl(var(--primary)/0.5)] transition-shadow duration-500"
          >
            View Our Work
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-magnetic font-body px-10 py-4 rounded-full border border-border/60 text-foreground text-sm tracking-wider font-medium hover:border-primary/40 hover:bg-primary/5 transition-all duration-500"
          >
            Start a Project
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator - outside content div */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-muted-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
