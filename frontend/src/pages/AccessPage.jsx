import React from "react";
import AccessControlPanel from "../components/AccessControlPanel";
import SectionHeader from "../layout/SectionHeader";

function AccessPage() {
  return (
    <div className="dashboard-sections">
      <section className="section-block">
    
        <div className="grid-1">
          <AccessControlPanel />
        </div>
      </section>
    </div>
  );
}

export default AccessPage;