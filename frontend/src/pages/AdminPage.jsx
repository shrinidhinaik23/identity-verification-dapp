import React from "react";
import { useOutletContext } from "react-router-dom";
import AdminPanel from "../components/AdminPanel";

function AdminPage() {
  const { role } = useOutletContext();

  if (role !== "admin") {
    return (
      <div className="panel-card">
        <h2>Access Denied</h2>
        <p>Only admin can manage verifier accounts.</p>
      </div>
    );
  }

  return <AdminPanel />;
}

export default AdminPage;