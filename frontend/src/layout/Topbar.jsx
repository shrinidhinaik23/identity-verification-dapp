import React from "react";
import WalletConnect from "../components/WalletConnect";

function Topbar({ wallet, setWallet, role }) {
  return (
    <header className="topbar">
      <div>
        <h1>Identity Verification DApp</h1>
        <p className="subtitle">
          Secure identity onboarding, verification, and blockchain-backed audit flow
        </p>
      </div>

      <div className="topbar-right">
        <div className={`role-pill role-${role}`}>{role.toUpperCase()}</div>
        <WalletConnect wallet={wallet} setWallet={setWallet} />
      </div>
    </header>
  );
}

export default Topbar;