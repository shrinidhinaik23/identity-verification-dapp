import React, { useMemo, useState } from "react";
import { getContract } from "../services/contract";
import {
  ensureHardhatNetwork,
  getReadableStatus,
  getShortError,
} from "../services/web3";

function IdentityViewer() {
  const [searchAddress, setSearchAddress] = useState("");
  const [identity, setIdentity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const fileUrl = useMemo(() => {
    if (!identity?.documentCID) return "";
    return `https://gateway.pinata.cloud/ipfs/${identity.documentCID}`;
  }, [identity]);

  const handleSearch = async () => {
    if (loading) return;

    if (!searchAddress.trim()) {
      alert("Please enter wallet address");
      return;
    }

    try {
      setLoading(true);
      await ensureHardhatNetwork();

      const contract = await getContract();
      const result = await contract.getIdentity(searchAddress.trim());

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

      setShowPreview(false);
    } catch (error) {
      console.error(error);
      alert(getShortError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPreview = () => {
    if (!identity?.documentCID) {
      alert("No document CID found");
      return;
    }
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  return (
    <>
      <div className="panel-card">
        <div className="panel-head panel-head-row">
          <div>
            <h2>Identity Viewer</h2>
            <p>Fetch any user's identity by wallet address</p>
          </div>
        </div>

        <div className="form-grid">
          <div className="input-group">
            <label>User Wallet Address</label>
            <input
              type="text"
              placeholder="Enter wallet address"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            className="secondary-btn full-btn"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Fetching..." : "View Identity"}
          </button>
        </div>

        <div style={{ height: "18px" }}></div>

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

            <div className="document-actions">
              <button
                className="primary-btn"
                onClick={handleOpenPreview}
                type="button"
              >
                Preview Document
              </button>

              {fileUrl && (
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="secondary-btn doc-link-btn"
                >
                  Open in New Tab
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {showPreview && identity && (
        <div className="viewer-overlay" onClick={handleClosePreview}>
          <div
            className="viewer-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="viewer-topbar">
              <div>
                <h3>Document Preview</h3>
                <p>{identity.documentCID}</p>
              </div>

              <button
                className="close-btn"
                onClick={handleClosePreview}
                type="button"
              >
                ✕
              </button>
            </div>

            <div className="viewer-frame-wrap">
              <iframe
                src={fileUrl}
                title="Document Preview"
                className="viewer-frame"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default IdentityViewer;