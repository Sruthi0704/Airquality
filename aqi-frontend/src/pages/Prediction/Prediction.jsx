import { useState } from "react";
import { FaWind, FaMagic } from "react-icons/fa";
import { predictAQI } from "../../services/predictionService";
import PredictionCard from "../../components/cards/PredictionCard";

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
    <div className="space-y-10">

      <div>
        <h1 className="text-5xl font-black text-slate-800">
          Predict AQI
        </h1>

        <p className="text-slate-500 text-lg mt-3">
          Forecast air quality for the next 3 hours using the trained XGBoost model.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-10">

        <div className="grid lg:grid-cols-3 gap-6">

          <div>
            <label className="font-semibold text-slate-600">
              AQI Last Hour
            </label>

            <input
              type="number"
              value={aqiLast}
              onChange={(e) => setAqiLast(e.target.value)}
              placeholder="Example: 85"
              className="mt-3 w-full rounded-2xl border border-slate-200 p-4 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-600">
              AQI 2 Hours Ago
            </label>

            <input
              type="number"
              value={aqi2}
              onChange={(e) => setAqi2(e.target.value)}
              placeholder="Example: 82"
              className="mt-3 w-full rounded-2xl border border-slate-200 p-4 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-600">
              AQI 3 Hours Ago
            </label>

            <input
              type="number"
              value={aqi3}
              onChange={(e) => setAqi3(e.target.value)}
              placeholder="Example: 79"
              className="mt-3 w-full rounded-2xl border border-slate-200 p-4 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
            />
          </div>

        </div>

        <button
          onClick={handlePredict}
          disabled={loading}
          className="mt-8 bg-blue-600 hover:bg-blue-700 transition-all text-white px-10 py-4 rounded-2xl flex items-center gap-3 font-semibold shadow-lg"
        >
          <FaMagic />
          {loading ? "Predicting..." : "Predict AQI"}
        </button>

      </div>

      {result && (
        <div className="grid lg:grid-cols-3 gap-6">

          <PredictionCard
            title="Next 1 Hour"
            data={result.next_1_hour}
          />

          <PredictionCard
            title="Next 2 Hours"
            data={result.next_2_hours}
          />

          <PredictionCard
            title="Next 3 Hours"
            data={result.next_3_hours}
          />

        </div>
      )}

    </div>
  );
}

export default Prediction;