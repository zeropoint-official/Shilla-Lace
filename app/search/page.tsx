import type { Metadata } from "next";
import { getProducts } from "@/lib/shopify";
import { SearchResults } from "@/components/search/search-results";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Shilla Lace lingerie collections.",
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const query = (resolvedParams.q as string) || "";
  const sortKey = (resolvedParams.sort as string) || "RELEVANCE";
  const reverse = resolvedParams.order === "desc";

  const products = query
    ? await getProducts({ query, sortKey, reverse })
    : await getProducts({ sortKey: "BEST_SELLING" });

  return <SearchResults products={products} query={query} />;
}
