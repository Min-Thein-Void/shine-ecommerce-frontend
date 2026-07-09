"use client";

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
    <div className="max-w-5xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {message && (
        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-600">
          {message}
        </div>
      )}

      {!message && myOrders.length === 0 && (
        <div className="rounded-xl border p-10 text-center">
          <h2 className="text-xl font-semibold">No Orders Yet</h2>

          <p className="text-gray-500 mt-2">You haven't placed any orders.</p>
        </div>
      )}

      <div className="space-y-5">
        {myOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h2 className="font-semibold text-lg">Order #{order.id}</h2>

                <p className="text-gray-500 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  order.status,
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div>
                <p className="text-gray-500 text-sm">Phone</p>

                <p className="font-medium">{order.phone}</p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Total</p>

                <p className="font-semibold text-green-600">
                  ${order.total.toFixed(2)}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="text-gray-500 text-sm">Delivery Address</p>

                <p>{order.address}</p>
              </div>
            </div>
            <div className="mt-6 border-t pt-5">
              <h3 className="font-semibold mb-3">Ordered Products</h3>

              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center rounded-lg bg-gray-50 p-3"
                  >
                    <div>
                      <p className="font-medium">{item.product.name}</p>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold text-green-600">
                      ${(item.price * item.quantity).toFixed(2)}
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
