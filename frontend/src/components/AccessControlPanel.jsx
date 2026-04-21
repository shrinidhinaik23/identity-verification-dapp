import React, { useEffect, useState } from "react";
import { getContract } from "../services/contract";
import {
  ensureHardhatNetwork,
  getCurrentWallet,
  getShortError,
} from "../services/web3";

function AccessControlPanel() {
  const [viewerAddress, setViewerAddress] = useState("");
  const [ownerWallet, setOwnerWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastAction, setLastAction] = useState("");
  const [statusType, setStatusType] = useState("");

  useEffect(() => {
    const loadWallet = async () => {
      try {
        const wallet = await getCurrentWallet();
        setOwnerWallet(wallet || "");
      } catch (error) {
        console.error(error);
      }
    };

    loadWallet();
  }, []);

  const validateInput = () => {
    if (!viewerAddress.trim()) {
      alert("Please enter viewer wallet address");
      return false;
    }

    if (ownerWallet && viewerAddress.trim().toLowerCase() === ownerWallet.toLowerCase()) {
      alert("Owner wallet and viewer wallet cannot be the same");
      return false;
    }

    return true;
  };

  const handleGrantAccess = async () => {
    if (loading) return;
    if (!validateInput()) return;

    try {
      setLoading(true);
      setLastAction("");
      setStatusType("");

      await ensureHardhatNetwork();

      const contract = await getContract();
      const tx = await contract.grantAccess(viewerAddress.trim());
      await tx.wait();

      setLastAction(`Access granted to ${viewerAddress.trim()}`);
      setStatusType("success");
      setViewerAddress("");
    } catch (error) {
      console.error(error);
      setLastAction(getShortError(error));
      setStatusType("error");
      alert(getShortError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeAccess = async () => {
    if (loading) return;
    if (!validateInput()) return;

    try {
      setLoading(true);
      setLastAction("");
      setStatusType("");

      await ensureHardhatNetwork();

      const contract = await getContract();
      const tx = await contract.revokeAccess(viewerAddress.trim());
      await tx.wait();

      setLastAction(`Access revoked from ${viewerAddress.trim()}`);
      setStatusType("warning");
      setViewerAddress("");
    } catch (error) {
      console.error(error);
      setLastAction(getShortError(error));
      setStatusType("error");
      alert(getShortError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleCopyOwnerWallet = async () => {
    if (!ownerWallet) {
      alert("No connected wallet found");
      return;
    }

    try {
      await navigator.clipboard.writeText(ownerWallet);
      alert("Owner wallet copied");
    } catch (error) {
      console.error(error);
      alert("Failed to copy wallet");
    }
  };

  return (
    <div className="panel-card">
      <div className="panel-head">
        <div>
          <h2>Access Control</h2>
          <p>Grant or revoke identity view access</p>
        </div>
      </div>

      <div className="form-grid">
        <div className="input-group">
          <label>Owner Wallet</label>
          <div className="wallet-inline-box">
            <input
              type="text"
              value={ownerWallet}
              readOnly
              placeholder="Connected wallet will appear here"
            />
            <button
              type="button"
              className="secondary-btn"
              onClick={handleCopyOwnerWallet}
            >
              Copy
            </button>
          </div>
        </div>

        <div className="input-group">
          <label>Viewer Wallet Address</label>
          <input
            type="text"
            placeholder="Enter viewer wallet address"
            value={viewerAddress}
            onChange={(e) => setViewerAddress(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="action-row">
          <button
            className="primary-btn"
            onClick={handleGrantAccess}
            disabled={loading}
            type="button"
          >
            {loading ? "Processing..." : "Grant Access"}
          </button>

          <button
            className="danger-btn"
            onClick={handleRevokeAccess}
            disabled={loading}
            type="button"
          >
            {loading ? "Processing..." : "Revoke Access"}
          </button>
        </div>
      </div>

      {lastAction && (
        <div className={`access-status-box ${statusType}`}>
          <span className="mini-text">Latest Action</span>
          <strong>{lastAction}</strong>
        </div>
      )}
    </div>
  );
}

export default AccessControlPanel;