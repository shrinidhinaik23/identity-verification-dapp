import React, { useState } from "react";
import { getContract } from "../services/contract";
import {
  ensureHardhatNetwork,
  getReadableStatus,
  getShortError,
} from "../services/web3";

function VerifyPage() {
  const [identityId, setIdentityId] = useState("");
  const [identity, setIdentity] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (loading) return;

    if (!identityId.trim()) {
      alert("Please enter identity ID");
      return;
    }

    try {
      setLoading(true);
      await ensureHardhatNetwork();

      const contract = await getContract();
      const result = await contract.getIdentityById(identityId.trim());

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
      setIdentity(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel-card verify-page-card">
      <div className="panel-head">
        <div>
          <h2>Public Verification</h2>
          <p>Verify identity by blockchain identity ID</p>
        </div>
      </div>

      <div className="verify-search-box">
        <div className="input-group">
          <label>Identity ID</label>
          <input
            type="text"
            placeholder="Enter identity ID"
            value={identityId}
            onChange={(e) => setIdentityId(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          className="primary-btn"
          onClick={handleVerify}
          disabled={loading}
          type="button"
        >
          {loading ? "Checking..." : "Verify Identity"}
        </button>
      </div>

      <div style={{ height: "18px" }}></div>

      {!identity ? (
        <div className="empty-box">
          Enter an identity ID to verify a record.
        </div>
      ) : (
        <div className="verify-result-card">
          <div className="identity-top">
            <div>
              <div className="mini-text">Identity ID</div>
              <h3>#{identity.identityId}</h3>
            </div>

            <span className={`status-badge status-${identity.status}`}>
              {getReadableStatus(identity.status)}
            </span>
          </div>

          <div className="verify-status-banner">
            {identity.status === "1" ? (
              <div className="verify-ok">
                ✅ This identity is verified on blockchain
              </div>
            ) : (
              <div className="verify-not-ok">
                ⚠ This identity is not fully verified
              </div>
            )}
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

export default VerifyPage;