import React from "react";
import VerifyPage from "../components/VerifyPage";
import QRPanel from "../components/QRPanel";
import SectionHeader from "../layout/SectionHeader";

function PublicVerifyPage() {
  return (
    <div className="dashboard-sections">
      <SectionHeader
        title="Public Verification"
        subtitle="Verify identity manually or use the QR-based lookup panel."
      />

      <section className="section-block">
        <div className="grid-2">
          <VerifyPage />
        </div>
      </section>
    </div>
  );
}

export default PublicVerifyPage;