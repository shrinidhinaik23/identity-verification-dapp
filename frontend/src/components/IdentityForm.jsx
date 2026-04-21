import React, { useState } from "react";
import { getContract } from "../services/contract";

function IdentityForm() {
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [documentHash, setDocumentHash] = useState("");
  const [documentCID, setDocumentCID] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const contract = await getContract();
      const tx = await contract.addIdentity(name, idNumber, documentHash, documentCID);
      await tx.wait();

      alert("Identity added successfully");

      setName("");
      setIdNumber("");
      setDocumentHash("");
      setDocumentCID("");
    } catch (error) {
      console.error(error);
      alert(
        error?.reason ||
          error?.shortMessage ||
          error?.message ||
          "Failed to add identity"
      );
    }
  };

  return (
    <div className="panel-card">
      <div className="panel-header">
        <div>
          <h2>Add Identity</h2>
          <p>Submit identity details for on-chain verification</p>
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
          />
        </div>

        <div className="input-group">
          <label>ID Number</label>
          <input
            type="text"
            placeholder="Enter ID number"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Document Hash</label>
          <input
            type="text"
            placeholder="Enter document hash"
            value={documentHash}
            onChange={(e) => setDocumentHash(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Document CID</label>
          <input
            type="text"
            placeholder="Enter IPFS CID"
            value={documentCID}
            onChange={(e) => setDocumentCID(e.target.value)}
          />
        </div>

        <button className="primary-btn full-width" type="submit">
          Submit Identity
        </button>
      </form>
    </div>
  );
}

export default IdentityForm;