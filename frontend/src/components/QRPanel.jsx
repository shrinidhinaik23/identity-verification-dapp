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
      setIdentity(null);
    } finally {
      setLoading(false);
    }
  };

  const copyIdentityId = async () => {
    if (!identity?.identityId) return;

    try {
      await navigator.clipboard.writeText(identity.identityId);
      alert("Identity ID copied");
    } catch (error) {
      console.error(error);
      alert("Failed to copy");
    }
  };

  return (
    <div className="panel-card">
      <div className="panel-head">
        <div>
          <h2>QR Lookup</h2>
          <p>Generate and verify identity using identity ID</p>
        </div>
      </div>

      <div className="form-grid">
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
          className="secondary-btn full-btn"
          onClick={handleLookup}
          disabled={loading}
          type="button"
        >
          {loading ? "Fetching..." : "Lookup Identity"}
        </button>
      </div>

      <div style={{ height: "18px" }}></div>

      {!identity ? (
        <div className="empty-box">No QR lookup result yet.</div>
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

          <div className="qr-card">
            <QRCodeCanvas
              value={identity.identityId}
              size={180}
              bgColor="#ffffff"
              fgColor="#111111"
              level="H"
              includeMargin
            />

            <div className="qr-info">
              <p className="mini-text">QR Encoded Value</p>
              <strong>{identity.identityId}</strong>
              <button
                className="secondary-btn"
                onClick={copyIdentityId}
                type="button"
              >
                Copy Identity ID
              </button>
            </div>
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

export default QRPanel;