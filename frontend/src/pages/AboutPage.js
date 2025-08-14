
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import logo from "../assets/logo.png"; 
import { Mail, Linkedin } from "react-feather";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0e29] text-white flex flex-col">
      <Header />

      <main className="flex-grow max-w-6xl mx-auto px-4 py-12">
        {/* Intro section */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <img
            src={logo}
            alt="Financially Free Logo"
            className="w-20 h-20 rounded-md shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-extrabold text-[#00f3bb]">
              About This Project
            </h1>
            <p className="text-gray-300 mt-2 max-w-2xl">
              This dashboard visualizes vehicle registration trends using data
              sourced and processed from the official Vahan portal. It focuses
              on investor-friendly metrics — Year-on-Year (YoY) and
              Quarter-on-Quarter (QoQ) growth, category/state breakdowns, and
              quick manufacturer insights. The UI is built to present clear
              signals for decision-making while remaining interactive and
              filterable.
            </p>
          </div>
        </div>

        {/* Features + Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0a0e29] via-[#1a2647] to-[#2467ba] border border-[#00f3bb]/20 shadow-lg">
            <h3 className="text-lg font-semibold text-[#00f3bb] mb-3">
              Key Features
            </h3>
            <ul className="text-gray-200 space-y-2 list-disc list-inside">
              <li>
                Interactive YoY & QoQ charts with filters (year, quarter,
                category)
              </li>
              <li>
                Manufacturer / category breakdowns and market-share
                visualizations
              </li>
              <li>Heatmap-style trend view and downloadable summary</li>
              <li>
                Secure authentication, password reset via email (backend demo)
              </li>
              <li>
                Designed for easy integration with MongoDB (for time-series
                storage)
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0a0e29] via-[#1a2647] to-[#2467ba] border border-[#00f3bb]/20 shadow-lg">
            <h3 className="text-lg font-semibold text-[#00f3bb] mb-3">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "React",
                "Tailwind CSS",
                "Node.js",
                "Express",
                "MongoDB",
                "Recharts / Chart.js",
                "Nodemailer",
                "JWT / bcrypt",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            
          </div>
        </div>

        {/* About Me + Objective */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-[#0a0e29] via-[#1a2647] to-[#2467ba] border border-[#00f3bb]/20 shadow-lg">
            <h3 className="text-xl font-semibold text-[#00f3bb] mb-3">
              About Me
            </h3>
            <p className="text-gray-200 mb-4">
              I’m <strong>Ashish Kumar</strong>, a B.Tech graduate from Institute Of Engineering And Management, Kolkata
              and a full-stack developer. I have strong
              skills in MERN development, data visualization, algorithmic
              problem solving for competitive programming.I enjoy turning
              complex datasets into actionable dashboards and building
              end-to-end web applications.
            </p>

            <h4 className="text-md font-semibold text-[#5ea14c] mb-2">
              Objective
            </h4>
            <p className="text-gray-200">
              I am seeking an internship or junior developer role at a startup
              where I can contribute to building product features, improve my
              backend and data skills, and ship real value for users. I’m
              especially interested in fintech / data-driven products.
            </p>
          </div>

          <aside className="p-6 rounded-2xl bg-gradient-to-br from-[#0a0e29] via-[#1a2647] to-[#2467ba] border border-[#00f3bb]/20 shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#00f3bb] mb-3">
                Contact
              </h3>
              <p className="text-gray-200 mb-4">
                Interested in my work or want to collaborate? Reach out below.
              </p>

              <div className="space-y-3">
                <a
                  href="mailto:your.email@example.com"
                  className="flex items-center gap-2 px-3 py-2 rounded bg-white/5 hover:bg-white/10 transition"
                >
                  <Mail size={16} />{" "}
                  <span className="text-sm text-gray-200">
                    ashishkumarhjp9@gmail.com
                  </span>
                </a>

                <a
                  href="https://www.linkedin.com/in/ashish-kumar-285a47221/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded bg-white/5 hover:bg-white/10 transition"
                >
                  <Linkedin size={16} />{" "}
                  <span className="text-sm text-gray-200">
                    linkedin
                  </span>
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer note */}
        <div className="text-sm text-gray-400 mt-6">
          
          <p className="mt-2">
            Data Source:{" "}
            <a
              className="text-[#00f3bb] underline"
              href="https://vahan.parivahan.gov.in"
              target="_blank"
              rel="noreferrer"
            >
              vahan.parivahan.gov.in
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}