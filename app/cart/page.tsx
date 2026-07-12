"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image?: string | null;
  };
}

function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await fetch("http://localhost:3100/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setCart(data);
    };

    fetchCart();
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const clearCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const res = await fetch("http://localhost:3100/cart/clear", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to clear cart");
      }

      setCart([]);

      alert("Cart cleared!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Shopping Cart
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Review your items before checkout.
          </p>
        </div>

        {cart.length > 0 && (
          <button
            onClick={() => clearCart()}
            className="rounded-xl border border-red-200 px-5 py-2 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50 active:scale-95"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50 py-24">
          <div className="mb-5 text-6xl">🛒</div>

          <h2 className="text-2xl font-semibold text-gray-900">
            Your cart is empty
          </h2>

          <p className="mt-2 text-gray-500">
            Looks like you haven't added anything yet.
          </p>

          <Link
            href="/products"
            className="mt-8 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Cart Items */}
          <div className="space-y-5">
            {cart.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.product.id}`}
                className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:border-gray-300 hover:shadow-lg"
              >
                {/* Left */}
                <div className="flex items-center gap-5">
                  {item.product.image ? (
                    <img
                      src={`http://localhost:3100/uploads/${item.product.image}`}
                      alt={item.product.name}
                      className="h-24 w-24 rounded-xl object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-400">
                      No Image
                    </div>
                  )}

                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {item.product.name}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      {item.product.price.toLocaleString()} MMK
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="text-right">
                  <div className="mb-4 inline-flex rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                    Qty {item.quantity}
                  </div>

                  <p className="text-xl font-bold text-gray-900">
                    {(item.product.price * item.quantity).toLocaleString()} MMK
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Summary */}
          <div className="h-fit rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>

            <div className="my-6 space-y-4 border-y border-gray-100 py-6">
              <div className="flex items-center justify-between text-gray-600">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex items-center justify-between text-lg font-semibold text-gray-900">
                <span>Total</span>
                <span>{total.toLocaleString()} MMK</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="flex w-full items-center justify-center rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/products"
              className="mt-3 flex w-full items-center justify-center rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
