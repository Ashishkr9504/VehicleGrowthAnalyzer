
import React from "react";
import { BarChart2, TrendingUp, Activity } from "react-feather";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
export default function HomePage() {
  

  return (
    <div className="bg-[#0a0e29] text-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#047264] to-[#5ea14c] text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-[#00f3bb]">Track Vehicle Growth Like an Investor</h2>
          <p className="text-lg mb-6">
            Get clear insights into India's vehicle market. Analyze YoY and QoQ growth trends for top manufacturers,
            all powered by real government data.
          </p>
          <Link
  to="/dashboard"
  className="bg-[#00f3bb] text-[#0a0e29] font-semibold px-6 py-3 rounded shadow hover:bg-[#7cfcdf] transition"
>
  Explore Dashboard
</Link>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-[#0a0e29]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-2xl hover:ring-2 hover:ring-[#00f3bb] transition transform hover:scale-105 duration-300 text-[#0a0e29]">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-[#0472641a] hover:bg-[#04726433] transition duration-300">
                  <BarChart2 className="h-10 w-10 text-[#047264]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[#047264] mb-2">Real-Time Insights</h3>
              <p>Visualize data across quarters and years to make smart, timely investment decisions.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-2xl hover:ring-2 hover:ring-[#00f3bb] transition transform hover:scale-105 duration-300 text-[#0a0e29]">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-[#5ea14c1a] hover:bg-[#5ea14c33] transition duration-300">
                  <TrendingUp className="h-10 w-10 text-[#5ea14c]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[#5ea14c] mb-2">Manufacturer Trends</h3>
              <p>Track Tata, Maruti, Hero and other top brands' market performance.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-2xl hover:ring-2 hover:ring-[#00f3bb] transition transform hover:scale-105 duration-300 text-[#0a0e29]">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-[#7cfcdf1a] hover:bg-[#7cfcdf33] transition duration-300">
                  <Activity className="h-10 w-10 text-[#7cfcdf]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[#7cfcdf] mb-2">Growth Analytics</h3>
              <p>Get YoY and QoQ growth stats with beautiful charts and easy-to-read summaries.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
