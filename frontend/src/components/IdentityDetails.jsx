import React, { useState } from "react";
import { getContract } from "../services/contract";
import {
  ensureHardhatNetwork,
  getReadableStatus,
  getShortError,
} from "../services/web3";

function IdentityDetails() {
  const [identity, setIdentity] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchIdentity = async () => {
    if (loading) return;

    try {
      setLoading(true);
      await ensureHardhatNetwork();

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
      alert(getShortError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel-card">
      <div className="panel-head panel-head-row">
        <div>
          <h2>My Identity</h2>
          <p>Fetch your stored blockchain record</p>
        </div>

        <button className="secondary-btn" onClick={fetchIdentity} disabled={loading}>
          {loading ? "Fetching..." : "Fetch Identity"}
        </button>
      </div>

      {!identity ? (
        <div className="empty-box">No identity loaded yet.</div>
      ) : (
        <div className="identity-wrap">
          <div className="identity-top">
            <div>
              <div className="mini-text">Identity ID</div>
              <h3>#{identity.identityId}</h3>
            </div>
            <span className={`status-badge status-${identity.status}`}>
              {getReadableStatus(identity.status)}
            </span>
          </div>

          <div className="details-grid">
            <div className="detail-card">
              <span>Name</span>
              <strong>{identity.name}</strong>
            </div>

            <div className="detail-card">
              <span>ID Number</span>
              <strong>{identity.idNumber}</strong>
            </div>

            <div className="detail-card">
              <span>Wallet</span>
              <strong className="break-text">{identity.wallet}</strong>
            </div>

            <div className="detail-card">
              <span>Approval Count</span>
              <strong>{identity.approvalCount}</strong>
            </div>

            <div className="detail-card">
              <span>Document Hash</span>
              <strong className="break-text">{identity.documentHash}</strong>
            </div>

            <div className="detail-card">
              <span>Document CID</span>
              <strong className="break-text">{identity.documentCID}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IdentityDetails;