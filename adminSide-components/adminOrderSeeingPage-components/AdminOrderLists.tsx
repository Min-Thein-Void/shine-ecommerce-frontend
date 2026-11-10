
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
import { useSearchParams } from "next/navigation";

import {
  filterOrder,
  updateOrderStatus,
} from "@/services/Order/order.service";
import { Order } from "@/types/admin/adminOrder";
import { orderStatus } from "@/types/orderStatus";
import AdminOrderFilterByTags from "./AdminOrderFilterByTags";
import AdminOrderSearchInput from "./AdminOrderSearchInput";

interface AdminOrderListsProps {
  orders: Order[];
  setOrders: Dispatch<SetStateAction<Order[]>>;
}

type OrderFilter = Order["status"] | "ALL";

function AdminOrderLists({
  orders,
  setOrders,
}: AdminOrderListsProps) {
  const [updatingOrders, setUpdatingOrders] = useState<number[]>([]);
  const [errorOrderId, setErrorOrderId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<OrderFilter>("ALL");

  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") ?? "";

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
          order.id === updatedOrder.id
            ? { ...order, status: updatedOrder.status }
            : order,
        ),
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
      setErrorOrderId(orderId);
    } finally {
      setUpdatingOrders((prev) =>
        prev.filter((id) => id !== orderId),
      );
    }
  };

  const getOrdersHandler = async (
    page: number = 1,
    searchValue: string = "",
  ) => {
    try {
      const response = await filterOrder(searchValue, page, 8);
      setOrders(response.orders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    getOrdersHandler(pageFromUrl, search);
  }, [pageFromUrl, search]);

  const filteredOrders =
    activeFilter === "ALL"
      ? orders
      : orders.filter((order) => order.status === activeFilter);

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

  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString();

  const formatTime = (date: string | Date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const renderStatusSelect = (order: Order) => {
    const isUpdating = updatingOrders.includes(order.id);

    return (
      <div className="min-w-0">
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
            <AlertCircle size={13} className="mt-0.5 shrink-0" />
            Update failed. Try again.
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-w-0 space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-gray-900">
            All Orders
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage customer orders and delivery status.
          </p>
        </div>

        <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700">
          <ShoppingBag size={16} />
          {orders.length} Orders
        </span>
      </div>

      {/* Responsive Search and Filters */}
      <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
        <div className="min-w-0 w-full">
          <AdminOrderSearchInput />
        </div>

        <div className="min-w-0 w-full overflow-x-auto pb-1">
          <AdminOrderFilterByTags
            orders={orders}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        <>
          {/* Mobile and Tablet: Order Cards */}
          <div className="grid min-w-0 grid-cols-1 gap-4 lg:hidden">
            {filteredOrders.map((order) => (
              <article
                key={order.id}
                className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3 border-b border-gray-100 bg-gray-50/70 p-4">
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Order ID
                    </p>
                    <h3 className="mt-1 text-base font-bold text-gray-900">
                      #{order.id}
                    </h3>
                  </div>

                  <span
                    className={`inline-flex max-w-[60%] items-center rounded-full px-2.5 py-1 text-center text-xs font-semibold ring-1 ring-inset ${statusStyle(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="space-y-4 p-4">
                  {/* Customer */}
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <UserRound size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="break-words text-sm font-semibold text-gray-900">
                        {order.user?.name ?? "Unknown"}
                      </p>
                      <p className="mt-1 break-all text-xs text-gray-500">
                        {order.user?.email ?? "No email"}
                      </p>
                    </div>
                  </div>

                  {/* Date and Items */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="min-w-0 rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">Order Date</p>
                      <div className="mt-2 flex items-start gap-2">
                        <CalendarDays
                          size={15}
                          className="mt-0.5 shrink-0 text-gray-400"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-800">
                            {formatDate(order.createdAt)}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {formatTime(order.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="min-w-0 rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">Items</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Package
                          size={16}
                          className="shrink-0 text-gray-400"
                        />
                        <span className="text-sm font-semibold text-gray-800">
                          {order.items?.length ?? 0} items
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-4">
                    <span className="text-sm text-gray-500">
                      Order Total
                    </span>
                    <p className="text-right text-base font-bold text-gray-900">
                      {order.total.toLocaleString()}{" "}
                      <span className="text-xs font-medium text-gray-500">
                        MMK
                      </span>
                    </p>
                  </div>

                  {/* Update Status */}
                  <div className="border-t border-gray-100 pt-4">
                    <label
                      htmlFor={`order-status-${order.id}`}
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Update Order Status
                    </label>
                    {renderStatusSelect(order)}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Desktop: Table */}
          <div className="hidden min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    {[
                      "Order",
                      "Customer",
                      "Date",
                      "Items",
                      "Total",
                      "Status",
                      "Update Status",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="whitespace-nowrap px-4 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="transition-colors hover:bg-gray-50/80"
                    >
                      <td className="whitespace-nowrap px-4 py-4">
                        <span className="font-semibold text-gray-900">
                          #{order.id}
                        </span>
                      </td>

                      <td className="max-w-60 px-4 py-4">
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

                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CalendarDays
                            size={15}
                            className="shrink-0 text-gray-400"
                          />
                          {formatDate(order.createdAt)}
                        </div>
                        <p className="mt-1 pl-6 text-xs text-gray-400">
                          {formatTime(order.createdAt)}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-2.5 py-1.5 text-sm font-medium text-gray-700">
                          <Package size={14} />
                          {order.items?.length ?? 0}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-right">
                        <span className="text-sm font-bold text-gray-900">
                          {order.total.toLocaleString()}
                        </span>
                        <span className="ml-1 text-xs text-gray-500">
                          MMK
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${statusStyle(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="min-w-[190px] px-4 py-4">
                        {renderStatusSelect(order)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="flex flex-col gap-2 border-t border-gray-200 bg-gray-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
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

          {/* Mobile and Tablet Footer */}
          <p className="text-sm text-gray-500 lg:hidden">
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
        </>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white px-4 py-12 text-center sm:py-16">
          <div className="mx-auto flex size-14 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
            <Package size={28} />
          </div>

          <h3 className="mt-4 text-lg font-bold text-gray-900">
            No Orders Found
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
            Customer orders will appear here when available.
          </p>
        </div>
      )}
    </div>
  );
}

export default AdminOrderLists;
