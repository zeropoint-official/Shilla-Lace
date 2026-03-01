"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  containerClassName?: string;
  speed?: number;
  sizes?: string;
  priority?: boolean;
};

export function ParallaxImage({
  src,
  alt,
  width,
  height,
  fill = true,
  className,
  containerClassName,
  speed = 0.3,
  sizes,
  priority = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const tl = gsap.to(imageRef.current, {
      yPercent: speed * 20,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
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

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden", containerClassName)}
    >
      <div ref={imageRef} className="w-full h-full scale-110">
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          className={cn("object-cover", className)}
          sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
          priority={priority}
        />
      </div>
    </div>
  );
}
