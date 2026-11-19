import { CartPage } from "@/components/cart/CartPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cart",
  description: "Your Choccor cart — prices marked TBC until retail pricing is confirmed.",
  path: "/cart/",
  noIndex: true,
});

export default function CartRoute() {
  return <CartPage />;
}
