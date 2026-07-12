import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdAnalytics,
  MdInfo,
} from "react-icons/md";
import { FaWind } from "react-icons/fa";

const menu = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard size={20} />,
  },
  {
    title: "Forecast AQI",
    path: "/prediction",
    icon: <FaWind size={18} />,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: <MdAnalytics size={20} />,
  },
  {
    title: "About",
    path: "/about",
    icon: <MdInfo size={20} />,
  },
];

function Sidebar() {
  return (
    <aside className="w-72 bg-white/95 backdrop-blur-md border-r border-slate-200 shadow-sm flex flex-col">

      {/* Brand */}

      <div className="px-8 pt-10 pb-8">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
            <FaWind size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              AirVision
            </h1>

            <p className="text-sm text-slate-500">
              Air Quality Intelligence
            </p>
          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-5">

        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 mb-3 rounded-xl font-medium transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg scale-[1.02]"
                  : "text-slate-600 hover:bg-slate-100 hover:translate-x-1"
              }`
            }
          >
            {item.icon}

            <span>{item.title}</span>

          </NavLink>
        ))}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-200 mt-8 p-6">

        <p className="text-xs font-semibold uppercase tracking-widest text-slate-600">
          Built With
        </p>

        <p className="mt-3 text-sm text-slate-500 leading-7">
          React
          <br />
          FastAPI
          <br />
          XGBoost
        </p>

        <p className="mt-6 text-xs text-slate-400">
          Version 1.0
        </p>

      </div>

    </aside>
  );
}

export default Sidebar;