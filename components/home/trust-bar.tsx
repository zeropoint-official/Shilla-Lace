"use client";

const items = [
  { icon: "✦", text: "Free Shipping Over $75" },
  { icon: "✦", text: "Buy 2, Get 1 Free" },
  { icon: "✦", text: "Discreet Packaging" },
  { icon: "✦", text: "Premium Quality" },
  { icon: "✦", text: "Worldwide Delivery" },
  { icon: "✦", text: "Easy Returns" },
];

export function TrustBar() {
  const doubled = [...items, ...items];

  return (
    <div className="relative bg-bg-elevated border-y border-cream/5 overflow-hidden py-3.5">
      <div
        className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]"
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-8 md:px-12"
          >
            <span className="text-accent-light text-[8px]">{item.icon}</span>
            <span className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-cream/50 font-body">
              {item.text}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
