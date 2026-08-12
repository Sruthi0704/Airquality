function PredictionCard({ title, data, confidence = 95 }) {
  if (!data) return null;

  const getColor = (category) => {
    switch (category) {
      case "Good":
        return "bg-emerald-500 text-white";
      case "Moderate":
        return "bg-amber-400 text-slate-900";
      case "Unhealthy for Sensitive Groups":
        return "bg-orange-500 text-white";
      case "Unhealthy":
        return "bg-red-500 text-white";
      case "Very Unhealthy":
        return "bg-violet-600 text-white";
      case "Hazardous":
        return "bg-red-800 text-white";
      default:
        return "bg-slate-500 text-white";
    }
  };

  return (
    <div className="group rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_45px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(15,23,42,0.08)] md:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
          {title}
        </p>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
          {confidence}%
        </span>
      </div>

      <div className="mt-6">
        <div className="flex items-end justify-between gap-3">
          <h1 className="text-5xl font-black leading-none tracking-[-0.06em] text-[#0F172A] md:text-[4.1rem]">
            {Number(data.aqi ?? 0).toFixed(2)}
          </h1>
          <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold ${getColor(data.category)}`}>
            {data.category}
          </span>
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            <span>Confidence</span>
            <span className="text-slate-600">{confidence}%</span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#2563EB] via-[#2563EB] to-[#22D3EE]"
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PredictionCard;