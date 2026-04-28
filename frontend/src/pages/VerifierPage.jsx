import React from "react";
import { useOutletContext } from "react-router-dom";
import VerifierPanel from "../components/VerifierPanel";

function VerifierPage() {
  const { role } = useOutletContext();

  if (role !== "admin" && role !== "verifier") {
    return (
      <div className="panel-card">
        <h2>Access Denied</h2>
        <p>Only admin or verifier can verify identities.</p>
      </div>
    );
  }

  return <VerifierPanel />;
}

export default VerifierPage;