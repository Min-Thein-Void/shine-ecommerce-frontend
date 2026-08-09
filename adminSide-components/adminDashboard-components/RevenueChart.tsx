"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

interface RevenueResponse {
  labels: string[];
  data: number[];
}

export default function RevenueChart() {
  const [revenue, setRevenue] = useState<RevenueResponse>({
    labels: [],
    data: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("http://localhost:3100/admin/revenue", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch revenue");
        }

        const result: RevenueResponse = await res.json();

        setRevenue(result);
      } catch (error) {
        console.error("Revenue fetch error:", error);
        setError("Failed to load revenue data");
      } finally {
        setLoading(false);
      }
    };
    fetchRevenue();
  }, []);

  const data = {
    labels: revenue.labels,

    datasets: [
      {
        label: "Revenue",

        data: revenue.data,

        tension: 0.4,

        pointRadius: 4,

        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true,
      },

      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} MMK`;
          },
        },
      },
    },

    scales: {
      y: {
        ticks: {
          callback: (value: any) => {
            return `${Number(value).toLocaleString()} MMK`;
          },
        },
      },
    },
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      {" "}
      {/* Header */}{" "}
      <div>
        {" "}
        <h2 className="text-xl font-semibold text-gray-900">
          {" "}
          Revenue Overview{" "}
        </h2>{" "}
        <p className="mt-1 text-sm text-gray-500">
          {" "}
          Monthly revenue performance{" "}
        </p>{" "}
      </div>{" "}
      {/* Chart */}{" "}
      <div className="relative mt-6 h-80">
        {" "}
        {loading && (
          <div className="flex h-full items-center justify-center">
            {" "}
            <p className="text-sm text-gray-500"> Loading revenue... </p>{" "}
          </div>
        )}{" "}
        {!loading && error && (
          <div className="flex h-full items-center justify-center">
            {" "}
            <p className="text-sm text-red-500"> {error} </p>{" "}
          </div>
        )}{" "}
        {!loading && !error && <Line data={data} options={options} />}{" "}
      </div>{" "}
    </div>
  );
}
