"use client";

import { Dispatch, SetStateAction } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import RevenueChart from "./RevenueChart";
import { AdminPage } from "@/types/admin";

interface Props {
  setActivePage : Dispatch<SetStateAction<AdminPage>>
}

export default function AdminDashboard({setActivePage}:Props) {
  return (
    <div>
      <DashboardHeader />

      <DashboardStats setActivePage={setActivePage}/>

      <RevenueChart />
    </div>
  );
}