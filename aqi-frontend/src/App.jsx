import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Prediction from "./pages/Prediction/Prediction";
import Analytics from "./pages/Analytics/Analytics";
import About from "./pages/About/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="prediction" element={<Prediction />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;