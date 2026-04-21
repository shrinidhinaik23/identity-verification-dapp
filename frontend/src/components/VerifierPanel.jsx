import React, { useState } from "react";
import { getContract } from "../services/contract";

function VerifierPanel() {
  const [userAddress, setUserAddress] = useState("");
  const [remark, setRemark] = useState("");

  const approve = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.approveIdentity(userAddress, remark);
      await tx.wait();
      alert("Identity approved successfully");
    } catch (error) {
      console.error(error);
      alert(
        error?.reason ||
          error?.shortMessage ||
          error?.message ||
          "Approval failed"
      );
    }
  };

  const reject = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.rejectIdentity(userAddress, remark);
      await tx.wait();
      alert(
        "Identity rejected successfully"
      );
    } catch (error) {
      console.error(error);
      alert(
        error?.reason ||
          error?.shortMessage ||
          error?.message ||
          "Reject failed"
      );
    }
  };

  const revoke = async () => {
    try {
      const contract = await getContract();
      const tx = await contract.revokeIdentity(userAddress, remark);
      await tx.wait();
      alert("Identity revoked successfully");
    } catch (error) {
      console.error(error);
      alert(
        error?.reason ||
          error?.shortMessage ||
          error?.message ||
          "Revoke failed"
      );
    }
  };

  return (
    <div className="panel-card verifier-card">
      <div className="panel-header">
        <div>
          <h2>Verifier Panel</h2>
          <p>Approve, reject, or revoke a submitted identity</p>
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
          />
        </div>

        <div className="input-group">
          <label>Remark / Reason</label>
          <input
            type="text"
            placeholder="Enter reason"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </div>

        <div className="action-row">
          <button className="primary-btn" onClick={approve}>
            Approve
          </button>
          <button className="warn-btn" onClick={reject}>
            Reject
          </button>
          <button className="danger-btn" onClick={revoke}>
            Revoke
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifierPanel;