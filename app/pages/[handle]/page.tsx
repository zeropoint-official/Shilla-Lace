import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPage } from "@/lib/shopify";

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const page = await getPage(handle);

  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary?.slice(0, 160),
  };
}

export default async function CMSPage({ params }: Props) {
  const { handle } = await params;
  const page = await getPage(handle);

  if (!page) notFound();

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-4xl md:text-5xl mb-10 text-center">
          {page.title}
        </h1>
        <div
          className="prose prose-sm max-w-none text-muted leading-relaxed"
          dangerouslySetInnerHTML={{ __html: page.body }}
        />
      </div>
    </div>
  );
}
