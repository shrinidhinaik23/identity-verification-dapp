import React from "react";
import VerifierPanel from "../components/VerifierPanel";
import SectionHeader from "../layout/SectionHeader";

function VerifierPage() {
  return (
    <div className="dashboard-sections">
      <section className="section-block">
        
        <div className="grid-1">
          <VerifierPanel />
        </div>
      </section>
    </div>
  );
}

export default VerifierPage;