import { cn } from "@/lib/utils";

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="mb-10 md:mb-14">
          <div className="h-3 w-20 bg-cream/5 rounded mb-3 animate-pulse" />
          <div className="h-10 w-56 bg-cream/5 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 lg:gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-cream/5 mb-3" />
      <div className="h-3 bg-cream/5 rounded w-3/4 mb-2" />
      <div className="h-3 bg-cream/5 rounded w-1/3" />
    </div>
  );
}

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse bg-cream/5 rounded", className)}
      {...props}
    />
  );
}
