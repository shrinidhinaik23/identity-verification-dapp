import React from "react";
import IdentityViewer from "../components/IdentityViewer";
import SectionHeader from "../layout/SectionHeader";

function SearchPage() {
  return (
    <div className="dashboard-sections">
      <section className="section-block">
       
        <div className="grid-1">
          <IdentityViewer />
        </div>
      </section>
    </div>
  );
}

export default SearchPage;