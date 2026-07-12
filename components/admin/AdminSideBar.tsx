"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  ClipboardList,
  Package,
  PlusSquare,
  ChevronLeft,
  ChevronRight,
  TrashIcon,
} from "lucide-react";
import { AdminPage } from "@/types/admin";

interface AdminSideBarProps {
  activePage: AdminPage;
  setActivePage: Dispatch<SetStateAction<AdminPage>>;
}

function AdminSideBar({ activePage, setActivePage }: AdminSideBarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`sticky top-0 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Header */}
      <div className="flex h-20 items-center justify-between border-b border-gray-100 px-5">
        {!collapsed && (
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Shine Admin
            </h1>

            <p className="mt-1 text-xs text-gray-500">Ecommerce Dashboard</p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-xl border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <button
          title="Products"
          onClick={() => setActivePage("products")}
          className={`flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
            collapsed ? "justify-center" : "gap-3"
          } ${
            activePage === "products"
              ? "bg-black text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <Package size={20} />
          {!collapsed && <span>Products</span>}
        </button>

        <button
          title="Orders"
          onClick={() => setActivePage("orders")}
          className={`flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
            collapsed ? "justify-center" : "gap-3"
          } ${
            activePage === "orders"
              ? "bg-black text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <ClipboardList size={20} />
          {!collapsed && <span>Orders</span>}
        </button>

        <button
          title="Create Product"
          onClick={() => setActivePage("create")}
          className={`flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
            collapsed ? "justify-center" : "gap-3"
          } ${
            activePage === "create"
              ? "bg-black text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <PlusSquare size={20} />
          {!collapsed && <span>Create Product</span>}
        </button>

        <button
          title="Recycle Bin"
          onClick={() => setActivePage("recyclebin")}
          className={`flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
            collapsed ? "justify-center" : "gap-3"
          } ${
            activePage === "recyclebin"
              ? "bg-black text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <TrashIcon size={20} />
          {!collapsed && <span>Recycle Bin</span>}
        </button>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="border-t border-gray-100 p-5">
          <div className="rounded-2xl bg-gray-100 p-4">
            <p className="text-sm font-semibold text-gray-900">
              Shine Shopping
            </p>

            <p className="mt-1 text-xs text-gray-500">Admin Dashboard v1.0</p>
          </div>
        </div>
      )}
    </aside>
  );
}

export default AdminSideBar;
