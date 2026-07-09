"use client";

import { useState } from "react";
import AdminSideBar from "./admin/AdminSideBar";
import AdminProductsSeeingPage from "./admin/AdminProductsSeeingPage";
import AdminOrdersSeeingPage from "./admin/AdminOrdersSeeingPage";
import AdminCreateAndEditProduct from "./admin/AdminCreateAndEditProduct";
import { Product } from "@/types/product";
import { AdminPage } from "@/types/admin";
import RecycleBin from "./admin/RecycleBin";

function AdminMainPage() {
  const [activePage, setActivePage] = useState<AdminPage>("products");
  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <AdminSideBar activePage={activePage} setActivePage={setActivePage} />

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="rounded-xl bg-white shadow-md p-8 min-h-[90vh]">
            {activePage === "products" && (
              <AdminProductsSeeingPage  setEditingProduct={setEditingProduct} setActivePage={setActivePage}/>
            )}
            {activePage === "orders" && <AdminOrdersSeeingPage />}
            {activePage === "create" && <AdminCreateAndEditProduct editingProduct={editingProduct}/>}
            {activePage === "recyclebin" && <RecycleBin/>}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminMainPage;
