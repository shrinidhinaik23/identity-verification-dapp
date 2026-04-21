import React, { useMemo, useState } from "react";

function DocumentViewer({ identity }) {
  const [isOpen, setIsOpen] = useState(false);

  const cid = identity?.documentCID || "";

  const fileUrl = useMemo(() => {
    if (!cid) return "";
    return `https://gateway.pinata.cloud/ipfs/${cid}`;
  }, [cid]);

  const openViewer = () => {
    if (!cid) {
      alert("No document CID found");
      return;
    }
    setIsOpen(true);
  };

  const closeViewer = () => {
    setIsOpen(false);
  };

  if (!identity) {
    return (
      <div className="panel-card">
        <div className="panel-head">
          <div>
            <h2>Document Viewer</h2>
            <p>Preview uploaded document from IPFS</p>
          </div>
        </div>

        <div className="empty-state">
          No identity loaded yet.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="panel-card">
        <div className="panel-head">
          <div>
            <h2>Document Viewer</h2>
            <p>Preview uploaded document from IPFS</p>
          </div>
        </div>

        <div className="doc-viewer-box">
          <div className="doc-row">
            <span className="mini-text">Document CID</span>
            <strong className="doc-cid">{cid || "Not available"}</strong>
          </div>

          <div className="doc-actions">
            <button
              type="button"
              className="primary-btn"
              onClick={openViewer}
              disabled={!cid}
            >
              View Document
            </button>

            {fileUrl && (
              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                className="secondary-btn link-btn"
              >
                Open in New Tab
              </a>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="viewer-overlay" onClick={closeViewer}>
          <div
            className="viewer-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="viewer-topbar">
              <div>
                <h3>Document Preview</h3>
                <p>{cid}</p>
              </div>

              <button
                type="button"
                className="close-btn"
                onClick={closeViewer}
              >
                ✕
              </button>
            </div>

            <div className="viewer-frame-wrap">
              <iframe
                src={fileUrl}
                title="IPFS Document Preview"
                className="viewer-frame"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DocumentViewer;