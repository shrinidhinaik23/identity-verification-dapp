import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { getContract } from "../services/contract";
import {
  ensureHardhatNetwork,
  getReadableStatus,
  getShortError,
} from "../services/web3";

function QRPanel() {
  const [identityId, setIdentityId] = useState("");
  const [identity, setIdentity] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLookup = async () => {
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
    } finally {
      setLoading(false);
    }
  };

  const copyIdentityId = async () => {
    if (!identity?.identityId) return;
    await navigator.clipboard.writeText(identity.identityId);
    alert("Copied!");
  };

  return (
    <div className="panel-card">
      <div className="panel-head">
        <div>
          <h2>QR Lookup</h2>
          <p>Generate and verify identity using ID</p>
        </div>
      </div>

      <div className="form-grid">
        <div className="input-group">
          <label>Identity ID</label>
          <input
            type="number"
            placeholder="Enter identity ID"
            value={identityId}
            onChange={(e) => setIdentityId(e.target.value)}
          />
        </div>

        <button
          className="primary-btn full-btn"
          onClick={handleLookup}
        >
          {loading ? "Fetching..." : "Lookup Identity"}
        </button>
      </div>

      {!identity ? (
        <div className="empty-box">No result yet</div>
      ) : (
        <div className="identity-wrap">
          <div className="identity-top">
            <div>
              <span className="mini-text">Identity ID</span>
              <h3>#{identity.identityId}</h3>
            </div>

            <span className={`status-badge status-${identity.status}`}>
              {getReadableStatus(identity.status)}
            </span>
          </div>

          <div className="qr-card">
            <QRCodeCanvas value={identity.identityId} size={160} />
            <button className="secondary-btn" onClick={copyIdentityId}>
              Copy ID
            </button>
          </div>

          <div className="details-grid">
            <div className="detail-card"><span>Name</span><strong>{identity.name}</strong></div>
            <div className="detail-card"><span>ID</span><strong>{identity.idNumber}</strong></div>
            <div className="detail-card"><span>Wallet</span><strong className="break-text">{identity.wallet}</strong></div>
            <div className="detail-card"><span>Approvals</span><strong>{identity.approvalCount}</strong></div>
            <div className="detail-card"><span>Hash</span><strong className="break-text">{identity.documentHash}</strong></div>
            <div className="detail-card"><span>CID</span><strong className="break-text">{identity.documentCID}</strong></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QRPanel;