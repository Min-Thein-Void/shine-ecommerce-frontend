"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  ClipboardList,
  Package,
  PlusSquare,
  ChevronLeft,
  ChevronRight,
  TrashIcon,
  X,
} from "lucide-react";
import { AdminPage } from "@/types/admin";

interface AdminSideBarProps {
  activePage: AdminPage;
  setActivePage: Dispatch<SetStateAction<AdminPage>>;
}

function AdminSideBar({ activePage, setActivePage }: AdminSideBarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Package },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ClipboardList },
    { id: "create", label: "Create Product", icon: PlusSquare },
    { id: "recyclebin", label: "Recycle Bin", icon: TrashIcon },
  ] as const;

  const handleNavigation = (page: AdminPage) => {
    setActivePage(page);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="flex h-20 shrink-0 items-center justify-between border-b border-gray-100 px-4">
        {(!collapsed || mobileOpen) && (
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              Shine Admin
            </h1>
            <p className="mt-1 text-xs text-gray-500">Ecommerce Dashboard</p>
          </div>
        )}

        {/* Desktop collapse button */}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden rounded-xl border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100 lg:block"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        {/* Mobile close button */}
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="rounded-xl border border-gray-200 p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto p-3">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            title={label}
            onClick={() => handleNavigation(id)}
            className={`flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium transition-all ${
              collapsed && !mobileOpen ? "justify-center" : "gap-3"
            } ${
              activePage === id
                ? "bg-black text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <Icon size={20} className="shrink-0" />
            {(!collapsed || mobileOpen) && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer */}
      {(!collapsed || mobileOpen) && (
        <div className="shrink-0 border-t border-gray-100 p-4">
          <div className="rounded-2xl bg-gray-100 p-4">
            <p className="text-sm font-semibold text-gray-900">
              Shine Shopping
            </p>
            <p className="mt-1 text-xs text-gray-500">Admin Dashboard v1.0</p>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile menu button */}

      {/* Mobile menu button */}
      {!mobileOpen && (
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="fixed left-1 top-13 z-[60] flex items-center justify-center rounded-xl border border-gray-200 bg-white  shadow-md lg:hidden"
          aria-label="Open sidebar"
          aria-expanded={mobileOpen}
        >
          <Package size={21} />
        </button>
      )}

      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar backdrop"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-72 flex-col border-r border-gray-200 bg-white shadow-xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`sticky top-0 hidden h-screen shrink-0 flex-col border-r border-gray-200 bg-white transition-[width] duration-300 lg:flex ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}

export default AdminSideBar;
