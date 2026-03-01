import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const headersList = await headers();
  const secret = headersList.get("x-shopify-hmac-sha256");

  if (
    process.env.SHOPIFY_REVALIDATION_SECRET &&
    secret !== process.env.SHOPIFY_REVALIDATION_SECRET
  ) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const body = await req.json();
  const topic = headersList.get("x-shopify-topic") || "";

  const collectionWebhooks = [
    "collections/create",
    "collections/delete",
    "collections/update",
  ];
  const productWebhooks = [
    "products/create",
    "products/delete",
    "products/update",
  ];

  if (collectionWebhooks.includes(topic) || productWebhooks.includes(topic)) {
    revalidateTag("collections", "max");
    revalidateTag("products", "max");
  }

  if (collectionWebhooks.includes(topic)) {
    revalidateTag(`collection-${body.handle}`, "max");
  }

  if (productWebhooks.includes(topic)) {
    revalidateTag(`product-${body.handle}`, "max");
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
