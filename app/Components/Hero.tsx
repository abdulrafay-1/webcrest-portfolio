"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, MessageCircle, X } from "lucide-react";
import HeroOrb from "./HeroOrb";
import Image from "next/image";
import { openCalendlyPopup } from "@/app/lib/calendly";

const line1 = ["We", "Build"];
const line2 = ["Digital", "Experiences"];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showOrb, setShowOrb] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    if (typeof IntersectionObserver === "undefined") {
      setShowOrb(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowOrb(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.01,
      },
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const whatsappNumber = "+923442667537";
  const whatsappMessage =
    "Hi Webcrest, I want to start a project. Please share your process and available time slots.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const calendlyUrl = "https://calendly.com/webcrestllc/30min";

  return (
    <section
      ref={sectionRef}
      className="bg-background relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {showOrb ? <HeroOrb /> : null}

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
          text-[clamp(2.6rem,9.2vw,7rem)] xl:text-[clamp(3rem,7.8vw,7.5rem)]"
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
                className="mr-[0.18em] text-gradient-primary"
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
            onClick={() => openCalendlyPopup({ url: calendlyUrl })}
            className="group relative overflow-hidden btn-magnetic cursor-pointer w-full xs:w-auto sm:w-auto font-body px-8 sm:px-10 py-3.5 sm:py-4 rounded-full border border-border/60 text-foreground text-xs sm:text-sm tracking-wider font-medium hover:border-primary/40 transition-all duration-500"
            aria-label="Open Calendly booking modal"
          >
            {/* Text */}
            <span className="pointer-events-none relative z-10 transition-colors duration-300 group-hover:text-white">
              Start a Project
            </span>

            {/* Liquid Hover Fill */}
            <span className="pointer-events-none hidden md:block md:absolute left-0 h-[120%] md:bottom-[-11.5vh] w-full scale-[1.2] rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:bottom-0" />
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
      {/* WhatsApp Floating Popover */}
      {/* WhatsApp Floating Popover */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
        {/* Popover Panel */}
        <AnimatePresence>
          {whatsappOpen && (
            <motion.div
              key="whatsapp-popover"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="origin-bottom-right"
            >
              <div className="w-72 rounded-2xl bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl p-5">
                <h3 className="font-display text-sm font-semibold text-foreground mb-2">
                  Start a Conversation
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  Have a project in mind? Let’s discuss your requirements and
                  timeline.
                </p>

                <button
                  onClick={() =>
                    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
                  }
                  className="w-full rounded-full bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-3 transition-all duration-300"
                >
                  Chat on WhatsApp
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setWhatsappOpen((prev) => !prev)}
          className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] flex items-center justify-center transition-all duration-300"
        >
          {whatsappOpen ? (
            <X size={22} />
          ) : (
            <Image
              src="/whatsapp.png"
              alt="whatsapp icon"
              width={120}
              height={120}
            />
          )}
        </motion.button>
      </div>
    </section>
  );
}
