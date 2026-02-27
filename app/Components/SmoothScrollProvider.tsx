"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onScrollTo = (event: Event) => {
      const customEvent = event as CustomEvent<{
        target?: string | number | HTMLElement;
        offset?: number;
        immediate?: boolean;
      }>;

      const {
        target,
        offset = 0,
        immediate = false,
      } = customEvent.detail || {};
      if (!target) return;

      lenis.scrollTo(target, {
        offset,
        duration: immediate ? 0 : 1.1,
      });
    };

    window.addEventListener("app:scroll-to", onScrollTo as EventListener);

    const update = (time: number) => {
      lenis.raf(time * 1000); // GSAP ticker is seconds; Lenis expects ms
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("app:scroll-to", onScrollTo as EventListener);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
