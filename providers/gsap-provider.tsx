"use client";

import { useEffect, type ReactNode } from "react";
import { ScrollTrigger } from "@/lib/gsap/config";

export function GSAPProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    ScrollTrigger.defaults({ toggleActions: "play none none none" });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}
