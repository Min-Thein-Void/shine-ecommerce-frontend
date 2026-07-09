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
      className={`sticky top-0 h-screen bg-gray-900 text-white shadow-xl transition-all duration-300 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-700 p-5">
        {!collapsed && (
          <div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-sm text-gray-400">Shine Shopping</p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-md p-2 hover:bg-gray-800"
        >
          {collapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-8 flex flex-col gap-2 px-3">
        <button
          title="Products"
          onClick={() => setActivePage("products")}
          className={`flex items-center rounded-lg px-4 py-3 transition ${
            collapsed ? "justify-center" : "gap-3"
          } ${
            activePage === "products" ? "bg-orange-500" : "hover:bg-gray-800"
          }`}
        >
          <Package size={22} />

          {!collapsed && <span>Products</span>}
        </button>

        <button
          title="Orders"
          onClick={() => setActivePage("orders")}
          className={`flex items-center rounded-lg px-4 py-3 transition ${
            collapsed ? "justify-center" : "gap-3"
          } ${activePage === "orders" ? "bg-orange-500" : "hover:bg-gray-800"}`}
        >
          <ClipboardList size={22} />

          {!collapsed && <span>Orders</span>}
        </button>

        <button
          title="Create Product"
          onClick={() => setActivePage("create")}
          className={`flex items-center rounded-lg px-4 py-3 transition ${
            collapsed ? "justify-center" : "gap-3"
          } ${activePage === "create" ? "bg-orange-500" : "hover:bg-gray-800"}`}
        >
          <PlusSquare size={22} />

          {!collapsed && <span>Create Product</span>}
        </button>

        <button
          title="Recycle Bin"
          onClick={() => setActivePage("recyclebin")}
          className={`flex items-center rounded-lg px-4 py-3 transition ${
            collapsed ? "justify-center" : "gap-3"
          } ${activePage === "recyclebin" ? "bg-orange-500" : "hover:bg-gray-800"}`}
        >
          <TrashIcon size={22} />

          {!collapsed && <span>Recycle Bin</span>}
        </button>
      </nav>
    </aside>
  );
}

export default AdminSideBar;
