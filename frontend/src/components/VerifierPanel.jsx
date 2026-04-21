import React, { useState } from "react";
import { getContract } from "../services/contract";
import { ensureHardhatNetwork, getShortError } from "../services/web3";

function VerifierPanel() {
  const [userAddress, setUserAddress] = useState("");
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);

  const runAction = async (action) => {
    if (loading) return;

    if (!userAddress.trim() || !remark.trim()) {
      alert("Please enter wallet address and remark");
      return;
    }

    try {
      setLoading(true);
      await ensureHardhatNetwork();

      const contract = await getContract();
      let tx;

      if (action === "approve") {
        tx = await contract.approveIdentity(userAddress.trim(), remark.trim());
      } else if (action === "reject") {
        tx = await contract.rejectIdentity(userAddress.trim(), remark.trim());
      } else if (action === "revoke") {
        tx = await contract.revokeIdentity(userAddress.trim(), remark.trim());
      } else {
        throw new Error("Invalid action");
      }

      await tx.wait();
      alert(`Identity ${action}d successfully`);
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
          <h2>Verifier Panel</h2>
          <p>Approve, reject, or revoke submitted identities</p>
        </div>
      </div>

      <div className="form-grid">
        <div className="input-group">
          <label>User Wallet Address</label>
          <input
            type="text"
            placeholder="Enter wallet address"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label>Remark / Reason</label>
          <input
            type="text"
            placeholder="Enter reason"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="action-row">
          <button className="primary-btn" onClick={() => runAction("approve")} disabled={loading}>
            {loading ? "Processing..." : "Approve"}
          </button>
          <button className="warn-btn" onClick={() => runAction("reject")} disabled={loading}>
            Reject
          </button>
          <button className="danger-btn" onClick={() => runAction("revoke")} disabled={loading}>
            Revoke
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifierPanel;