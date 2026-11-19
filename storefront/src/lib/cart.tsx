"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type BoxPick = {
  handle: string;
  title: string;
  image: string;
};

export type CartLine = {
  id: string;
  kind: "product" | "box";
  handle: string;
  title: string;
  image: string;
  quantity: number;
  /** Present when kind === "box" — the nine chosen bars. */
  boxItems?: BoxPick[];
};

type CartContextValue = {
  lines: CartLine[];
  ready: boolean;
  itemCount: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addProduct: (item: Omit<CartLine, "id" | "kind" | "quantity" | "boxItems"> & {
    quantity?: number;
  }) => void;
  addBox: (picks: BoxPick[]) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeLine: (id: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "choccor-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);

function uid() {
  return `line_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setLines(parsed);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* quota / private mode */
    }
  }, [lines, ready]);

  const addProduct = useCallback(
    (
      item: Omit<CartLine, "id" | "kind" | "quantity" | "boxItems"> & {
        quantity?: number;
      }
    ) => {
      const qty = Math.max(1, item.quantity ?? 1);
      setLines((prev) => {
        const existing = prev.find(
          (l) => l.kind === "product" && l.handle === item.handle
        );
        if (existing) {
          return prev.map((l) =>
            l.id === existing.id
              ? { ...l, quantity: l.quantity + qty }
              : l
          );
        }
        return [
          ...prev,
          {
            id: uid(),
            kind: "product",
            handle: item.handle,
            title: item.title,
            image: item.image,
            quantity: qty,
          },
        ];
      });
      setDrawerOpen(true);
    },
    []
  );

  const addBox = useCallback((picks: BoxPick[]) => {
    setLines((prev) => [
      ...prev,
      {
        id: uid(),
        kind: "box",
        handle: "build-a-box",
        title: "Build Your Own Box (9 bars)",
        image: picks[0]?.image || "/products/build-your-own-bar-milk.webp",
        quantity: 1,
        boxItems: picks,
      },
    ]);
    setDrawerOpen(true);
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, quantity } : l))
        .filter((l) => l.quantity > 0)
    );
  }, []);

  const removeLine = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      ready,
      itemCount,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      toggleDrawer: () => setDrawerOpen((v) => !v),
      addProduct,
      addBox,
      setQuantity,
      removeLine,
      clear,
    }),
    [
      lines,
      ready,
      itemCount,
      drawerOpen,
      addProduct,
      addBox,
      setQuantity,
      removeLine,
      clear,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
