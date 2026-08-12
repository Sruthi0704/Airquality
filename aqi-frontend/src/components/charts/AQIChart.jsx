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
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 18,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid stroke="#E2E8F0" strokeDasharray="4 4" vertical={false} />

          <XAxis
            dataKey="time"
            tick={{ fill: "#64748B", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            tick={{ fill: "#64748B", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            domain={[20, 60]}
          />

          <Tooltip
            contentStyle={{
              borderRadius: 16,
              border: "1px solid #E2E8F0",
              boxShadow: "0 15px 35px rgba(15,23,42,0.08)",
            }}
          />

          <Line
            type="monotone"
            dataKey="aqi"
            stroke="#2563EB"
            strokeWidth={4}
            dot={{ r: 4, fill: "#2563EB" }}
            activeDot={{ r: 6, fill: "#22D3EE" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AQIChart;