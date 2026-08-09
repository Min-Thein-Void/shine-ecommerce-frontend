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
        <main className="flex-1 overflow-hidden">
          <div className="min-h-screen p-6 lg:p-8">
            <div className="min-h-[calc(100vh-4rem)] rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
              {
                activePage === "dashboard" && (
                  <AdminDashboard/>
                )
              }
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
