import React, { useState } from "react";
import { getContract } from "../services/contract";
import {
  ensureHardhatNetwork,
  getReadableStatus,
  getShortError,
} from "../services/web3";

function HistoryViewer() {
  const [searchAddress, setSearchAddress] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    if (loading) return;

    if (!searchAddress.trim()) {
      alert("Please enter wallet address");
      return;
    }

    try {
      setLoading(true);
      await ensureHardhatNetwork();

      const contract = await getContract();
      const countResult = await contract.getHistoryCount(searchAddress.trim());
      const count = Number(countResult.toString());

      if (count === 0) {
        setHistory([]);
        return;
      }

      const items = [];

      for (let i = 0; i < count; i++) {
        const h = await contract.getHistory(searchAddress.trim(), i);

        items.push({
          verifier: h[0],
          oldStatus: h[1].toString(),
          newStatus: h[2].toString(),
          timestamp: h[3].toString(),
          remark: h[4],
        });
      }

      setHistory(items.reverse());
    } catch (error) {
      console.error(error);
      alert(getShortError(error));
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (ts) => {
    const num = Number(ts);
    if (!num) return "N/A";
    return new Date(num * 1000).toLocaleString();
  };

  return (
    <div className="panel-card">
      <div className="panel-head">
        <div>
          <h2>History Viewer</h2>
          <p>See verification history for any wallet address</p>
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
          onClick={fetchHistory}
          disabled={loading}
        >
          {loading ? "Loading History..." : "View History"}
        </button>
      </div>

      <div style={{ height: "18px" }}></div>

      {history.length === 0 ? (
        <div className="empty-box">
          {loading ? "Loading history..." : "No history loaded yet."}
        </div>
      ) : (
        <div className="history-list">
          {history.map((item, index) => (
            <div className="history-card" key={index}>
              <div className="history-top">
                <span className={`status-badge status-${item.newStatus}`}>
                  {getReadableStatus(item.newStatus)}
                </span>
                <span className="history-time">
                  {formatTimestamp(item.timestamp)}
                </span>
              </div>

              <div className="history-body">
                <div className="history-row">
                  <span>Verifier</span>
                  <strong className="break-text">{item.verifier}</strong>
                </div>

                <div className="history-row">
                  <span>Old Status</span>
                  <strong>{getReadableStatus(item.oldStatus)}</strong>
                </div>

                <div className="history-row">
                  <span>New Status</span>
                  <strong>{getReadableStatus(item.newStatus)}</strong>
                </div>

                <div className="history-row">
                  <span>Remark</span>
                  <strong>{item.remark || "No remark"}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryViewer;