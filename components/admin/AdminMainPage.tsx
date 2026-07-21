"use client";

import { useState } from "react";

import AdminProductsSeeingPage from "./AdminProductsSeeingPage";
import AdminOrdersSeeingPage from "./AdminOrdersSeeingPage";
import AdminCreateAndEditProduct from "./AdminCreateAndEditProduct";
import { Product } from "@/types/product";
import { AdminPage } from "@/types/admin";
import RecycleBin from "./RecycleBin";
import AdminSideBar from "./AdminSideBar";

function AdminMainPage() {
  const [activePage, setActivePage] = useState<AdminPage>("products");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <AdminSideBar activePage={activePage} setActivePage={setActivePage} />

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <div className="min-h-screen p-6 lg:p-8">
            <div className="min-h-[calc(100vh-4rem)] rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
              {/* Page Content */}
              {activePage === "products" && (
                <AdminProductsSeeingPage
                  setEditingProduct={setEditingProduct}
                  setActivePage={setActivePage}
                />
              )}

              {activePage === "orders" && <AdminOrdersSeeingPage />}

              {activePage === "create" && (
                <AdminCreateAndEditProduct editingProduct={editingProduct} />
              )}

              {activePage === "recyclebin" && <RecycleBin />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminMainPage;
