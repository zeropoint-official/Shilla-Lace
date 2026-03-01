"use client";

import { useRef, useEffect, type ReactNode, type ElementType } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  as?: ElementType;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 1,
  y = 60,
  stagger = 0,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const targets = stagger
      ? ref.current.children
      : ref.current;

    gsap.set(targets, { y, opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      onEnter: () => {
        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration,
          delay,
          stagger: stagger || 0,
          ease: "power3.out",
        });
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [delay, duration, y, stagger]);

  return (
    <Tag ref={ref as React.RefObject<never>} className={cn(className)}>
      {children}
    </Tag>
  );
}
