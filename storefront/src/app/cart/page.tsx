import { CartPage } from "@/components/cart/CartPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cart",
  description: "Your Choccor cart.",
  path: "/cart/",
  noIndex: true,
});

export default function CartRoute() {
  return <CartPage />;
}
