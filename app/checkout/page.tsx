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
        console.log(data)
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


      setMessage("✅ Order placed successfully thanks you for purchasing our products, see ya");
      setAddress("")
      setPhone("")

      // optional: clear UI cart after order
      setCart([]);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        {/* 🛒 CART SUMMARY */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Your Order</h2>

          {cart.length > 0 ? (
            <>
              {cart.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b py-4"
                >
                  {/* LEFT: IMAGE + INFO */}
                  <div className="flex items-center gap-3">
                    {/* 🖼️ Product Image */}
                    <img
                      src={`http://localhost:3100/uploads/${item.product.image}`}
                      alt={item.product.name}
                      className="w-14 h-14 object-cover rounded-lg border"
                    />

                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} × {item.product.price}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT: PRICE */}
                  <p className="font-semibold">
                    {item.product.price * item.quantity}
                  </p>
                </div>
              ))}

              {/* 💰 TOTAL */}
              <div className="flex justify-between mt-6 text-lg font-bold">
                <span>Total</span>
                <span>{total} MMK</span>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Your cart is empty</p>
          )}
        </div>

        {/* 📦 CHECKOUT FORM */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">Shipping Info</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* PHONE */}
            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="text"
                placeholder="09xxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* ADDRESS */}
            <div>
              <label className="block mb-1 font-medium">Address</label>
              <textarea
                placeholder="Enter your address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>

            {/* MESSAGE */}
            {message && <p className="text-center text-sm">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
