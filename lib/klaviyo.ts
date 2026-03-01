/**
 * Track a Klaviyo event on the client side.
 * Requires Klaviyo's public API key to be loaded.
 */
export function trackEvent(eventName: string, properties: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  // If Klaviyo JS SDK is loaded on the page
  const _learnq = (window as unknown as Record<string, unknown>)._learnq as unknown[];
  if (_learnq) {
    _learnq.push(["track", eventName, properties]);
  }
}

export function identifyUser(email: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const _learnq = (window as unknown as Record<string, unknown>)._learnq as unknown[];
  if (_learnq) {
    _learnq.push(["identify", { $email: email, ...properties }]);
  }
}

export function trackViewedProduct(product: {
  title: string;
  id: string;
  url: string;
  imageUrl: string;
  price: number;
}) {
  trackEvent("Viewed Product", {
    ProductName: product.title,
    ProductID: product.id,
    URL: product.url,
    ImageURL: product.imageUrl,
    Price: product.price,
  });
}

export function trackAddedToCart(item: {
  title: string;
  id: string;
  price: number;
  quantity: number;
  url: string;
  imageUrl: string;
}) {
  trackEvent("Added to Cart", {
    $value: item.price * item.quantity,
    AddedItemProductName: item.title,
    AddedItemProductID: item.id,
    AddedItemPrice: item.price,
    AddedItemQuantity: item.quantity,
    AddedItemURL: item.url,
    AddedItemImageURL: item.imageUrl,
  });
}
