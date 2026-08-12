const predictions = [
  {
    time: "09:00",
    aqi: 42,
    status: "Good",
  },
  {
    time: "10:00",
    aqi: 48,
    status: "Good",
  },
  {
    time: "11:00",
    aqi: 61,
    status: "Moderate",
  },
  {
    time: "12:00",
    aqi: 73,
    status: "Moderate",
  },
];

function RecentPredictions() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-6">
        Recent Predictions
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-3">
              Time
            </th>

            <th className="text-left">
              AQI
            </th>

            <th className="text-left">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {predictions.map((item, index) => (

            <tr
              key={index}
              className="border-b hover:bg-slate-50"
            >

              <td className="py-3">
                {item.time}
              </td>

              <td>
                {item.aqi}
              </td>

              <td>

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    item.status === "Good"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {item.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default RecentPredictions;