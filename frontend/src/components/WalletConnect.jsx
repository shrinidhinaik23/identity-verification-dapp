import React from "react";
import { connectWallet } from "../services/web3";

function WalletConnect({ setWallet, wallet }) {
  const handleConnect = async () => {
    try {
      const account = await connectWallet();
      if (account) setWallet(account);
    } catch (error) {
      console.error(error);
      alert(error?.message || "Failed to connect wallet");
    }
  };

  return (
    <div className="wallet-box">
      {wallet ? (
        <div className="wallet-connected">
          <span className="wallet-dot"></span>
          <span>
            {wallet.slice(0, 6)}...{wallet.slice(-4)}
          </span>
        </div>
      ) : (
        <button className="primary-btn" onClick={handleConnect}>
          Connect MetaMask
        </button>
      )}
    </div>
  );
}

export default WalletConnect;