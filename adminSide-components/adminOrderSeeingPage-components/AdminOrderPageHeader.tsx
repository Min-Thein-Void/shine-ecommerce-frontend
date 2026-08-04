import { Order } from "@/types/admin/adminOrder";

interface AdminOrderLengthProps {
  orders: Order[];
}

function AdminOrderPageHeader({ orders }: AdminOrderLengthProps) {
  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Orders
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage customer orders and update delivery status.
          </p>
        </div>

        <div className="rounded-full border border-gray-200 bg-gray-50 px-5 py-2 text-sm font-semibold text-gray-700">
          Total Orders: <span className="text-black">{orders.length}</span>
        </div>
      </div>
    </>
  );
}

export default AdminOrderPageHeader;
