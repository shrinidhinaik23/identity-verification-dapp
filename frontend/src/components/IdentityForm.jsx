import React, { useState } from "react";
import { getContract } from "../services/contract";
import { ensureHardhatNetwork, getShortError } from "../services/web3";

function IdentityForm() {
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [documentHash, setDocumentHash] = useState("");
  const [documentCID, setDocumentCID] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setIdNumber("");
    setDocumentHash("");
    setDocumentCID("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!name.trim() || !idNumber.trim() || !documentHash.trim() || !documentCID.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await ensureHardhatNetwork();

      const contract = await getContract();
      const tx = await contract.addIdentity(
        name.trim(),
        idNumber.trim(),
        documentHash.trim(),
        documentCID.trim()
      );

      await tx.wait();
      alert("Identity added successfully");
      resetForm();
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
          <h2>Add Identity</h2>
          <p>Store your identity details on-chain</p>
        </div>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label>ID Number</label>
          <input
            type="text"
            placeholder="Enter ID number"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label>Document Hash</label>
          <input
            type="text"
            placeholder="Enter document hash"
            value={documentHash}
            onChange={(e) => setDocumentHash(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label>Document CID</label>
          <input
            type="text"
            placeholder="Enter document CID"
            value={documentCID}
            onChange={(e) => setDocumentCID(e.target.value)}
            disabled={loading}
          />
        </div>

        <button className="primary-btn full-btn" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Identity"}
        </button>
      </form>
    </div>
  );
}

export default IdentityForm;