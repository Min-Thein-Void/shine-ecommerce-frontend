"use client";
import AdminOrderLists from "@/adminSide-components/adminOrderSeeingPage-components/AdminOrderLists";
import AdminOrderPageHeader from "@/adminSide-components/adminOrderSeeingPage-components/AdminOrderPageHeader";
import { getOrders } from "@/services/Order/order.service";
import { Order } from "@/types/admin/adminOrder";
import { useEffect, useState } from "react";

export default function AdminOrdersSeeingPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const getOrdersHandler = async () => {
    const data = await getOrders(); //service
    setOrders(data);
    if (!data) {
      setMessage("No Orders Data found");
    }
    setLoading(false);
  };

  useEffect(() => {
    getOrdersHandler();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-20">Loading Orders...</div>;
  }

  return (
    <div>
      {/* Header */}
      <AdminOrderPageHeader orders={orders} />

      {/* Error */}
      {message && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
          {message}
        </div>
      )}

      {/* Orders */}
      <AdminOrderLists orders={orders} setOrders={setOrders} />
    </div>
  );
}
