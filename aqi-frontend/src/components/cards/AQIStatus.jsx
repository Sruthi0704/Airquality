function AQIStatus() {
  return (
    <div className="flex flex-col items-center justify-center h-[420px]">

      <div className="w-48 h-48 rounded-full bg-green-500 flex items-center justify-center shadow-xl">

        <div className="text-center text-white">

          <h1 className="text-6xl font-black">
            42
          </h1>

          <p className="mt-2 text-lg">
            AQI
          </p>

        </div>

      </div>

      <h2 className="mt-10 text-4xl font-bold text-green-600">
        Good
      </h2>

      <p className="mt-5 text-center text-slate-500 leading-8 max-w-xs">
        Air quality is good.
        <br />
        Enjoy outdoor activities.
      </p>

    </div>
  );
}

export default AQIStatus;