import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DamageReport from "./pages/DamageReport";
import MaintenanceScheduling from "./pages/MaintenanceScheduling";
import UserManagement from "./pages/UserManagement";
import CostMonitoring from "./pages/CostMonitoring";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/damage-reports" element={<DamageReport />} />
        <Route path="/maintenance-scheduling" element={<MaintenanceScheduling />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/cost-monitoring" element={<CostMonitoring />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;