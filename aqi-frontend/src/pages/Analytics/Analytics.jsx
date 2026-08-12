import { useEffect, useState } from "react";
import {
  FaDatabase,
  FaTable,
  FaExclamationTriangle,
  FaBrain,
  FaCalendarAlt,
  FaShieldAlt,
} from "react-icons/fa";

import {
  getMetrics,
  getFeatureImportance,
  getDatasetInfo,
} from "../../services/analyticsService";

function Analytics() {
  const [metrics, setMetrics] = useState(null);
  const [dataset, setDataset] = useState(null);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const metricsData = await getMetrics();
      const datasetData = await getDatasetInfo();
      const featureData = await getFeatureImportance();

      setMetrics(metricsData);
      setDataset(datasetData);
      setFeatures(featureData.slice(0, 10));
    } catch (error) {
      console.log(error);
    }
  };

  const metricEntries = metrics
    ? Object.entries(metrics).map(([horizon, values]) => ({
        horizon,
        r2: Number(values.R2 ?? 0),
        mae: Number(values.MAE ?? 0),
        rmse: Number(values.RMSE ?? 0),
      }))
    : [];

  const maxImportance =
    features.length > 0
      ? Math.max(...features.map((item) => Number(item.importance) || 0), 1)
      : 1;

  const qualityScore = dataset
    ? dataset.rows && dataset.columns
      ? Math.max(
          0,
          100 - (Number(dataset.missing_values) / Math.max(dataset.rows * dataset.columns, 1)) * 1000,
        )
      : 100
    : 100;

  const getQualityLabel = (score) => {
    if (score >= 98) return "Excellent";
    if (score >= 95) return "Good";
    if (score >= 90) return "Fair";
    return "Needs Review";
  };

  const datasetCards = [
    {
      label: "Rows",
      value: dataset?.rows ?? "—",
      icon: <FaDatabase />,
      tone: "bg-blue-50 text-blue-600",
    },
    {
      label: "Columns",
      value: dataset?.columns ?? "—",
      icon: <FaTable />,
      tone: "bg-cyan-50 text-cyan-600",
    },
    {
      label: "Missing Values",
      value: dataset?.missing_values ?? "—",
      icon: <FaExclamationTriangle />,
      tone: "bg-amber-50 text-amber-600",
    },
    {
      label: "Models Loaded",
      value: 3,
      icon: <FaBrain />,
      tone: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <div className="page-shell max-w-[1200px] mx-auto px-4 pb-24 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <section className="site-card">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#2563EB]">
              AI MODEL OPERATIONS
            </p>
            <h1 className="mt-4 text-3xl font-black text-[#0F172A] md:text-5xl">
              Analytics Overview
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Monitor model quality, feature impact, and dataset health across the AQI forecasting pipeline.
            </p>
          </div>
        </section>

        {dataset && (
          <section className="site-card grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {datasetCards.map((card) => (
              <div
                key={card.label}
                className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_16px_35px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${card.tone}`}>
                    {card.icon}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    KPI
                  </span>
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">{card.label}</p>
                <p className="mt-2 text-3xl font-black text-[#0F172A]">{card.value}</p>
              </div>
            ))}
          </section>
        )}

        {metrics && (
          <section className="site-card rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] md:p-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">
                  Performance
                </p>
                <h2 className="mt-2 text-2xl font-bold text-[#0F172A]">Model Metrics</h2>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-[22px] border border-slate-200">
              <div className="grid grid-cols-[1fr_1.1fr_0.9fr_0.9fr] bg-slate-50 px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                <span>Horizon</span>
                <span>R²</span>
                <span>MAE</span>
                <span>RMSE</span>
              </div>

              {metricEntries.map((entry) => (
                <div
                  key={entry.horizon}
                  className="grid grid-cols-[1fr_1.1fr_0.9fr_0.9fr] items-center gap-3 border-t border-slate-200 bg-white px-5 py-4 text-sm text-slate-700"
                >
                  <span className="font-semibold text-[#0F172A]">{entry.horizon}</span>

                  <div className="flex items-center gap-3">
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#22D3EE]"
                        style={{ width: `${Math.min(Math.max(entry.r2 * 100, 8), 100)}%` }}
                      />
                    </div>
                    <span className="w-12 text-right font-semibold text-slate-700">
                      {(entry.r2 * 100).toFixed(1)}%
                    </span>
                  </div>

                  <span>{entry.mae.toFixed(2)}</span>
                  <span>{entry.rmse.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="site-card grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          {features.length > 0 && (
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] md:p-7">
              <div className="mb-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">
                  Feature Impact
                </p>
                <h2 className="mt-2 text-2xl font-bold text-[#0F172A]">Top 10 Features</h2>
              </div>

              <div className="space-y-4">
                {features.map((item) => (
                  <div key={item.feature}>
                    <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                      <span className="truncate font-medium text-slate-700">{item.feature}</span>
                      <span className="font-semibold text-slate-500">
                        {(Number(item.importance) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#22D3EE]"
                        style={{ width: `${(Number(item.importance) / maxImportance) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {dataset && (
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] md:p-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">
                    Dataset
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-[#0F172A]">Overview</h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                  <FaShieldAlt className="text-[10px]" />
                  {getQualityLabel(qualityScore)}
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <div className="border-b border-slate-200 pb-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Filename
                  </p>
                  <p className="mt-2 text-base font-semibold text-slate-800">{dataset.filename}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Rows
                    </p>
                    <p className="mt-2 text-xl font-bold text-[#0F172A]">{dataset.rows}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Columns
                    </p>
                    <p className="mt-2 text-xl font-bold text-[#0F172A]">{dataset.columns}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Missing Values
                    </p>
                    <p className="mt-2 text-xl font-bold text-[#0F172A]">{dataset.missing_values}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Data Quality
                    </p>
                    <p className="mt-2 text-xl font-bold text-[#0F172A]">{getQualityLabel(qualityScore)}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Last Processed Date
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-base font-medium text-slate-700">
                    <FaCalendarAlt className="text-[#2563EB]" />
                    <span>
                      {new Date().toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Analytics;