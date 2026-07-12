import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { time: "8 AM", aqi: 32 },
  { time: "9 AM", aqi: 36 },
  { time: "10 AM", aqi: 42 },
  { time: "11 AM", aqi: 48 },
  { time: "12 PM", aqi: 44 },
  { time: "1 PM", aqi: 39 },
];

function AQIChart() {
  return (
    <div className="h-[420px] w-full">

      <ResponsiveContainer width="100%" height="100%">

        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >

          <CartesianGrid
            stroke="#E5E7EB"
            strokeDasharray="4 4"
          />

          <XAxis
            dataKey="time"
            tick={{ fill: "#64748B", fontSize: 13 }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tick={{ fill: "#64748B", fontSize: 13 }}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="aqi"
            stroke="#2563EB"
            strokeWidth={4}
            dot={{
              r: 5,
              fill: "#2563EB",
            }}
            activeDot={{
              r: 7,
            }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default AQIChart;