"use client";
import AdminOrderLists from "@/adminSide-components/adminOrderSeeingPage-components/AdminOrderLists";
import AdminOrderPageHeader from "@/adminSide-components/adminOrderSeeingPage-components/AdminOrderPageHeader";
import { filterOrder } from "@/services/Order/order.service";
import { Order } from "@/types/admin/adminOrder";
import { useEffect, useState } from "react";
import AdminOrderPanginationWrapper from "./AdminOrderPanginationWrapper";
import { useSearchParams } from "next/navigation";

export default function AdminOrdersSeeingPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchParams = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page")) || 1;

  const getOrdersHandler = async (page: number = 1) => {
    try {
      setLoading(true);
      setMessage("");

      const response = await filterOrder("", page, 8);

      setOrders(response.orders);
      setCurrentPage(response.meta.page);
      setTotalPages(response.meta.totalPages);

      if (response.orders.length === 0) {
        setMessage("No Orders Data found");
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setMessage("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrdersHandler(pageFromUrl);
  }, [pageFromUrl]);

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
      {/* Pangination */}
      <AdminOrderPanginationWrapper
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
