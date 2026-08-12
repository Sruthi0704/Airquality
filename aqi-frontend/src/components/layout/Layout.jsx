import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed((current) => !current);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Sidebar collapsed={collapsed} onToggle={handleToggle} />

      <main className="flex-1 overflow-y-auto transition-all duration-300 ease-in-out">
        <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;