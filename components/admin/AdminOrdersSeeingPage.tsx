"use client";

import { orderStatus } from "@/types/orderStatus";
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

  const updateOrderStatus = async (orderID: number, status: orderStatus) => {
    try {
      const res = await fetch(
        `http://localhost:3100/orders/${orderID}/status`,
        {
          method: "PATCH",

          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status,
          }),
        },
      );

      const data = await res.json();
      const updatedOrder = data;
      setOrders((prev) =>
        prev.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20">Loading Orders...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Orders
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage customer orders and update delivery status.
          </p>
        </div>

        <div className="rounded-full border border-gray-200 bg-gray-50 px-5 py-2 text-sm font-semibold text-gray-700">
          Total Orders: <span className="text-black">{orders.length}</span>
        </div>
      </div>

      {/* Error */}
      {message && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
          {message}
        </div>
      )}

      {/* Orders */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 bg-gray-50 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Order #{order.id}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${statusColor(
                  order.status,
                )}`}
              >
                {order.status}
              </span>
            </div>

            {/* Customer Info */}
            <div className="grid gap-6 border-b border-gray-100 p-6 md:grid-cols-2">
              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Customer
                </p>

                <p className="font-semibold text-gray-900">
                  {order?.user?.name ?? "Unknown"}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {order?.user?.email}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Delivery Information
                </p>

                <p className="font-medium text-gray-900">{order?.phone}</p>

                <p className="mt-2 text-sm text-gray-600">{order?.address}</p>
              </div>
            </div>

            {/* Products */}
            <div className="border-b border-gray-100 p-6">
              <h3 className="mb-5 text-lg font-semibold text-gray-900">
                Ordered Products
              </h3>

              <div className="space-y-3">
                {order?.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">
                        {item.product.name}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-bold text-gray-900">
                      {(item.price * item.quantity).toLocaleString()} MMK
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-500">Order Total</p>

                <p className="text-2xl font-bold text-gray-900">
                  {order.total.toLocaleString()} MMK
                </p>
              </div>

              <select
                value={order.status}
                onChange={(e) =>
                  updateOrderStatus(order.id, e.target.value as orderStatus)
                }
                className="
                          rounded-xl
                          border
                          border-gray-300
                          bg-white
                          px-4
                          py-3
                          text-sm
                          font-medium
                          text-gray-700
                          outline-none
                          transition
                          focus:border-black
                          focus:ring-2
                          focus:ring-gray-200
                        "
              >
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="SHIPPED">Shipped</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>
        ))}

        {!orders.length && (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 py-24 text-center">
            <div className="mb-4 text-5xl">📦</div>

            <h2 className="text-xl font-semibold text-gray-900">
              No Orders Found
            </h2>

            <p className="mt-2 text-gray-500">
              Customer orders will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
