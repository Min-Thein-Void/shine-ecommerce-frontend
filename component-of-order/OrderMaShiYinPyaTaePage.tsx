import { Order } from "@/types/Order";
import Link from "next/link";

interface OrderDataProps {
  myOrders: Order[];
}

function OrderMaShiYinPyaTaePage({ myOrders }: OrderDataProps) {
  return (
    <>
      {myOrders.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50 py-24">
          <div className="mb-5 text-6xl">📦</div>

          <h2 className="text-2xl font-semibold text-gray-900">
            No Orders Yet
          </h2>

          <p className="mt-2 text-gray-500">
            Start shopping and your orders will appear here.
          </p>

          <Link
            href="/products"
            className="mt-8 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Browse Products
          </Link>
        </div>
      )}
    </>
  );
}

export default OrderMaShiYinPyaTaePage;
