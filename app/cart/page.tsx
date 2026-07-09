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
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-8">🛒 Your Cart</h1>
        {cart.length > 0 && (
          <button
            onClick={() => clearCart()}
            className="-mt-5 text-red-500 border-2 px-1 py-0.5 rounded-2xl font-semibold active:scale-95"
          >
            Clear 🛒
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <Link
                href={`/product/${item.product.id}`}
                key={item.id}
                className="flex items-center justify-between bg-white shadow-sm border rounded-xl p-4"
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  {item.product.image ? (
                    <img
                      src={`http://localhost:3100/uploads/${item.product.image}`}
                      className="w-16 h-16 object-cover rounded-lg"
                      alt={item.product.name}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-lg text-xs text-gray-500">
                      No Image
                    </div>
                  )}

                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      ${item.product.price}
                    </p>
                  </div>
                </div>

                {/* Middle */}
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-500 ml-2">Qty:</span>
                  <span className="font-semibold mr-2">{item.quantity}</span>
                </div>

                {/* Right */}
                <div className="text-right">
                  <p className="font-bold text-blue-600">
                    ${item.product.price * item.quantity}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Total Section */}
          <div className="mt-8 border-t pt-6 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Total</h2>
            <p className="text-2xl font-bold text-blue-600">${total}</p>
          </div>

          {/* Checkout Button */}
          <button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition">
            <Link href="/checkout">Checkout</Link>
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
