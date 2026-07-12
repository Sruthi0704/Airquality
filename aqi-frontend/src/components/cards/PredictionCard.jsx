function PredictionCard({ title, data }) {
  if (!data) return null;

  const getColor = (category) => {
    switch (category) {
      case "Good":
        return "bg-green-500";
      case "Moderate":
        return "bg-yellow-500";
      case "Unhealthy for Sensitive Groups":
        return "bg-orange-500";
      case "Unhealthy":
        return "bg-red-500";
      case "Very Unhealthy":
        return "bg-purple-600";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all">

      <p className="text-slate-500 uppercase tracking-wider text-sm">
        {title}
      </p>

      <h1 className="text-6xl font-black text-slate-800 mt-4">
        {data.aqi}
      </h1>

      <span
        className={`${getColor(data.category)} inline-block text-white rounded-full px-5 py-2 mt-6 font-semibold`}
      >
        {data.category}
      </span>

      <p className="text-slate-500 mt-6 leading-7">
        {data.advice}
      </p>

    </div>
  );
}

export default PredictionCard;