"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
};

export function TextReveal({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    hasAnimated.current = true;

    const text = ref.current.textContent || "";
    const words = text.split(/\s+/).filter(Boolean);

    ref.current.innerHTML = words
      .map(
        (word, i) =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:0.05em"><span style="display:inline-block;transform:translateY(110%)">${word}</span></span>${i < words.length - 1 ? " " : ""}`
      )
      .join("");

    const innerSpans = ref.current.querySelectorAll(
      "span > span"
    );

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      onEnter: () => {
        gsap.to(innerSpans, {
          y: 0,
          duration: 0.9,
          delay,
          stagger: 0.04,
          ease: "power3.out",
        });
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [delay]);

  return (
    <Tag ref={ref as React.RefObject<never>} className={cn(className)}>
      {children}
    </Tag>
  );
}
