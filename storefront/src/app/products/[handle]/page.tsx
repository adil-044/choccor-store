import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { PRODUCTS, relatedProducts } from "@/lib/catalog";
import {
  getStorefrontProduct,
  withLocalAssetPaths,
  type StorefrontProduct,
} from "@/lib/medusa";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = PRODUCTS.find((p) => p.handle === handle);
  if (!product) return {};
  return pageMetadata({
    title: product.title,
    description: product.description,
    path: `/products/${product.handle}/`,
    image: product.image,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getStorefrontProduct(handle);
  if (!product) notFound();

  const related = relatedProducts(handle, 4).map(withLocalAssetPaths);
  const gallery = buildGallery(product, related);

  return (
    <ProductDetail product={product} related={related} gallery={gallery} />
  );
}

function buildGallery(
  product: StorefrontProduct,
  related: StorefrontProduct[]
) {
  const items = [{ src: product.image, alt: product.imageAlt }];
  for (const shot of product.gallery ?? []) {
    if (items.length >= 4) break;
    if (!items.some((i) => i.src === shot.src)) {
      items.push({ src: shot.src, alt: shot.alt });
    }
  }
  for (const p of related) {
    if (items.length >= 4) break;
    if (!items.some((i) => i.src === p.image)) {
      items.push({ src: p.image, alt: p.imageAlt });
    }
  }
  return items;
}
