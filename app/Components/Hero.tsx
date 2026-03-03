"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import HeroOrb from "./HeroOrb";

const line1 = ["We", "Build"];
const line2 = ["Digital", "Experiences"];

export default function HeroSection() {
  const whatsappNumber = "+923442667537";
  const whatsappMessage =
    "Hi Webcrest, I want to start a project. Please share your process and available time slots.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="bg-background relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <HeroOrb />

      {/* Gradient overlays */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

      <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 lg:px-16 text-center max-w-6xl mx-auto pt-24 pb-28 sm:pt-28 sm:pb-32">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 sm:mb-8"
        >
          <span className="inline-block font-body text-[10px] sm:text-xs md:text-sm tracking-[0.35em] uppercase text-muted-foreground border border-border/40 rounded-full px-4 sm:px-5 py-1.5 sm:py-2">
            Web Development Agency
          </span>
        </motion.div>

        {/* Headline */}
        <h1
          className="font-display font-semibold leading-[0.92] tracking-[-0.03em] mb-8 sm:mb-10
          text-[clamp(3.2rem,13vw,9rem)]"
        >
          <span className="block">
            {line1.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 60, rotateX: 40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.5 + i * 0.12,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-[0.18em] text-foreground"
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span className="block">
            {line2.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 60, rotateX: 40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.74 + i * 0.12,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-[0.18em] text-gradient-primary"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-sm sm:text-base md:text-lg text-muted-foreground max-w-xs sm:max-w-sm md:max-w-lg mx-auto mb-10 sm:mb-14 leading-relaxed"
        >
          Crafting immersive, award-winning digital products that push
          boundaries and captivate audiences.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="flex flex-col xs:flex-row sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("app:scroll-to", {
                  detail: { target: "#work", offset: -20 },
                }),
              )
            }
            className="btn-magnetic w-full xs:w-auto sm:w-auto font-body px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm tracking-wider font-medium hover:shadow-[0_8px_40px_-8px_hsl(var(--primary)/0.5)] transition-shadow duration-500"
          >
            View Our Work
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              window.open(whatsappUrl, "_blank", "noopener,noreferrer")
            }
            className="btn-magnetic cursor-pointer w-full xs:w-auto sm:w-auto font-body px-8 sm:px-10 py-3.5 sm:py-4 rounded-full border border-border/60 text-foreground text-xs sm:text-sm tracking-wider font-medium hover:border-primary/40 hover:bg-primary/5 transition-all duration-500"
          >
            Start a Project
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
1