import React from "react";
import AdminPanel from "../components/AdminPanel";
import SectionHeader from "../layout/SectionHeader";

function AdminPage() {
  return (
    <div className="dashboard-sections">
      <section className="section-block">
       
        <div className="grid-1">
          <AdminPanel />
        </div>
      </section>
    </div>
  );
}

export default AdminPage;