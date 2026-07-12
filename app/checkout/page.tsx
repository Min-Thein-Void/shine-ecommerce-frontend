"use client";

import React, { useEffect, useState } from "react";

function Checkout() {
  const [cart, setCart] = useState<any[]>([]);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🛒 Fetch cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:3100/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        console.log(data);
        setCart(data || []);
      } catch (err) {
        console.error("Failed to load cart", err);
      }
    };

    fetchCart();
  }, []);

  // 💰 total calculate
  const total =
    cart?.reduce(
      (sum: number, item: any) => sum + item.product.price * item.quantity,
      0,
    ) || 0;

  // 🚀 place order
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || !address) {
      return setMessage("Please fill all fields");
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("http://localhost:3100/orders/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          phone,
          address,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Order failed");
      }

      setMessage(
        "✅ Order placed successfully thanks you for purchasing our products, see ya",
      );
      setAddress("");
      setPhone("");

      // optional: clear UI cart after order
      setCart([]);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        {/* Cart Summary */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Order</h2>

            <p className="mt-1 text-sm text-gray-500">
              Review your items before checkout.
            </p>
          </div>

          {cart.length > 0 ? (
            <>
              <div className="space-y-4">
                {cart.map((item: any) => (
                  <div
                    key={item.id}
                    className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-gray-100
                    bg-gray-50
                    p-4
                  "
                  >
                    {/* Product */}
                    <div className="flex items-center gap-4">
                      {item.product.image ? (
                        <img
                          src={`http://localhost:3100/uploads/${item.product.image}`}
                          alt={item.product.name}
                          className="
                          h-16
                          w-16
                          rounded-xl
                          object-cover
                        "
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-200 text-xs text-gray-400">
                          No Image
                        </div>
                      )}

                      <div>
                        <p className="font-semibold text-gray-900">
                          {item.product.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {item.quantity} ×{" "}
                          {item.product.price.toLocaleString()} MMK
                        </p>
                      </div>
                    </div>

                    <p className="font-bold text-gray-900">
                      {(item.product.price * item.quantity).toLocaleString()}{" "}
                      MMK
                    </p>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
                <span className="text-lg font-semibold text-gray-700">
                  Total
                </span>

                <span className="text-2xl font-bold text-gray-900">
                  {total.toLocaleString()} MMK
                </span>
              </div>
            </>
          ) : (
            <div className="rounded-2xl bg-gray-50 py-12 text-center text-gray-400">
              Your cart is empty
            </div>
          )}
        </div>

        {/* Checkout Form */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Shipping Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter your delivery details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Phone Number
              </label>

              <input
                type="text"
                placeholder="09xxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="
                h-12
                w-full
                rounded-xl
                border
                border-gray-200
                px-4
                text-sm
                transition
                focus:border-black
                focus:outline-none
                focus:ring-4
                focus:ring-gray-100
              "
              />
            </div>

            {/* Address */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Delivery Address
              </label>

              <textarea
                placeholder="Enter your delivery address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="
                h-32
                w-full
                resize-none
                rounded-xl
                border
                border-gray-200
                px-4
                py-3
                text-sm
                transition
                focus:border-black
                focus:outline-none
                focus:ring-4
                focus:ring-gray-100
              "
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="
              w-full
              rounded-xl
              bg-black
              py-4
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-gray-800
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            >
              {loading ? "Processing Order..." : "Place Order"}
            </button>

            {message && (
              <p className="text-center text-sm text-gray-600">{message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
