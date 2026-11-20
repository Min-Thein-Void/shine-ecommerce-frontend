import { Order } from "@/types/Order";

interface OrderListProps {
  myOrders: Order[];
  onDeleteOrder: (orderId: number) => void;
}

function OrderHistroyList({ myOrders, onDeleteOrder }: OrderListProps) {
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

  return (
    <div className="space-y-6">
      {myOrders.map((order) => (
        <div
          key={order.id}
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
        >
          {/* Order Header */}
          <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Order Number
                </p>
                <h2 className="mt-1 text-lg font-bold text-gray-900">
                  #{order.id}
                </h2>
              </div>

              <div className="hidden h-9 w-px bg-gray-200 sm:block" />

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Order Date
                </p>
                <p className="mt-1 text-sm font-medium text-gray-700">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`w-fit rounded-full px-4 py-2 text-xs font-bold ${getStatusColor(
                  order.status,
                )}`}
              >
                {order.status}
              </span>

              <button
                onClick={() => {
                  const confirmed = window.confirm(
                    `Are you sure you want to delete Order #${order.id}?`,
                  );

                  if (confirmed) {
                    onDeleteOrder(order.id);
                  }
                }}
                className="rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
              >
                Delete Order
              </button>
            </div>
          </div>

          {/* Order Information */}
          <div className="grid grid-cols-1 gap-5 bg-gray-50/70 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                    d="M3 5h18v14H3z M7 9h10 M7 13h6"
                  />
                </svg>
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-400">
                  Phone Number
                </p>
                <p className="mt-1 break-all text-sm font-semibold text-gray-800">
                  {order.phone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-gray-500 shadow-sm">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                    d="M12 21s7-5.5 7-12a7 7 0 1 0-14 0c0 6.5 7 12 7 12z"
                  />
                  <circle cx="12" cy="9" r="2.2" strokeWidth="1.7" />
                </svg>
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-400">
                  Delivery Address
                </p>
                <p className="mt-1 wrap-break-word text-sm font-semibold text-gray-800">
                  {order.address}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-4 sm:col-span-2 lg:col-span-1 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <div>
                <p className="text-xs font-medium text-gray-400">Order Total</p>
                <p className="mt-1 text-xl font-extrabold text-gray-900">
                  {order.total.toLocaleString()}{" "}
                  <span className="text-sm font-semibold text-gray-500">
                    MMK
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Ordered Products */}
          <div className="p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">Ordered Items</h3>

              <span className="text-xs font-medium text-gray-400">
                {order.items.length}{" "}
                {order.items.length === 1 ? "Product" : "Products"}
              </span>
            </div>

            <div className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex min-w-0 items-center gap-3 py-4 first:pt-0 last:pb-0 sm:gap-5"
                >
                  {/* Product Image */}
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 sm:h-20 sm:w-20">
                    {item.product.image ? (
                      <img
                        src={`http://localhost:3100/uploads/${item.product.image}`}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
                      {item.product.name}
                    </h4>

                    <p className="mt-1 text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {item.price.toLocaleString()} MMK / item
                    </p>
                  </div>

                  {/* Subtotal */}
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold text-gray-900 sm:text-base">
                      {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <p className="text-xs font-medium text-gray-400">MMK</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderHistroyList;
