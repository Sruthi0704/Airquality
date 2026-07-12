import { useEffect, useState } from "react";
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

  return (
    <div>

      <h1 className="text-4xl font-bold">
        Analytics
      </h1>

      <p className="text-gray-500 mt-2">
        Model Performance & Dataset Analysis
      </p>

      {/* Dataset */}

      {dataset && (
        <div className="bg-white shadow rounded-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-5">
            Dataset Information
          </h2>

          <p><b>Filename:</b> {dataset.filename}</p>
          <p><b>Rows:</b> {dataset.rows}</p>
          <p><b>Columns:</b> {dataset.columns}</p>
          <p><b>Missing Values:</b> {dataset.missing_values}</p>

        </div>
      )}

      {/* Metrics */}

      {metrics && (
        <div className="bg-white shadow rounded-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-5">
            Model Metrics
          </h2>

          <pre className="text-sm">
            {JSON.stringify(metrics, null, 2)}
          </pre>

        </div>
      )}

      {/* Feature Importance */}

      {features.length > 0 && (
        <div className="bg-white shadow rounded-xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-5">
            Top 10 Important Features
          </h2>

          <table className="w-full">

            <thead>
              <tr className="border-b">
                <th className="text-left">Feature</th>
                <th className="text-left">Importance</th>
              </tr>
            </thead>

            <tbody>

              {features.map((item) => (
                <tr
                  key={item.feature}
                  className="border-b"
                >
                  <td>{item.feature}</td>
                  <td>{item.importance}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default Analytics;