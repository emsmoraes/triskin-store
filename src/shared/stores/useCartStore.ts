import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateId } from "../utils/generateId";

export interface CartItem {
  cartItemId: string;
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity" | "cartItemId">, quantity?: number) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

const isSameProduct = (a: CartItem, b: Omit<CartItem, "quantity" | "cartItemId">): boolean =>
  a.id === b.id &&
  a.title === b.title &&
  a.price === b.price &&
  a.image === b.image;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find((i) => isSameProduct(i, item));

        if (existingItem) {
          set({
            items: items.map((i) =>
              isSameProduct(i, item)
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          set({
            items: [...items, { ...item, quantity, cartItemId: generateId() }],
          });
        }
      },

      removeItem: (cartItemId) => {
        set({ items: get().items.filter((i) => i.cartItemId !== cartItemId) });
      },

      updateQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartItemId);
        } else {
          set({
            items: get().items.map((i) =>
              i.cartItemId === cartItemId ? { ...i, quantity } : i
            ),
          });
        }
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
      },
    }),
    { name: "cart-storage" }
  )
);
