import { useEffect, useState } from "react";
import { FaLeaf, FaHandsHelping, FaShieldAlt } from "react-icons/fa";

import AQIChart from "../../components/charts/AQIChart";
import { getDashboard } from "../../services/dashboardService";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
      setLoading(false);
    } catch (err) {
      console.error("Dashboard Error:", err);
      setError("Unable to load dashboard.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="rounded-[28px] border border-slate-200 bg-white px-8 py-5 shadow-lg">
          <h1 className="text-2xl font-semibold text-slate-500">Loading Dashboard...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="rounded-[28px] border border-red-200 bg-red-50 px-8 py-5 shadow-lg">
          <h1 className="text-2xl font-semibold text-red-500">{error}</h1>
        </div>
      </div>
    );
  }

  const currentAQI = Number(dashboard?.current_aqi ?? 85.85).toFixed(2);
  const category = dashboard?.category ?? "Moderate";

  const recommendations =
    dashboard?.recommendations ?? [
      {
        title: "Reduce outdoor exposure",
        description: "Limit long or strenuous outdoor activities until AQI improves.",
        icon: <FaShieldAlt />,
      },
      {
        title: "Use indoor air filtration",
        description: "Run air purifiers and keep windows closed during peak pollution hours.",
        icon: <FaLeaf />,
      },
      {
        title: "Stay hydrated",
        description: "Drink water and rest if you feel throat irritation or coughing.",
        icon: <FaHandsHelping />,
      },
    ];

  return (
    <div className="page-shell max-w-[1200px] mx-auto px-4 pb-24 sm:px-6 lg:px-8">
      <div className="space-y-12">
        <section className="site-card">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] md:p-8 lg:p-10">
            <div className="space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#2563EB]">
                AIR QUALITY FORECAST PLATFORM
              </p>
              <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-[#0F172A] md:text-5xl">
                Real-Time Air Quality Forecast Dashboard
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
                Monitor current air quality conditions and forecast pollution trends using
                AI-driven environmental analytics and real-time atmospheric data.
              </p>
            </div>

            <div className="mt-8">
              <div className="flex min-h-[220px] w-full items-center justify-center rounded-[32px] bg-gradient-to-r from-[#2563EB] via-[#2563EB] to-[#22D3EE] p-6 text-white shadow-[0_28px_60px_rgba(37,99,235,0.35)] md:p-8">
                <div className="text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/80">
                    CURRENT AQI
                  </p>
                  <p className="mt-4 text-[72px] font-extrabold leading-none text-white md:text-[80px]">
                    {currentAQI}
                  </p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.32em] text-white/90">
                    {category}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="site-card">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_50px_rgba(15,23,42,0.06)] md:p-6 lg:p-7" style={{ minHeight: 340 }}>
            <div className="mb-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">
                AQI Trend
              </p>
              <h2 className="mt-3 text-2xl font-bold text-[#0F172A]">
                Hourly Air Quality Forecast Trend
              </h2>
            </div>

            <div className="h-[220px] w-full">
              <AQIChart />
            </div>
          </div>
        </section>

        <section className="site-card">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] md:p-7">
            <div className="mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">
                Health Recommendations
              </p>
              <h2 className="mt-3 text-2xl font-bold text-[#0F172A]">
                Smart actions for cleaner air
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {recommendations.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-[22px] border border-slate-200 bg-slate-50 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-lg text-[#2563EB] shadow-sm ring-1 ring-slate-200">
                      {item.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-[#0F172A]">{item.title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
