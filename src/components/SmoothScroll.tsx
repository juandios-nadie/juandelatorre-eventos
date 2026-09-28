"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    let lenis: Lenis | null = null;

    const updateScrollTrigger = () => ScrollTrigger.update();
    const tick = (time: number) => lenis?.raf(time * 1000);

    const stop = () => {
      gsap.ticker.remove(tick);
      lenis?.off("scroll", updateScrollTrigger);
      lenis?.destroy();
      lenis = null;
    };

    const start = () => {
      if (motionQuery.matches || lenis) return;

      lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
      });
      lenis.on("scroll", updateScrollTrigger);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();
    };

    const handlePreferenceChange = () => {
      stop();
      start();
      ScrollTrigger.refresh();
    };

    start();
    motionQuery.addEventListener("change", handlePreferenceChange);

    return () => {
      motionQuery.removeEventListener("change", handlePreferenceChange);
      stop();
    };
  }, []);

  return children;
}
