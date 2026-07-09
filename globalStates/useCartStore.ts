import { create } from "zustand";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  setCart: (backendresponse: CartItem[]) => void;
  addToCart: (product: CartItem) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  setCart: (backendresponse) => set({ cart: backendresponse }),
  addToCart: async (product) => {
    // 1. UI update
    set((state) => {
      const existing = state.cart.find((i) => i.id === product.id);

      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
      };
    });

    // 2. backend sync
    try {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:3100/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });
    } catch (err) {
      console.error("Sync failed", err);
    }
  },
}));
