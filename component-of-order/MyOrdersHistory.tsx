"use client";

import OrderHeader from "@/component-of-order/OrderHeader";
import OrderHistroyList from "@/component-of-order/OrderHistroyList";
import OrderMaShiYinPyaTaePage from "@/component-of-order/OrderMaShiYinPyaTaePage";
import { getMyOrders } from "@/services/Order/order.service";
import { Order } from "@/types/Order";
import { useEffect, useState } from "react";

export default function MyOrdersHistory() {
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const getOrdersHandler = async () => {
    setLoading(true);
    const data = await getMyOrders();
    if (data.length === 0 || !data) {
      setMessage("No data return from backend");
    }
    setMyOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    getOrdersHandler();
  }, []);

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
      <OrderHeader />

      {/* Error */}
      {message && (
        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
          {message}
        </div>
      )}

      {/* Empty */}
      <OrderMaShiYinPyaTaePage myOrders={myOrders} />

      {/* Orders */}
      <OrderHistroyList myOrders={myOrders} />
    </div>
  );
}
