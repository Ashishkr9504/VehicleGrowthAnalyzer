

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ComposedChart,
  CartesianGrid,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FiRefreshCw } from "react-icons/fi";
import api from "../utils/api";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const COLORS = [
  "#00f3bb",
  "#047264",
  "#5ea14c",
  "#7cfcdf",
  "#ffd166",
  "#f97316",
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  // Filters / controls
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [availableYears, setAvailableYears] = useState([]);
  const [quarter, setQuarter] = useState("All");
  const [manufacturer, setManufacturer] = useState("All");
  const [vehicleType, setVehicleType] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const d = await api.fetchDashboard();
      setData(d);

      const years =
        d.years && d.years.length
          ? d.years.slice().sort((a, b) => a - b)
          : Array.from(new Set((d.qoqData || []).map((x) => x.year))).sort();
      setAvailableYears(years);
      setStartYear(years[0] || new Date().getFullYear());
      setEndYear(years[years.length - 1] || new Date().getFullYear());
      setManufacturer("All");
      setVehicleType("All");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  
  const computedYoyFiltered = (data?.yoyData || [])
  .filter((d) => {
    const yearMatch = d.year >= startYear && d.year <= endYear;

    const manufacturerMatch =
      !d.manufacturer || manufacturer === "All" || d.manufacturer === manufacturer;

 
    const quarterMatch =
      !d.quarter || quarter === "All" || d.quarter === quarter;

  
    const vehicleTypeMatch =
      !d.vehicleType || vehicleType === "All" || d.vehicleType === vehicleType;

    return yearMatch && manufacturerMatch && quarterMatch && vehicleTypeMatch;
  })
  .map((d) => ({ ...d, growth: Number(d.growth) })); // ensure numeric


  const computedQoq = data?.qoqData || [];
  const kpi = data?.summary || {};
  const marketShare = data?.manufacturers || [];
  const manufacturersList =
    data?.manufacturers?.map((m) => m.name) || [];
  const vehicleTypesList =
    Array.from(new Set(data?.qoqData?.map((x) => x.vehicleType).filter(Boolean))) || [];
  const insights = data?.insights || [];

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0e29] text-white">
        <div className="text-center">
          <div className="mb-4 animate-spin">
            <FiRefreshCw size={32} />
          </div>
          <div>Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e29] text-white">
      <Header />

      <div className="max-w-7xl mx-auto p-6">
        {/* Title + Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#00f3bb]">
              Indian Vehicle Market Insights
            </h1>
            <p className="text-gray-300">YoY & QoQ growth — investor view</p>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            {/* Year range */}
            <select
              value={startYear}
              onChange={(e) => setStartYear(Number(e.target.value))}
              className="bg-[#0a0e29] border border-[#00f3bb] px-3 py-2 rounded"
            >
              {availableYears.map((y) => (
                <option key={"s" + y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <select
              value={endYear}
              onChange={(e) => setEndYear(Number(e.target.value))}
              className="bg-[#0a0e29] border border-[#00f3bb] px-3 py-2 rounded"
            >
              {availableYears.map((y) => (
                <option key={"e" + y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            {/* Quarter */}
            <select
              value={quarter}
              onChange={(e) => setQuarter(e.target.value)}
              className="bg-[#0a0e29] border border-[#00f3bb] px-3 py-2 rounded"
            >
              <option value="All">All Quarters</option>
              <option value="Q1">Q1</option>
              <option value="Q2">Q2</option>
              <option value="Q3">Q3</option>
              <option value="Q4">Q4</option>
            </select>

            {/* Vehicle Type */}
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-[#0a0e29] border border-[#00f3bb] px-3 py-2 rounded"
            >
              <option value="All">All Types</option>
              {vehicleTypesList.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {/* Manufacturer */}
            <select
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              className="bg-[#0a0e29] border border-[#00f3bb] px-3 py-2 rounded"
            >
              <option value="All">All Manufacturers</option>
              {manufacturersList.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <button
              onClick={load}
              className="bg-[#00f3bb] text-[#0a0e29] px-3 py-2 rounded"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="text-sm text-gray-300">Total Vehicles</div>
            <div className="text-2xl font-bold text-[#00f3bb]">
              {(kpi.totalVehicles || 0).toLocaleString()}
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="text-sm text-gray-300">YoY Growth</div>
            <div
              className={`text-2xl font-bold ${
                kpi.yoyGrowth >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {Number(kpi.yoyGrowth || 0).toFixed(2)}%
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="text-sm text-gray-300">QoQ Growth</div>
            <div
              className={`text-2xl font-bold ${
                kpi.qoqGrowth >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {Number(kpi.qoqGrowth || 0).toFixed(2)}%
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="text-sm text-gray-300">Top Manufacturer</div>
            <div className="text-xl font-semibold">
              {kpi.topManufacturer || "—"}
            </div>
          </div>
        </div>

        {/* Charts area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="col-span-2 p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-lg mb-2 text-[#00f3bb]">YoY Growth (%)</h3>
            <div style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer>
                <LineChart data={computedYoyFiltered}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.04)"
                  />
                  <XAxis dataKey="year" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip formatter={(v) => `${v}%`} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="growth"
                    stroke={COLORS[0]}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-lg mb-2 text-[#00f3bb]">Market Share</h3>
            <div style={{ width: "100%", height: 320 }}>
              <ResponsiveContainer>
                <PieChart width={400} height={400}>
                  <Pie
                    data={marketShare}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name }) => name}
                  >
                    {marketShare.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [
                      `${value.toLocaleString()} vehicles`,
                      name,
                    ]}
                  />
                  <Legend
                    formatter={(value) => (
                      <span style={{ color: "white" }}>{value}</span>
                    )}
                    wrapperStyle={{ paddingTop: 20 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* QoQ + Heatmap + Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-lg mb-2 text-[#00f3bb]">
              QoQ Vehicles & Growth
            </h3>
            <div style={{ width: "100%", height: 360 }}>
              <ResponsiveContainer>
                <ComposedChart data={computedQoq}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.04)"
                  />
                  <XAxis dataKey="label" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="vehicles" barSize={20} fill={COLORS[1]} />
                  <Line
                    type="monotone"
                    dataKey="growth"
                    stroke="#00f3bb"
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Heatmap-style simple table */}
            <div className="mt-4">
              <h4 className="text-sm text-gray-300 mb-2">
                Manufacturer → Quarter (Growth %)
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="text-gray-400">
                      <th className="pr-4 pb-2">Manufacturer</th>
                      {(data.quarters || []).map((q) => (
                        <th key={q} className="px-3 pb-2">
                          {q}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(data.manufacturerQuarterMatrix || []).map((row) => (
                      <tr key={row.manufacturer}>
                        <td className="py-2">{row.manufacturer}</td>
                        {row.values.map((v, i) => (
                          <td key={i} className="px-3 py-2">
                            <div
                              className={`inline-block px-2 py-1 rounded text-xs ${
                                v > 0 ? "bg-green-900/60" : "bg-red-900/50"
                              }`}
                            >
                              {v}%
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <aside className="p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-lg mb-2 text-[#00f3bb]">Insights</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-200">
              {insights.length ? (
                insights.map((t, i) => <li key={i}>{t}</li>)
              ) : (
                <li>No insights found.</li>
              )}
            </ul>

            <div className="mt-4">
              <h4 className="text-sm text-gray-300">Quick Actions</h4>
              <div className="flex flex-col gap-2 mt-2">
                <button
                  className="px-3 py-2 bg-[#00f3bb] text-[#0a0e29] rounded"
                  onClick={() => {
                    navigate("/summary", {
                      state: { summary: data.summary || {} },
                    });
                  }}
                >
                  View summary
                </button>
                <button
                  className="px-3 py-2 border border-white/20 rounded"
                  onClick={() => window.print()}
                >
                  Print View
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

