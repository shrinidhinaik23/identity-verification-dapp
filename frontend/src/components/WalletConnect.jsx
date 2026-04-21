import React, { useState } from "react";
import {
  connectWallet,
  ensureHardhatNetwork,
  getShortError,
} from "../services/web3";

function WalletConnect({ wallet, setWallet }) {
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    if (loading) return;

    try {
      setLoading(true);
      await ensureHardhatNetwork();
      const account = await connectWallet();
      setWallet(account);
    } catch (error) {
      console.error(error);
      alert(getShortError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wallet-box">
      {wallet ? (
        <div className="wallet-chip">
          <span className="wallet-dot"></span>
          <span>
            {wallet.slice(0, 6)}...{wallet.slice(-4)}
          </span>
        </div>
      ) : (
        <button className="primary-btn" onClick={handleConnect} disabled={loading}>
          {loading ? "Connecting..." : "Connect MetaMask"}
        </button>
      )}
    </div>
  );
}

export default WalletConnect;