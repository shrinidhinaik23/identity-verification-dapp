import React, { useState } from "react";
import IdentityForm from "../components/IdentityForm";
import IdentityDetails from "../components/IdentityDetails";
import DocumentViewer from "../components/DocumentViewer";
import SectionHeader from "../layout/SectionHeader";

function IdentityPage() {
  const [myIdentity, setMyIdentity] = useState(null);

  return (
    <div className="dashboard-sections">
      <section className="section-block">
        
        <div className="grid-2">
          <IdentityForm />
          <IdentityDetails onIdentityLoaded={setMyIdentity} />
        </div>
        <div className="grid-1">
          <DocumentViewer identity={myIdentity} />
        </div>
      </section>
    </div>
  );
}

export default IdentityPage;