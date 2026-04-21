import React, { useState } from "react";
import { getContract } from "../services/contract";

function getStatusLabel(status) {
  switch (status) {
    case "0":
      return "Pending";
    case "1":
      return "Verified";
    case "2":
      return "Rejected";
    case "3":
      return "Revoked";
    default:
      return "Unknown";
  }
}

function getStatusClass(status) {
  switch (status) {
    case "0":
      return "badge pending";
    case "1":
      return "badge verified";
    case "2":
      return "badge rejected";
    case "3":
      return "badge revoked";
    default:
      return "badge";
  }
}

function IdentityDetails() {
  const [identity, setIdentity] = useState(null);

  const fetchIdentity = async () => {
    try {
      const contract = await getContract();
      const result = await contract.getMyIdentity();

      setIdentity({
        identityId: result[0].toString(),
        wallet: result[1],
        name: result[2],
        idNumber: result[3],
        documentHash: result[4],
        documentCID: result[5],
        status: result[6].toString(),
        approvalCount: result[7].toString(),
      });
    } catch (error) {
      console.error(error);
      alert(
        error?.reason ||
          error?.shortMessage ||
          error?.message ||
          "Failed to fetch identity"
      );
    }
  };

  return (
    <div className="panel-card">
      <div className="panel-header panel-header-inline">
        <div>
          <h2>My Identity</h2>
          <p>View your on-chain identity record</p>
        </div>
        <button className="secondary-btn" onClick={fetchIdentity}>
          Fetch Identity
        </button>
      </div>

      {!identity ? (
        <div className="empty-state">
          <p>No identity loaded yet.</p>
        </div>
      ) : (
        <div className="identity-card">
          <div className="identity-top">
            <div>
              <p className="mini-label">Identity ID</p>
              <h3>#{identity.identityId}</h3>
            </div>
            <span className={getStatusClass(identity.status)}>
              {getStatusLabel(identity.status)}
            </span>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <span>Name</span>
              <strong>{identity.name}</strong>
            </div>

            <div className="detail-item">
              <span>ID Number</span>
              <strong>{identity.idNumber}</strong>
            </div>

            <div className="detail-item">
              <span>Wallet</span>
              <strong className="truncate">{identity.wallet}</strong>
            </div>

            <div className="detail-item">
              <span>Approval Count</span>
              <strong>{identity.approvalCount}</strong>
            </div>

            <div className="detail-item">
              <span>Document Hash</span>
              <strong className="truncate">{identity.documentHash}</strong>
            </div>

            <div className="detail-item">
              <span>Document CID</span>
              <strong className="truncate">{identity.documentCID}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IdentityDetails;