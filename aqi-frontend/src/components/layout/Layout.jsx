import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <main className="flex-1 overflow-y-auto">

        <div className="max-w-[1500px] mx-auto px-10 py-10">

          <Outlet />

        </div>

      </main>

    </div>
  );
}

export default Layout;