"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
}

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: Product;
}

interface User {
  id: number;
  name: string | null;
  email: string;
}

interface Order {
  id: number;
  total: number;
  phone: string;
  address: string;
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  createdAt: string;
  user: User;
  items: OrderItem[];
}

export default function AdminOrdersSeeingPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3100/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setOrders(data);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status: Order["status"]) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";

      case "SHIPPED":
        return "bg-purple-100 text-purple-700";

      case "DELIVERED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        Loading Orders...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Orders
        </h1>

        <span className="rounded-lg bg-orange-100 px-4 py-2 font-semibold text-orange-700">
          Total Orders : {orders.length}
        </span>
      </div>

      {message && (
        <div className="mb-5 rounded-lg bg-red-100 p-4 text-red-600">
          {message}
        </div>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl border bg-white shadow-sm"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between border-b p-5">
              <div>
                <h2 className="text-xl font-bold">
                  Order #{order.id}
                </h2>

                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${statusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            {/* Customer */}
            <div className="grid gap-4 border-b p-5 md:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">
                  Customer
                </p>

                <p className="font-semibold">
                  {order.user.name ?? "Unknown"}
                </p>

                <p className="text-gray-500">
                  {order.user.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Phone
                </p>

                <p>{order.phone}</p>

                <p className="mt-2 text-sm text-gray-500">
                  Address
                </p>

                <p>{order.address}</p>
              </div>
            </div>

            {/* Products */}
            <div className="border-b p-5">
              <h3 className="mb-4 font-semibold">
                Ordered Products
              </h3>

              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                  >
                    <div>
                      <p className="font-medium">
                        {item.product.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty : {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between p-5">
              <h2 className="text-xl font-bold text-green-600">
                Total : ${order.total.toFixed(2)}
              </h2>

              <button className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700">
                Update Status
              </button>
            </div>
          </div>
        ))}

        {!orders.length && (
          <div className="rounded-xl border bg-white py-20 text-center text-gray-500">
            No Orders Found
          </div>
        )}
      </div>
    </div>
  );
}