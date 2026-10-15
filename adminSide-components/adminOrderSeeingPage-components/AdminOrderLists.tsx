"use client";

import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import {
  AlertCircle,
  CalendarDays,
  Loader2,
  Package,
  ShoppingBag,
  UserRound,
} from "lucide-react";

import { filterOrder, updateOrderStatus } from "@/services/Order/order.service";
import { Order } from "@/types/admin/adminOrder";
import { orderStatus } from "@/types/orderStatus";
import AdminOrderFilterByTags from "./AdminOrderFilterByTags";
import AdminOrderSearchInput from "./AdminOrderSearchInput";
import { useSearchParams } from "next/navigation";

interface AdminOrderListsProps {
  orders: Order[];
  setOrders: Dispatch<SetStateAction<Order[]>>;
}

type OrderFilter = Order["status"] | "ALL";

function AdminOrderLists({ orders, setOrders }: AdminOrderListsProps) {
  const [updatingOrders, setUpdatingOrders] = useState<number[]>([]);
  const [errorOrderId, setErrorOrderId] = useState<number | null>(null);

  const updateOrderStatusHandler = async (
    orderId: number,
    status: orderStatus,
  ) => {
    if (updatingOrders.includes(orderId)) return;

    setUpdatingOrders((prev) => [...prev, orderId]);
    setErrorOrderId(null);

    try {
      const updatedOrder = await updateOrderStatus(orderId, status);

      setOrders((prev) =>
        prev.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order,
        ),
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
      setErrorOrderId(orderId);
    } finally {
      setUpdatingOrders((prev) => prev.filter((id) => id !== orderId));
    }
  };

  const statusStyle = (status: Order["status"]) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-50 text-amber-700 ring-amber-600/20";
      case "CONFIRMED":
        return "bg-blue-50 text-blue-700 ring-blue-600/20";
      case "SHIPPED":
        return "bg-violet-50 text-violet-700 ring-violet-600/20";
      case "DELIVERED":
        return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
      case "CANCELLED":
        return "bg-red-50 text-red-700 ring-red-600/20";
      default:
        return "bg-gray-100 text-gray-700 ring-gray-500/20";
    }
  };

  //order filter by tags
  const [activeFilter, setActiveFilter] = useState<OrderFilter>("ALL");
  const filteredOrders =
    activeFilter === "ALL"
      ? orders
      : orders.filter((order) => order.status === activeFilter);
  //order filter by tags

  //order filter by name 
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await filterOrder(search);

        console.log("Search keyword:", search);
        console.log("Orders response:", data);

        setOrders(data);
      } catch (error) {
        console.error("Failed to load orders:", error);
      }
    };
    loadOrders();
  }, [search]);
  //order filter by name 

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">All Orders</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage customer orders and delivery status.
          </p>
        </div>

        <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700">
          <ShoppingBag size={16} />
          {orders.length} Orders
        </span>
      </div>

      {/* Order Status Filters */}
      <div className="flex justify-between">
        <AdminOrderSearchInput />
        <AdminOrderFilterByTags
          orders={orders}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </div>

      {/* Orders Table */}
      {filteredOrders.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-262.5 text-left">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Order
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Customer
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Date
                  </th>
                  <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Items
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Total
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Update Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => {
                  const isUpdating = updatingOrders.includes(order.id);

                  return (
                    <tr
                      key={order.id}
                      className="transition-colors hover:bg-gray-50/80"
                    >
                      {/* Order ID */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="font-semibold text-gray-900">
                          #{order.id}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="max-w-60 px-5 py-4">
                        <div className="flex items-start gap-3">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <UserRound size={17} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-900">
                              {order.user?.name ?? "Unknown"}
                            </p>
                            <p className="mt-1 truncate text-xs text-gray-500">
                              {order.user?.email ?? "No email"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CalendarDays
                            size={15}
                            className="shrink-0 text-gray-400"
                          />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                        <p className="mt-1 pl-6 text-xs text-gray-400">
                          {new Date(order.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </td>

                      {/* Items */}
                      <td className="whitespace-nowrap px-5 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-2.5 py-1.5 text-sm font-medium text-gray-700">
                          <Package size={14} />
                          {order.items?.length ?? 0}
                        </span>
                      </td>

                      {/* Total */}
                      <td className="whitespace-nowrap px-5 py-4 text-right">
                        <span className="text-sm font-bold text-gray-900">
                          {order.total.toLocaleString()}
                        </span>
                        <span className="ml-1 text-xs text-gray-500">MMK</span>
                      </td>

                      {/* Current Status */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${statusStyle(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      {/* Update Status */}
                      <td className="min-w-47.5 px-5 py-4">
                        <div className="relative">
                          <select
                            aria-label={`Update status for order ${order.id}`}
                            value={order.status}
                            disabled={isUpdating}
                            onChange={(e) =>
                              updateOrderStatusHandler(
                                order.id,
                                e.target.value as orderStatus,
                              )
                            }
                            className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-9 text-sm font-medium text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <option value="PENDING">Pending</option>
                            <option value="CONFIRMED">Confirmed</option>
                            <option value="SHIPPED">Shipped</option>
                            <option value="DELIVERED">Delivered</option>
                            <option value="CANCELLED">Cancelled</option>
                          </select>

                          {isUpdating && (
                            <Loader2
                              size={15}
                              className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-blue-600"
                            />
                          )}
                        </div>

                        {errorOrderId === order.id && (
                          <p
                            role="alert"
                            className="mt-2 flex items-start gap-1 text-xs text-red-600"
                          >
                            <AlertCircle
                              size={13}
                              className="mt-0.5 shrink-0"
                            />
                            Update failed. Try again.
                          </p>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 bg-gray-50 px-5 py-3">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {filteredOrders.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700">
                {orders.length}
              </span>{" "}
              orders
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white px-4 py-16 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
            <Package size={28} />
          </div>

          <h3 className="mt-4 text-lg font-bold text-gray-900">
            No Orders Found
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Customer orders will appear here when available.
          </p>
        </div>
      )}
    </div>
  );
}

export default AdminOrderLists;
