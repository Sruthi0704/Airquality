import {
  FaWind,
  FaBrain,
  FaDatabase,
  FaChartLine,
  FaReact,
  FaPython,
} from "react-icons/fa";

import {
  SiFastapi,
  SiTailwindcss,
} from "react-icons/si";

function About() {
  const technologies = [
    {
      name: "React",
      icon: <FaReact className="text-sky-500 text-3xl" />,
    },
    {
      name: "FastAPI",
      icon: <SiFastapi className="text-green-600 text-3xl" />,
    },
    {
      name: "Python",
      icon: <FaPython className="text-yellow-500 text-3xl" />,
    },
    {
      name: "XGBoost",
      icon: <FaChartLine className="text-orange-500 text-3xl" />,
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="text-cyan-500 text-3xl" />,
    },
  ];

  const features = [
    {
      icon: <FaWind className="text-blue-600 text-2xl" />,
      title: "AQI Forecasting",
      desc: "Predicts Air Quality Index for the next 3 hours using machine learning.",
    },
    {
      icon: <FaBrain className="text-purple-600 text-2xl" />,
      title: "XGBoost Models",
      desc: "Three independently trained regression models for accurate forecasting.",
    },
    {
      icon: <FaDatabase className="text-green-600 text-2xl" />,
      title: "Dataset Analysis",
      desc: "Works with historical air quality datasets and engineered features.",
    },
    {
      icon: <FaChartLine className="text-orange-500 text-2xl" />,
      title: "Interactive Dashboard",
      desc: "Visualizes AQI trends, predictions and overall model performance.",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Header */}

      <section>
        <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold mb-4">
          ABOUT PROJECT
        </p>

        <h1 className="text-5xl font-black text-slate-900">
          AirVision AI
        </h1>

        <p className="mt-6 max-w-4xl text-lg text-slate-500 leading-8">
          AirVision AI is a machine learning powered Air Quality Forecasting
          platform that predicts future AQI values using XGBoost models and
          presents them through a modern React dashboard.
        </p>
      </section>

      {/* Features */}

      <section>
        <h2 className="text-3xl font-bold text-slate-900 mb-10">
          Key Features
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-1 transition duration-300"
            >
              <div className="mb-6">{feature.icon}</div>

              <h3 className="text-xl font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-4 text-slate-500 leading-8">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack */}

      <section>
        <h2 className="text-3xl font-bold text-slate-900 mb-10">
          Technology Stack
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center hover:-translate-y-1 transition duration-300"
            >
              {tech.icon}

              <h3 className="mt-5 font-semibold text-slate-800">
                {tech.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Model */}

      <section className="bg-white rounded-3xl shadow-lg p-10">
        <h2 className="text-3xl font-bold text-slate-900">
          Machine Learning Model
        </h2>

        <p className="mt-6 text-slate-500 leading-8">
          The application uses three independently trained XGBoost Regression
          models to forecast AQI values for the next one, two and three hours.
          The backend is developed using FastAPI while the frontend is built
          with React and Tailwind CSS to provide a responsive and interactive
          experience.
        </p>
      </section>
    </div>
  );
}

export default About;