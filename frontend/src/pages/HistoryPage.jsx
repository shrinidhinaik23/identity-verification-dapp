import React from "react";
import HistoryViewer from "../components/HistoryViewer";
import SectionHeader from "../layout/SectionHeader";

function HistoryPage() {
  return (
    <div className="dashboard-sections">
      <section className="section-block">
        
        <div className="grid-1">
          <HistoryViewer />
        </div>
      </section>
    </div>
  );
}

export default HistoryPage;