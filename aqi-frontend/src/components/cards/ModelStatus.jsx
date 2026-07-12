function ModelStatus() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-6">
        Model Status
      </h2>

      <div className="space-y-5">

        <div className="flex justify-between">

          <span>model_t1.pkl</span>

          <span className="text-green-600 font-semibold">
            Loaded
          </span>

        </div>

        <div className="flex justify-between">

          <span>model_t2.pkl</span>

          <span className="text-green-600 font-semibold">
            Loaded
          </span>

        </div>

        <div className="flex justify-between">

          <span>model_t3.pkl</span>

          <span className="text-green-600 font-semibold">
            Loaded
          </span>

        </div>

      </div>

    </div>
  );
}

export default ModelStatus;