"use client";

import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import RevenueChart from "./RevenueChart";

export default function AdminDashboard() {
  return (
    <div>
      <DashboardHeader />

      <DashboardStats/>

      <RevenueChart />
    </div>
  );
}