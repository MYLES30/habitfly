"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type CartItem = {
  productId: string;
  quantity: number;
};

type CartContextValue = {
  quantity: number;
  items: CartItem[];
  removedItems: CartItem[];
  addToCart: (productId: string, amount?: number) => void;
  setItemQuantity: (productId: string, nextQuantity: number) => void;
  removeItem: (productId: string) => void;
  restoreItem: (productId: string) => void;
  clearRemovedItems: () => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [removedItems, setRemovedItems] = useState<CartItem[]>([]);

  const quantity = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);

  function addToCart(productId: string, amount = 1) {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (!existing) {
        return [...prev, { productId, quantity: amount }];
      }
      return prev.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + amount } : item
      );
    });

    setRemovedItems((prev) => prev.filter((item) => item.productId !== productId));
  }

  function setItemQuantity(productId: string, nextQuantity: number) {
    const normalizedQuantity = Math.max(1, Math.min(100, nextQuantity));
    setItems((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity: normalizedQuantity } : item))
    );
  }

  function removeItem(productId: string) {
    const target = items.find((item) => item.productId === productId);
    if (!target) {
      return;
    }

    setItems((prev) => prev.filter((item) => item.productId !== productId));
    setRemovedItems((prev) => {
      const removedExisting = prev.find((item) => item.productId === productId);
      if (!removedExisting) {
        return [...prev, target];
      }
      return prev.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + target.quantity } : item
      );
    });
  }

  function restoreItem(productId: string) {
    const target = removedItems.find((item) => item.productId === productId);
    if (!target) {
      return;
    }

    setRemovedItems((prev) => prev.filter((item) => item.productId !== productId));
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (!existing) {
        return [...prev, target];
      }
      return prev.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + target.quantity } : item
      );
    });
  }

  function clearCart() {
    setRemovedItems([]);
    setItems([]);
  }

  function clearRemovedItems() {
    setRemovedItems([]);
  }

  const value = useMemo(
    () => ({ quantity, items, removedItems, addToCart, setItemQuantity, removeItem, restoreItem, clearRemovedItems, clearCart }),
    [quantity, items, removedItems, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
