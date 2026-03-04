"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.normalizeScroll(false);
  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger };
