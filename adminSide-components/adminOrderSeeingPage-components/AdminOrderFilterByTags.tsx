"use client";

import { Order } from "@/types/admin/adminOrder";
import { Dispatch, SetStateAction } from "react";

type OrderFilter = Order["status"] | "ALL";

interface AdminOrdersProps {
  orders: Order[];
  activeFilter: OrderFilter;
  setActiveFilter: Dispatch<SetStateAction<OrderFilter>>;
}

function AdminOrderFilterByTags({
  orders,
  activeFilter,
  setActiveFilter,
}: AdminOrdersProps) {
  const getFilterCount = (status: OrderFilter) => {
    return status === "ALL"
      ? orders.length
      : orders.filter((order) => order.status === status).length;
  };

  const orderFilterTags: { label: string; value: OrderFilter }[] = [
    { label: "all", value: "ALL" },
    { label: "pending", value: "PENDING" },
    { label: "confirmed", value: "CONFIRMED" },
    { label: "shipped", value: "SHIPPED" },
    { label: "delivered", value: "DELIVERED" },
    { label: "cancelled", value: "CANCELLED" },
  ];

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {orderFilterTags.map((tab) => {
          const isActive = activeFilter === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveFilter(tab.value)}
              className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-gray-900 bg-gray-900 text-white shadow-sm"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {tab.label}

              <span
                className={`rounded-md px-1.5 py-0.5 text-xs font-semibold ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {getFilterCount(tab.value)}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

export default AdminOrderFilterByTags;
