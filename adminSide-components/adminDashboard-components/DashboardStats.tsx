"use client";

import { AdminPage } from "@/types/admin";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface DashboardStats {
  totalCustomers: number;
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  pendingOrders: number;
}

interface Props {
  setActivePage: Dispatch<SetStateAction<AdminPage>>;
}

export default function DashboardStats({ setActivePage }: Props) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3100/admin/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch dashboard stats");
        }

        const data = await res.json();

        setStats({
          totalCustomers: data.totalCustomers,
          totalRevenue: data.totalRevenue,
          totalOrders: data.totalOrders,
          totalProducts: data.totalProducts,
          pendingOrders: data.pendingOrders.length,
        });
      } catch (error) {
        console.error("Dashboard stats error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    {
      title: "Total Customers",
      value: loading
        ? "Loading..."
        : `${stats?.totalCustomers.toLocaleString() ?? 0} People`,
      css: "text-green-500",
      routeName: "dashboard",
    },
    {
      title: "Total Revenue",
      value: loading
        ? "Loading..."
        : `${stats?.totalRevenue.toLocaleString() ?? 0} MMK`,
      css: "text-yellow-500",
      routeName: "dashboard",
    },
    {
      title: "Total Orders",
      value: loading
        ? "Loading..."
        : (stats?.totalOrders.toLocaleString() ?? "0"),
      css: "text-blue-500",
      routeName: "orders",
    },
    {
      title: "Total Products",
      value: loading
        ? "Loading..."
        : (stats?.totalProducts.toLocaleString() ?? "0"),
      css: "text-purple-500",
      routeName: "products",
    },
    {
      title: "Pending Orders",
      value: loading
        ? "Loading..."
        : (stats?.pendingOrders.toLocaleString() ?? "0"),
      css: "text-orange-500",
      routeName: "orders",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-3">
      {statsData.map((stat) => (
        <div
          key={stat.title}
          onClick={() => setActivePage(stat.routeName as AdminPage)}
          className="rounded-2xl border border-gray-200 bg-white p-6 cursor-pointer hover:scale-105 transition duration-300"
        >
          <p className="text-sm font-medium text-gray-500">{stat.title}</p>

          <p className={`mt-2 text-2xl font-bold text-gray-900 ${stat.css}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
