"use client";

import { useState } from "react";

import AdminProductsSeeingPage from "../adminProductSeeingPage-components/AdminProductsSeeingPage";
import AdminOrdersSeeingPage from "../adminOrderSeeingPage-components/AdminOrdersSeeingPage";
import AdminCreateAndEditProduct from "../adminProductCreateComponents/AdminCreateAndEditProduct";

import { AdminPage } from "@/types/admin";
import RecycleBin from "./RecycleBin";
import AdminSideBar from "./AdminSideBar";
import { Product } from "@/types/product";
import AdminDashboard from "../adminDashboard-components/AdminDashboard";

function AdminMainPage() {
  const [activePage, setActivePage] = useState<AdminPage>("products");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <AdminSideBar activePage={activePage} setActivePage={setActivePage} />

        {/* Main Content */}

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          <div className="min-h-screen min-w-0 px-4 pb-4 pt-20 lg:p-8">
            <div className="min-h-[calc(100vh-4rem)] min-w-0 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
              {/* Page Content */}
              {activePage === "dashboard" && (
                <AdminDashboard setActivePage={setActivePage} />
              )}

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
