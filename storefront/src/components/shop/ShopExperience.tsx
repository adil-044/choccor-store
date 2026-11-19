"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductTile } from "@/components/ui/ProductTile";
import {
  filterShopProducts,
  type ShopFilter,
} from "@/lib/catalog";
import type { StorefrontProduct } from "@/lib/medusa";

const FILTERS: { id: ShopFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "chocolates", label: "Chocolates" },
  { id: "juices", label: "Juices" },
  { id: "trays", label: "Trays / Boxes" },
];

type SortKey = "featured" | "name-asc" | "name-desc";

function filterFromSearch(): ShopFilter {
  if (typeof window === "undefined") return "all";
  const v = new URLSearchParams(window.location.search).get("filter");
  if (v === "chocolates" || v === "juices" || v === "trays") return v;
  return "all";
}

export function ShopExperience({ products }: { products: StorefrontProduct[] }) {
  const [filter, setFilter] = useState<ShopFilter>("all");
  const [sort, setSort] = useState<SortKey>("featured");

  useEffect(() => {
    setFilter(filterFromSearch());
  }, []);

  const visible = useMemo(() => {
    const filtered = filterShopProducts(products, filter);
    const sorted = [...filtered];
    if (sort === "name-asc") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "name-desc") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    }
    return sorted;
  }, [products, filter, sort]);

  function selectFilter(next: ShopFilter) {
    setFilter(next);
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("filter");
    else url.searchParams.set("filter", next);
    window.history.replaceState({}, "", url.toString());
  }

  return (
    <div className="border-b border-[var(--line)]">
      <div className="container-choc section-pad !pb-10">
        <p className="eyebrow">Collection</p>
        <h1 className="display-lg mt-3">Shop</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
          Real Choccor products only. Retail pricing shows as Price TBC until
          confirmed.
        </p>

        <div className="mt-10 flex flex-col gap-4 border-y border-[var(--line)] py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Category">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                data-active={filter === f.id}
                className="option-card !rounded-md !px-3 !py-2 text-[11px] uppercase tracking-[0.16em]"
                onClick={() => selectFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-3 text-sm text-muted">
            <span className="label-caps !normal-case tracking-[0.12em]">Sort</span>
            <select
              className="field-input w-auto py-2"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
            >
              <option value="featured">Featured</option>
              <option value="name-asc">Name A–Z</option>
              <option value="name-desc">Name Z–A</option>
            </select>
          </label>
        </div>

        <p className="mt-6 text-sm text-muted">
          {visible.length} product{visible.length === 1 ? "" : "s"}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6">
          {visible.map((product, i) => (
            <ProductTile key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
      </div>
    </div>
  );
}
