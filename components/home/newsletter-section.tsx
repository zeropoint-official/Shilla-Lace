"use client";

import { useRef, useEffect, useState } from "react";

export function NewsletterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");
    try {
      const res = await fetch("/api/klaviyo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section ref={ref} className="py-20 md:py-28 bg-bg">
      <div className="max-w-[560px] mx-auto px-5 md:px-10 text-center">
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="font-heading text-[clamp(1.8rem,3.5vw,2.5rem)] leading-[1.1] text-cream font-light mb-3">
            Stay in Touch
          </h2>
          <p className="text-sm text-cream/50 leading-relaxed mb-8">
            Subscribe for early access, exclusive offers, and 10% off your first order.
          </p>

          {status === "success" ? (
            <p className="text-sm text-accent-glow tracking-wide">
              Welcome to Shilla Lace. Check your inbox.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex max-w-sm mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-transparent border border-black/[0.1] px-4 py-3 text-xs text-cream placeholder:text-muted focus:outline-none focus:border-accent-glow/50 transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-accent text-white px-6 py-3 text-[11px] tracking-[0.2em] uppercase hover:bg-accent-light transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "..." : "Join"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="text-xs text-red-500 mt-3">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
