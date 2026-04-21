import React, { useState } from "react";
import axios from "axios";
import { getContract } from "../services/contract";
import { ensureHardhatNetwork, getShortError } from "../services/web3";

function IdentityForm() {
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [documentHash, setDocumentHash] = useState("");
  const [documentCID, setDocumentCID] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setIdNumber("");
    setDocumentHash("");
    setDocumentCID("");
    setSelectedFile(null);
  };

  const generateSHA256 = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const uploadToPinata = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("http://localhost:5000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.cid;
  };

  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      setSelectedFile(file);

      const realHash = await generateSHA256(file);
      setDocumentHash(realHash);

      const realCID = await uploadToPinata(file);
      setDocumentCID(realCID);
    } catch (error) {
      console.error(error);
      alert("Failed to process/upload selected file");
      setSelectedFile(null);
      setDocumentHash("");
      setDocumentCID("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!name.trim() || !idNumber.trim()) {
      alert("Please fill name and ID number");
      return;
    }

    if (!selectedFile) {
      alert("Please choose a document file");
      return;
    }

    if (!documentHash.trim() || !documentCID.trim()) {
      alert("Document hash/CID missing");
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
      e.target.reset();
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
          <label>Upload Document</label>
          <input
            type="file"
            onChange={handleFileChange}
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label>Generated SHA-256 Hash</label>
          <input
            type="text"
            value={documentHash}
            readOnly
            placeholder="Auto-generated after file selection"
          />
        </div>

        <div className="input-group">
          <label>Pinata CID</label>
          <input
            type="text"
            value={documentCID}
            readOnly
            placeholder="Auto-generated after Pinata upload"
          />
        </div>

        {selectedFile && (
          <div className="file-preview-box">
            <span className="mini-text">Selected File</span>
            <strong>{selectedFile.name}</strong>
          </div>
        )}

        <button
          className="primary-btn full-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Identity"}
        </button>
      </form>
    </div>
  );
}

export default IdentityForm;