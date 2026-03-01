"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  speed?: number;
};

export function HorizontalScroll({ children, className, speed = 1 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const scrollWidth =
      scrollRef.current.scrollWidth - containerRef.current.offsetWidth;

    const tl = gsap.to(scrollRef.current, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: () => `+=${scrollWidth * speed}`,
        scrub: 1,
        pin: false,
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <div ref={scrollRef} className="flex gap-6 will-change-transform">
        {children}
      </div>
    </div>
  );
}
