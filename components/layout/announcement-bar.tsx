"use client";

import { useEffect, useState } from "react";

const announcements = [
  "Buy 2, Get 1 Free — Sitewide",
  "Free Shipping Worldwide",
  "10% Off Your First Order — Subscribe Now",
];

export function AnnouncementBar() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-accent text-cream/90 text-center py-2 px-4 text-[10px] md:text-[11px] tracking-[0.3em] uppercase relative overflow-hidden">
      <div className="relative h-4">
        {announcements.map((text, i) => (
          <span
            key={i}
            className="absolute inset-0 flex items-center justify-center transition-all duration-500 font-body"
            style={{
              opacity: i === current ? 1 : 0,
              transform: i === current ? "translateY(0)" : "translateY(6px)",
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
