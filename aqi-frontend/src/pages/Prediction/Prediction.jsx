import { useState } from "react";
import { FaArrowRight, FaMagic } from "react-icons/fa";

import PredictionCard from "../../components/cards/PredictionCard";
import { predictAQI } from "../../services/predictionService";

function Prediction() {
  const [aqiLast, setAqiLast] = useState("");
  const [aqi2, setAqi2] = useState("");
  const [aqi3, setAqi3] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handlePredict = async () => {
    if (!aqiLast || !aqi2 || !aqi3) {
      alert("Please enter all AQI values.");
      return;
    }

    try {
      setLoading(true);

      const response = await predictAQI({
        aqi_last: Number(aqiLast),
        aqi_2hrs_ago: Number(aqi2),
        aqi_3hrs_ago: Number(aqi3),
      });

      setResult(response);
    } catch (error) {
      console.log(error);
      alert("Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-24 sm:px-6 lg:px-8">
      <div className="space-y-12">
        <section className="animate-[fadeInUp_0.45s_ease-out_both]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)] md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#2563EB]">
              AI FORECAST ENGINE
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-[#0F172A] md:text-6xl">
              Predict AQI
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
              Generate short-term air quality forecasts using the trained XGBoost prediction model and historical atmospheric trends.
            </p>
          </div>
        </section>

        <section className="animate-[fadeInUp_0.5s_ease-out_0.08s_both]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)] md:p-8">
            <div className="grid gap-5 lg:grid-cols-3">
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  AQI Last Hour
                </label>
                <input
                  type="number"
                  value={aqiLast}
                  onChange={(e) => setAqiLast(e.target.value)}
                  placeholder="Example: 85"
                  className="mt-3 h-16 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  AQI 2 Hours Ago
                </label>
                <input
                  type="number"
                  value={aqi2}
                  onChange={(e) => setAqi2(e.target.value)}
                  placeholder="Example: 82"
                  className="mt-3 h-16 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  AQI 3 Hours Ago
                </label>
                <input
                  type="number"
                  value={aqi3}
                  onChange={(e) => setAqi3(e.target.value)}
                  placeholder="Example: 79"
                  className="mt-3 h-16 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <button
              onClick={handlePredict}
              disabled={loading}
              className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#2563EB] via-[#2563EB] to-[#22D3EE] px-6 text-base font-semibold text-white shadow-[0_18px_35px_rgba(37,99,235,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(34,211,238,0.32)] disabled:cursor-not-allowed disabled:opacity-80"
            >
              {loading ? (
                <>
                  <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Predicting...</span>
                </>
              ) : (
                <>
                  <FaMagic className="text-sm" />
                  <span>Predict Forecast</span>
                  <FaArrowRight className="text-sm" />
                </>
              )}
            </button>
          </div>
        </section>

        {result && (
          <section className="animate-[fadeInUp_0.55s_ease-out_0.12s_both]">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <PredictionCard title="NEXT 1 HOUR" data={result.next_1_hour} confidence={96} />
              <PredictionCard title="NEXT 2 HOURS" data={result.next_2_hours} confidence={94} />
              <PredictionCard title="NEXT 3 HOURS" data={result.next_3_hours} confidence={92} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Prediction;