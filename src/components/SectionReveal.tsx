"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION_EASE } from "@/lib/motion";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export default function SectionReveal({
  children,
  className,
  delay = 0,
  y = 28,
}: SectionRevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      gsap.set(root.current, { clearProps: "all" });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(
        root.current,
        { y },
        {
          y: 0,
          delay,
          duration: 0.76,
          ease: MOTION_EASE,
          scrollTrigger: {
            trigger: root.current,
            start: "top 86%",
            once: true,
          },
        }
      );
    }, root);

    return () => context.revert();
  }, [delay, y]);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
