const items = [
  "Free Worldwide Shipping",
  "Buy 2, Get 1 Free",
  "Discreet Packaging",
  "Easy Returns",
  "Premium Quality",
  "Secure Checkout",
];

export function TrustBar() {
  const duplicated = [...items, ...items];

  return (
    <div className="border-y border-black/[0.04] py-4 overflow-hidden bg-bg">
      <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
        {duplicated.map((item, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="text-[10px] tracking-[0.25em] uppercase text-cream/70 px-6 md:px-10">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-accent/70 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
