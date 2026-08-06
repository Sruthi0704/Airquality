import { useEffect, useState } from "react";
import { FaWind, FaChartLine, FaClock } from "react-icons/fa";

import AQIChart from "../../components/charts/AQIChart";
import AQIStatus from "../../components/cards/AQIStatus";
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
      console.log("Fetching dashboard...");

      const data = await getDashboard();

      console.log("Dashboard Response:", data);

      setDashboard(data);
      setLoading(false);
    } catch (err) {
      console.error("Dashboard Error:", err);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Data:", err.response.data);
      }

      setError("Unable to load dashboard.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h1 className="text-2xl font-semibold text-slate-500">
          Loading Dashboard...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h1 className="text-2xl font-semibold text-red-500">
          {error}
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-16">

      <section>

        <p className="text-sm uppercase tracking-[0.35em] text-blue-600 font-bold mb-4">
          AIRVISION AI
        </p>

        <h1 className="text-5xl font-black text-slate-900">
          Air Quality Dashboard
        </h1>

        <p className="mt-6 text-lg text-slate-500 max-w-4xl leading-8">
          Monitor current air quality conditions, model accuracy and
          forecasting insights in one unified dashboard.
        </p>

      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg p-8">

          <FaWind size={30} />

          <p className="mt-8 text-xs uppercase tracking-[0.3em]">
            Current AQI
          </p>

          <h1 className="mt-4 text-6xl font-black">
            {dashboard.current_aqi}
          </h1>

          <span className="inline-block mt-6 px-5 py-2 rounded-full bg-white/20">
            {dashboard.category}
          </span>

          <p className="mt-8 leading-8 text-blue-50">
            {dashboard.advice}
          </p>

        </div>

        <div className="rounded-3xl bg-white shadow-lg p-8">

          <FaChartLine
            size={30}
            className="text-green-600"
          />

          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-slate-400">
            Model Accuracy
          </p>

          <h1 className="mt-4 text-6xl font-black text-slate-900">
            95.7%
          </h1>

          <p className="mt-8 text-slate-500 leading-8">
            Latest XGBoost evaluation.
          </p>

        </div>

        <div className="rounded-3xl bg-white shadow-lg p-8">

          <FaClock
            size={30}
            className="text-orange-500"
          />

          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-slate-400">
            Last Updated
          </p>

          <h2 className="mt-4 text-2xl font-bold text-slate-900 leading-relaxed">
            {dashboard.latest_timestamp}
          </h2>

          <p className="mt-8 text-slate-500 leading-8">
            Latest processed dataset timestamp.
          </p>

        </div>

      </section>

      <section className="grid grid-cols-12 gap-8">

        <div className="col-span-12 xl:col-span-8 bg-white rounded-3xl shadow-lg p-10">

          <div className="mb-10">

            <h2 className="text-3xl font-bold text-slate-900">
              AQI Trend
            </h2>

            <p className="mt-3 text-slate-500">
              Historical Air Quality Index visualization.
            </p>

          </div>

          <AQIChart />

        </div>

        <div className="col-span-12 xl:col-span-4 bg-white rounded-3xl shadow-lg p-10">

          <div className="mb-10">

            <h2 className="text-3xl font-bold text-slate-900">
              Air Quality Status
            </h2>

            <p className="mt-3 text-slate-500">
              Current AQI summary.
            </p>

          </div>

          <AQIStatus />

        </div>

      </section>

    </div>
  );
}

export default Dashboard;