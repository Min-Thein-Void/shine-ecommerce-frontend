import { Order } from "@/types/Order";

interface OrderListProps {
  myOrders: Order[];
}

function OrderHistroyList({ myOrders }: OrderListProps) {
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
    <div className="space-y-8">
      {myOrders.map((order) => (
        <div
          key={order.id}
          className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
        >
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-gray-100 bg-gray-50 px-7 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Order #{order.id}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
                order.status,
              )}`}
            >
              {order.status}
            </span>
          </div>

          {/* Body */}
          <div className="grid gap-6 p-7 md:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="mt-1 font-semibold text-gray-900">{order.phone}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Delivery Address</p>
              <p className="mt-1 font-medium text-gray-900">{order.address}</p>
            </div>

            <div className="md:text-right">
              <p className="text-sm text-gray-500">Order Total</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {order.total.toLocaleString()} MMK
              </p>
            </div>
          </div>

          {/* Products */}
          <div className="border-t border-gray-100 px-7 py-6">
            <h3 className="mb-5 text-lg font-semibold text-gray-900">
              Ordered Items
            </h3>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 transition hover:bg-white"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {item.product.name}
                    </h4>

                    <p className="mt-1 text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="text-lg font-bold text-gray-900">
                    {(item.price * item.quantity).toLocaleString()} MMK
                  </p>
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
