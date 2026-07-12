"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  image?: string;
  price: number;
}

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: Product;
}

interface Order {
  id: number;
  total: number;
  phone: string;
  address: string;
  status: "PENDING" | "CONFIRMED" | "DELIVERING" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  items: OrderItem[];
}

export default function MyOrdersHistory() {
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const getMyOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Please login first.");
        return;
      }

      const res = await fetch("http://localhost:3100/orders/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setMyOrders(data);
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyOrders();
  }, []);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";

      case "DELIVERING":
        return "bg-purple-100 text-purple-700";

      case "DELIVERED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          My Orders
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          View your purchase history and order status.
        </p>
      </div>

      {/* Error */}
      {message && (
        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
          {message}
        </div>
      )}

      {/* Empty */}
      {!message && myOrders.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50 py-24">
          <div className="mb-5 text-6xl">📦</div>

          <h2 className="text-2xl font-semibold text-gray-900">
            No Orders Yet
          </h2>

          <p className="mt-2 text-gray-500">
            Start shopping and your orders will appear here.
          </p>

          <Link
            href="/products"
            className="mt-8 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Browse Products
          </Link>
        </div>
      )}

      {/* Orders */}
      <div className="space-y-8">
        {myOrders.map((order) => (
          <div
            key={order.id}
            className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
          >
            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-gray-100 bg-gray-50 px-7 py-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Order #{order.id}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
                  order.status,
                )}`}
              >
                {order.status}
              </span>
            </div>

            {/* Body */}
            <div className="grid gap-6 p-7 md:grid-cols-3">
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {order.phone}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Delivery Address</p>
                <p className="mt-1 font-medium text-gray-900">
                  {order.address}
                </p>
              </div>

              <div className="md:text-right">
                <p className="text-sm text-gray-500">Order Total</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {order.total.toLocaleString()} MMK
                </p>
              </div>
            </div>

            {/* Products */}
            <div className="border-t border-gray-100 px-7 py-6">
              <h3 className="mb-5 text-lg font-semibold text-gray-900">
                Ordered Items
              </h3>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 transition hover:bg-white"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {item.product.name}
                      </h4>

                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="text-lg font-bold text-gray-900">
                      {(item.price * item.quantity).toLocaleString()} MMK
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
