import { CartItem } from "@/types/cart";

interface OrderItemProps {
  orderItem: CartItem;
}

function OrderItems({ orderItem }: OrderItemProps) {
  return (
    <div
      key={orderItem.id}
      className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-gray-100
                    bg-gray-50
                    p-4
                  "
    >
      {/* Product */}
      <div className="flex items-center gap-4">
        {orderItem.product.image ? (
          <img
            src={`http://localhost:3100/uploads/${orderItem.product.image}`}
            alt={orderItem.product.name}
            className="
                          h-16
                          w-16
                          rounded-xl
                          object-cover
                        "
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-200 text-xs text-gray-400">
            No Image
          </div>
        )}

        <div>
          <p className="font-semibold text-gray-900">
            {orderItem.product.name}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {orderItem.quantity} × {orderItem.product.price.toLocaleString()}{" "}
            MMK
          </p>
        </div>
      </div>

      <p className="font-bold text-gray-900">
        {(orderItem.product.price * orderItem.quantity).toLocaleString()} MMK
      </p>
    </div>
  );
}

export default OrderItems;
