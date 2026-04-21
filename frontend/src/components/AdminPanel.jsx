import React, { useState } from "react";
import { getContract } from "../services/contract";
import { ensureHardhatNetwork, getShortError } from "../services/web3";

function AdminPanel() {
  const [verifierAddress, setVerifierAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddVerifier = async () => {
    if (loading) return;

    if (!verifierAddress.trim()) {
      alert("Please enter verifier wallet address");
      return;
    }

    try {
      setLoading(true);
      await ensureHardhatNetwork();

      const contract = await getContract();
      const tx = await contract.addVerifier(verifierAddress.trim());
      await tx.wait();

      alert("Verifier added successfully");
      setVerifierAddress("");
    } catch (error) {
      console.error(error);
      alert(getShortError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveVerifier = async () => {
    if (loading) return;

    if (!verifierAddress.trim()) {
      alert("Please enter verifier wallet address");
      return;
    }

    try {
      setLoading(true);
      await ensureHardhatNetwork();

      const contract = await getContract();
      const tx = await contract.removeVerifier(verifierAddress.trim());
      await tx.wait();

      alert("Verifier removed successfully");
      setVerifierAddress("");
    } catch (error) {
      console.error(error);
      alert(getShortError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel-card">
      <div className="panel-head">
        <div>
          <h2>Admin Panel</h2>
          <p>Manage verifier accounts</p>
        </div>
      </div>

      <div className="form-grid">
        <div className="input-group">
          <label>Verifier Wallet Address</label>
          <input
            type="text"
            placeholder="Enter verifier wallet address"
            value={verifierAddress}
            onChange={(e) => setVerifierAddress(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="action-row">
          <button
            className="primary-btn"
            onClick={handleAddVerifier}
            disabled={loading}
          >
            {loading ? "Processing..." : "Add Verifier"}
          </button>

          <button
            className="danger-btn"
            onClick={handleRemoveVerifier}
            disabled={loading}
          >
            Remove Verifier
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;