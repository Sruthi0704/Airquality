import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaChartBar,
  FaChartLine,
  FaInfoCircle,
  FaWind,
} from "react-icons/fa";

import logo from "../../assets/airvision-logo.png";
import { getDashboard } from "../../services/dashboardService";

function Sidebar({ collapsed, onToggle }) {
  const [metrics, setMetrics] = useState({
    model_accuracy: null,
    latest_timestamp: null,
  });

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const data = await getDashboard();

        if (mounted) {
          setMetrics({
            model_accuracy: data.model_accuracy ?? 95.7,
            latest_timestamp: data.latest_timestamp ?? "31 Dec 2024 • 23:00",
          });
        }
      } catch (e) {
        // ignore
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaChartBar />,
    },
    {
      name: "Forecast AQI",
      path: "/prediction",
      icon: <FaWind />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <FaChartLine />,
    },
    {
      name: "About",
      path: "/about",
      icon: <FaInfoCircle />,
    },
  ];

  return (
    <aside
      className={`sticky top-0 flex h-screen flex-col border-r border-slate-200 bg-white/90 shadow-[0_0_30px_rgba(15,23,42,0.04)] backdrop-blur-xl transition-all duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      <div
        className={`border-b border-slate-200 ${
          collapsed ? "px-3 py-5" : "px-5 py-5"
        }`}
      >
        <button
          type="button"
          onClick={onToggle}
          className={`flex w-full items-center ${collapsed ? "justify-center" : "gap-3"}`}
        >
          <img
            src={logo}
            alt="AirVision AI"
            className="h-11 w-11 rounded-2xl object-cover shadow-sm ring-1 ring-slate-200"
          />

          {!collapsed && (
            <div className="min-w-0 text-left">
              <h1 className="text-2xl font-black text-[#0F172A]">AirVision</h1>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                Air Quality Intelligence
              </p>
            </div>
          )}
        </button>
      </div>

      <div className="flex flex-1 flex-col">
        <nav className="flex flex-col gap-2 px-3 pt-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-[18px] px-3 py-3 text-sm font-medium transition-all duration-200 ${
                  collapsed ? "justify-center" : "justify-start"
                } ${
                  isActive
                    ? "bg-gradient-to-r from-[#2563EB] to-[#22D3EE] text-white shadow-[0_12px_28px_rgba(37,99,235,0.28)]"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <span className="text-lg leading-none">{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto"></div>
      </div>

      <div className="mt-auto border-t border-slate-200 px-4 py-5">
        {collapsed ? (
          <div className="flex justify-center">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-sm font-bold text-slate-700">
              AV
            </span>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                Model Accuracy
              </p>
              <p className="mt-1 text-lg font-bold text-[#0F172A]">
                {metrics.model_accuracy ? `${metrics.model_accuracy}%` : "95.7%"}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                Last Updated
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {metrics.latest_timestamp || "31 Dec 2024 • 23:00"}
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;