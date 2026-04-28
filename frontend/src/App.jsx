import React from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import IdentityPage from "./pages/IdentityPage";
import VerifierPage from "./pages/VerifierPage";
import AdminPage from "./pages/AdminPage";
import SearchPage from "./pages/SearchPage";
import HistoryPage from "./pages/HistoryPage";
import PublicVerifyPage from "./pages/PublicVerifyPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="identity" element={<IdentityPage />} />
        <Route path="verify-requests" element={<VerifierPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="verify" element={<PublicVerifyPage />} />
      </Route>
    </Routes>
  );
}

export default App;