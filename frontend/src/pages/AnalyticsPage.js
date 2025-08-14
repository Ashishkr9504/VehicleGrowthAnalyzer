import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const [kpi, setKpi] = useState({
    totalVehicles: 0,
    activeUsers: 0,
    reportsGenerated: 0,
    newRegistrations: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:5000/api/analytics/kpi", {
          method: "GET",
          credentials: "include",
        });
        const json = await res.json();
        setKpi(json);
      } catch (err) {
        console.error("Error loading KPI data", err);
      }
    }
    fetchData();
  }, []);


  const chartData = [
    { name: "Total Vehicles", value: kpi.totalVehicles },
    { name: "Active Users", value: kpi.activeUsers },
    { name: "Reports Generated", value: kpi.reportsGenerated },
    { name: "New Registrations", value: kpi.newRegistrations },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e29] text-white flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Analytics</h1>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(kpi).map(([key, value]) => (
            <div
              key={key}
              className="p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="text-sm text-gray-300 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </div>
              <div className="text-2xl font-bold text-[#00f3bb]">
                {value.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white/5 rounded-lg border border-white/10 p-6">
          <h2 className="text-lg font-semibold mb-4">Traffic Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#00f3bb"
                strokeWidth={2}
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>

      <Footer />
    </div>
  );
}
