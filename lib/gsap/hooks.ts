"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "./config";

export function useScrollReveal<T extends HTMLElement>(
  options: {
    y?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    start?: string;
    childSelector?: string;
  } = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const {
      y = 60,
      opacity = 0,
      duration = 1,
      delay = 0,
      stagger = 0.1,
      start = "top 85%",
      childSelector,
    } = options;

    const targets = childSelector
      ? ref.current.querySelectorAll(childSelector)
      : ref.current;

    gsap.set(targets, { y, opacity });

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start,
      onEnter: () => {
        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration,
          delay,
          stagger,
          ease: "power3.out",
        });
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [options]);

  return ref;
}

export function useParallax<T extends HTMLElement>(speed: number = 0.5) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const tl = gsap.to(ref.current, {
      yPercent: speed * 20,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [speed]);

  return ref;
}

export function useTextReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const words = ref.current.innerText.split(" ");
    ref.current.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full">${word}</span></span>`
      )
      .join(" ");

    const spans = ref.current.querySelectorAll(
      "span > span"
    ) as NodeListOf<HTMLElement>;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      onEnter: () => {
        gsap.to(spans, {
          y: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: "power3.out",
        });
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return ref;
}
