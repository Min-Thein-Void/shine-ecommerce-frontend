import { updateOrderStatus } from "@/services/Order/order.service";
import { Order } from "@/types/admin/adminOrder";
import { orderStatus } from "@/types/orderStatus";
import { Dispatch, SetStateAction } from "react";

interface adminOrderListsProps {
  orders: Order[];
  setOrders: Dispatch<SetStateAction<Order[]>>; //adminOrderSeeingPage ka nay emit lote htar tar
}

function AdminOrderLists({ orders, setOrders }: adminOrderListsProps) {
  const updateOrderStatusHandler = async (
    orderId: number,
    status: orderStatus,
  ) => {
    const updatedOrder = await updateOrderStatus(orderId, status); //service
    setOrders((prev) =>
      prev.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order,
      ),
    );
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

  return (
    <>
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
                  updateOrderStatusHandler(
                    order.id,
                    e.target.value as orderStatus,
                  )
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
    </>
  );
}

export default AdminOrderLists;
