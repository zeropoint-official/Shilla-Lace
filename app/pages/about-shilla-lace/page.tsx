import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Redefining intimacy with luxurious lingerie. Celebrating confidence and embracing individuality since 2021.",
};

const values = [
  {
    title: "Premium Fabrics",
    description:
      "Hand-selected lace, silk, and leather sourced for their luxurious feel and lasting quality.",
  },
  {
    title: "Thoughtful Design",
    description:
      "Every piece is carefully crafted to flatter, empower, and celebrate the female form.",
  },
  {
    title: "European Craftsmanship",
    description:
      "Blending time-honoured European techniques with contemporary elegance and modern sensibility.",
  },
  {
    title: "For Every Body",
    description:
      "Luxury lingerie should celebrate every body. Our designs are made to make every woman feel extraordinary.",
  },
];

const promises = [
  {
    title: "Discreet Shipping",
    description: "Plain packaging with no branding on the outside. Your privacy is our priority.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-6 h-6">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    title: "Worldwide Delivery",
    description: "Shipping to 50+ countries. Free express shipping on orders over $75.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: "Easy Returns",
    description: "Not the perfect fit? We make returns simple and hassle-free.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-6 h-6">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
    ),
  },
  {
    title: "Secure Checkout",
    description: "Your information is protected with industry-standard encryption.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-6 h-6">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70svh] md:h-[80svh] min-h-[480px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/Upscaled/upscalemedia-transformed (2).png"
            alt="Shilla Lace editorial"
            fill
            className="object-cover"
            sizes="100vw"
            quality={85}
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent hidden md:block" />

        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10 w-full pb-14 md:pb-20">
            <p className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-cream/45 mb-4 font-body">
              Our Story
            </p>
            <h1 className="font-heading text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] text-cream font-light">
              Redefining
              <br />
              <span className="italic text-cream/65">Intimacy</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28 bg-bg">
        <div className="max-w-[800px] mx-auto px-5 md:px-10 text-center">
          <div className="w-10 h-px bg-accent mx-auto mb-8" />
          <blockquote className="font-heading text-xl md:text-2xl lg:text-3xl italic text-cream/60 leading-relaxed mb-8">
            &ldquo;Every woman deserves to feel beautiful, powerful, and
            unapologetically herself.&rdquo;
          </blockquote>
          <p className="text-sm md:text-base text-cream/45 leading-relaxed max-w-xl mx-auto">
            Founded in 2021, Shilla Lace is dedicated to celebrating confidence
            and embracing individuality. Each piece in our collection is
            thoughtfully designed to empower women to express their sensuality
            with elegance and style.
          </p>
        </div>
      </section>

      {/* Story with image */}
      <section className="py-16 md:py-24 bg-bg-elevated">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/Upscaled/upscalemedia-transformed (1).png"
                alt="Shilla Lace — candlelit red lace editorial"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={75}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated/30 to-transparent" />
            </div>

            <div className="lg:pl-4">
              <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent-light mb-4 font-body">
                Celebrating Confidence Since 2021
              </p>
              <h2 className="font-heading text-3xl md:text-4xl text-cream font-light leading-[1.1] mb-8">
                From Delicate Lace
                <br />
                <span className="italic text-cream/60">to Bold Leather</span>
              </h2>
              <div className="space-y-5 max-w-lg">
                <p className="text-sm text-cream/45 leading-relaxed">
                  What began as a vision to create lingerie that truly empowers
                  has grown into a collection that women across the world trust
                  to make them feel extraordinary. Based in Cyprus, we draw
                  inspiration from European craftsmanship and the modern woman
                  who refuses to compromise.
                </p>
                <p className="text-sm text-cream/45 leading-relaxed">
                  Every creation is crafted to make every moment an experience of
                  beauty, passion, and unapologetic self-expression. From the
                  delicate stitching to the thoughtful packaging, no detail is
                  overlooked.
                </p>
                <p className="text-sm text-cream/45 leading-relaxed">
                  We believe that the most beautiful details are the ones closest
                  to the skin &mdash; and that luxury should never be a
                  compromise, but a celebration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-bg">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-[10px] tracking-[0.35em] uppercase text-accent-light mb-3 font-body">
              What We Stand For
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-cream font-light italic">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {values.map((value, i) => (
              <div key={i} className="text-center">
                <span className="block text-[10px] tracking-[0.3em] text-cream/20 font-body mb-4 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-6 h-px bg-accent/40 mx-auto mb-5" />
                <h3 className="font-heading text-lg md:text-xl text-cream font-light mb-3">
                  {value.title}
                </h3>
                <p className="text-[13px] text-cream/40 leading-relaxed max-w-[260px] mx-auto">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width image break */}
      <section className="relative h-[50svh] md:h-[60svh] min-h-[360px] overflow-hidden">
        <Image
          src="/Upscaled/upscalemedia-transformed (5).png"
          alt="Shilla Lace editorial"
          fill
          className="object-cover"
          sizes="100vw"
          quality={80}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-heading text-2xl md:text-4xl italic text-white/80 text-center px-5">
            &ldquo;Every piece is an invitation to feel
            <br className="hidden md:block" /> extraordinary in your own
            skin.&rdquo;
          </p>
        </div>
      </section>

      {/* The Promise */}
      <section className="py-20 md:py-28 bg-bg-elevated">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-[10px] tracking-[0.35em] uppercase text-accent-light mb-3 font-body">
              The Shilla Lace Promise
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-cream font-light italic">
              Our Commitment to You
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {promises.map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-accent/60 mb-4 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="font-heading text-lg text-cream font-light mb-2">
                  {item.title}
                </h3>
                <p className="text-[13px] text-cream/40 leading-relaxed max-w-[260px] mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-bg">
        <div className="max-w-[600px] mx-auto px-5 md:px-10 text-center">
          <div className="w-10 h-px bg-accent mx-auto mb-8" />
          <h2 className="font-heading text-2xl md:text-3xl text-cream font-light italic mb-4">
            Ready to Feel Extraordinary?
          </h2>
          <p className="text-sm text-cream/40 mb-8 max-w-md mx-auto">
            Explore our collections and discover pieces crafted to celebrate
            your confidence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/collections/new-in"
              className="group relative inline-flex items-center justify-center h-11 px-9 bg-accent text-white text-[9px] tracking-[0.25em] uppercase overflow-hidden transition-all duration-700 hover:bg-accent-light w-full sm:w-auto max-w-[220px]"
            >
              Shop New In
            </Link>
            <Link
              href="/collections/lingerie"
              className="group inline-flex items-center gap-2.5 text-[9px] tracking-[0.25em] uppercase text-cream/40 hover:text-cream/80 transition-colors duration-500 font-body"
            >
              View All Collections
              <span className="block w-5 h-px bg-current transition-all duration-500 group-hover:w-8" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
