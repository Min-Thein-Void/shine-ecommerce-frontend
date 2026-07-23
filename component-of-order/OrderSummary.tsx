import { CartItem } from "@/types/cart";
import OrderItems from "./OrderItems";

interface OrderSummaryProps {
  cart: CartItem[];
  total: number;
}

function OrderSummary({ cart, total }: OrderSummaryProps) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Order</h2>

        <p className="mt-1 text-sm text-gray-500">
          Review your items before checkout.
        </p>
      </div>

      {cart.length > 0 ? (
        <>
          <div className="space-y-4">
            {cart.map((orderItem: CartItem) => (
              <OrderItems key={orderItem.id} orderItem={orderItem} />
            ))}
          </div>

          {/* Total */}
          <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
            <span className="text-lg font-semibold text-gray-700">Total</span>

            <span className="text-2xl font-bold text-gray-900">
              {total.toLocaleString()} MMK
            </span>
          </div>
        </>
      ) : (
        <div className="rounded-2xl bg-gray-50 py-12 text-center text-gray-400">
          Your cart is empty
        </div>
      )}
    </div>
  );
}

export default OrderSummary;
