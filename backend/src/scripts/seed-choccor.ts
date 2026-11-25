/**
 * Seed Choccor Gourmet Chocolates catalog into Medusa v2.
 *
 *   npx medusa exec ./src/scripts/seed-choccor.ts
 *
 * All variant amounts are PLACEHOLDER values (1 cent) and must never be shown
 * as retail prices. The storefront displays "Price TBC" instead.
 *
 * Requires a running Postgres database configured via DATABASE_URL.
 */
import type { ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createSalesChannelsWorkflow,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows";

type SeedProduct = {
  title: string;
  handle: string;
  description: string;
  category: string;
  thumbnail: string;
  metadata: Record<string, unknown>;
};

const PLACEHOLDER_AMOUNT = 1; // 1 cent — never display as retail

const PRODUCTS: SeedProduct[] = [
  {
    title: "Baileys Dream",
    handle: "baileys-dream",
    description:
      "One of Courtney's favourites for Baileys lovers — smooth chocolate with a dreamy cream finish.",
    category: "Chocolates",
    thumbnail: "/products/baileys-dream.webp",
    metadata: {
      price_placeholder: true,
      price_label: "Price TBC",
      ingredients: ["Choco", "Baileys", "Butter", "Vanilla"],
      homepage_section: "featured",
    },
  },
  {
    title: "Mango Madness",
    handle: "mango-madness",
    description:
      "Bright mango puree folded into handmade chocolate — a tropical sweet moment.",
    category: "Chocolates",
    thumbnail: "/products/mango-madness.webp",
    metadata: {
      price_placeholder: true,
      price_label: "Price TBC",
      ingredients: ["Mango Puree", "Choco", "Butter", "Vanilla"],
      homepage_section: "featured",
    },
  },
  {
    title: "Chocormint",
    handle: "mint-chocolate",
    description:
      "Cool mint meets rich chocolate. Display name pending final confirmation.",
    category: "Chocolates",
    thumbnail: "/products/mint-chocolate.webp",
    metadata: {
      price_placeholder: true,
      price_label: "Price TBC",
      homepage_section: "featured",
      open_question: "Confirm whether the retail name is Chocormint or Mint Chocolate.",
    },
  },
  {
    title: "Pistachio Almond Bar",
    handle: "pistachio-almond-bar",
    description: "A nutty handmade chocolate bar with pistachio and almond.",
    category: "Bars",
    thumbnail: "/products/pistachio-almond-bar.webp",
    metadata: {
      price_placeholder: true,
      price_label: "Price TBC",
      homepage_section: "featured",
    },
  },
  {
    title: "Pistachio Chocolate",
    handle: "pistachio-chocolate",
    description: "Handmade pistachio chocolate.",
    category: "Chocolates",
    thumbnail: "/products/pistachio-chocolate.webp",
    metadata: {
      price_placeholder: true,
      price_label: "Price TBC",
      homepage_section: "featured",
    },
  },
  {
    title: "Coconut and Almond",
    handle: "coconut-and-almond",
    description: "Coconut and almond in Courtney's handmade chocolate.",
    category: "Chocolates",
    thumbnail: "/products/coconut-and-almond.webp",
    metadata: {
      price_placeholder: true,
      price_label: "Price TBC",
      homepage_section: "featured",
    },
  },
  {
    title: "Choccor Protein Bites",
    handle: "protein-bites",
    description: "Handmade chocolate protein bites — a sweet, satisfying bite.",
    category: "Bites",
    thumbnail: "/products/protein-bites.webp",
    metadata: {
      price_placeholder: true,
      price_label: "Price TBC",
      homepage_section: "featured",
    },
  },
  {
    title: "Chocolate Tray",
    handle: "chocolate-tray",
    description:
      "A generous handmade chocolate tray made for celebrations, parties, and thoughtful gifts.",
    category: "Trays",
    thumbnail: "/products/chocolate-tray.webp",
    metadata: {
      price_placeholder: true,
      price_label: "Price TBC",
      homepage_section: "tray",
    },
  },
  {
    title: "Berry Rush",
    handle: "juice-berry-rush",
    description: "Choccor natural juice — Berry Rush.",
    category: "Juices",
    thumbnail: "/products/juice-berry-rush.webp",
    metadata: {
      price_placeholder: true,
      price_label: "Price TBC",
      homepage_section: "juices",
    },
  },
  {
    title: "Avocado Boost",
    handle: "juice-avocado-boost",
    description: "Choccor natural juice — Avocado Boost.",
    category: "Juices",
    thumbnail: "/products/juice-avocado-boost.webp",
    metadata: {
      price_placeholder: true,
      price_label: "Price TBC",
      homepage_section: "juices",
    },
  },
  {
    title: "Peanut Punch",
    handle: "juice-peanut-punch",
    description: "Choccor natural juice — Peanut Punch.",
    category: "Juices",
    thumbnail: "/products/juice-peanut-punch.webp",
    metadata: {
      price_placeholder: true,
      price_label: "Price TBC",
      homepage_section: "juices",
    },
  },
  {
    title: "Build Your Own Bar — Milk",
    handle: "build-your-own-bar-milk",
    description:
      "Build Your Own Bar in milk chocolate. Box sets are 9 bars in each.",
    category: "Custom",
    thumbnail: "/products/build-your-own-bar-milk.webp",
    metadata: {
      price_placeholder: true,
      price_label: "Price TBC",
      homepage_section: "byob",
      example_only: true,
      open_question:
        "Confirm whether the milk Build Your Own Bar photo needs a more specific SKU name.",
    },
  },
  {
    title: "Build Your Own Bar — Half & Half",
    handle: "build-your-own-bar-half-and-half",
    description:
      "Build Your Own Bar half & half. Box sets are 9 bars in each.",
    category: "Custom",
    thumbnail: "/products/build-your-own-bar-half-and-half.webp",
    metadata: {
      price_placeholder: true,
      price_label: "Price TBC",
      homepage_section: "byob",
      example_only: true,
      open_question:
        "Confirm whether the half & half Build Your Own Bar photo needs a more specific SKU name.",
    },
  },
];

export default async function seedChoccor({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const salesChannelModule = container.resolve(Modules.SALES_CHANNEL);
  const storeModule = container.resolve(Modules.STORE);
  const fulfillmentModule = container.resolve(Modules.FULFILLMENT);

  logger.info("Seeding Choccor catalog…");

  let [defaultSalesChannel] = await salesChannelModule.listSalesChannels({
    name: "Default Sales Channel",
  });

  if (!defaultSalesChannel) {
    const { result } = await createSalesChannelsWorkflow(container).run({
      input: {
        salesChannelsData: [{ name: "Default Sales Channel" }],
      },
    });
    defaultSalesChannel = result[0];
  }

  const [store] = await storeModule.listStores();
  if (store) {
    await updateStoresWorkflow(container).run({
      input: {
        selector: { id: store.id },
        update: {
          name: "Choccor Gourmet Chocolates",
          supported_currencies: [{ currency_code: "cad", is_default: true }],
          default_sales_channel_id: defaultSalesChannel.id,
        },
      },
    });
  }

  const shippingProfiles = await fulfillmentModule.listShippingProfiles({
    type: "default",
  });
  const shippingProfile = shippingProfiles[0];

  const categoryNames = [...new Set(PRODUCTS.map((p) => p.category))];
  const { data: existingCategories } = await query.graph({
    entity: "product_category",
    fields: ["id", "name", "handle"],
  });

  const existingByName = new Map(
    (existingCategories || []).map((c: { name: string; id: string }) => [
      c.name,
      c.id,
    ])
  );

  const missingCategories = categoryNames.filter((n) => !existingByName.has(n));
  if (missingCategories.length) {
    const { result } = await createProductCategoriesWorkflow(container).run({
      input: {
        product_categories: missingCategories.map((name) => ({
          name,
          is_active: true,
        })),
      },
    });
    for (const cat of result) {
      existingByName.set(cat.name, cat.id);
    }
  }

  const { data: existingProducts } = await query.graph({
    entity: "product",
    fields: ["id", "handle"],
  });
  const existingHandles = new Set(
    (existingProducts || []).map((p: { handle: string }) => p.handle)
  );

  const toCreate = PRODUCTS.filter((p) => !existingHandles.has(p.handle));
  if (!toCreate.length) {
    logger.info("Choccor products already present — nothing to seed.");
    return;
  }

  await createProductsWorkflow(container).run({
    input: {
      products: toCreate.map((product) => ({
        title: product.title,
        handle: product.handle,
        description: product.description,
        status: ProductStatus.PUBLISHED,
        thumbnail: product.thumbnail,
        images: [{ url: product.thumbnail }],
        category_ids: [existingByName.get(product.category)!].filter(Boolean),
        shipping_profile_id: shippingProfile?.id,
        options: [{ title: "Default", values: ["One Size"] }],
        variants: [
          {
            title: "Default",
            sku: `CHOC-${product.handle.toUpperCase()}`,
            options: { Default: "One Size" },
            prices: [
              {
                amount: PLACEHOLDER_AMOUNT,
                currency_code: "cad",
              },
            ],
            metadata: {
              price_placeholder: true,
              price_label: "Price TBC",
            },
          },
        ],
        sales_channels: [{ id: defaultSalesChannel.id }],
        metadata: product.metadata,
      })),
    },
  });

  logger.info(`Seeded ${toCreate.length} Choccor products (prices PLACEHOLDER).`);
}
