import React, { useState } from "react";
import WalletConnect from "./components/WalletConnect";
import IdentityForm from "./components/IdentityForm";
import IdentityDetails from "./components/IdentityDetails";
import VerifierPanel from "./components/VerifierPanel";
import "./index.css";

function App() {
  const [wallet, setWallet] = useState("");

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div className="brand">
            <div className="brand-logo">ID</div>
            <div>
              <h2>IdentityVault</h2>
              <p>Verification DApp</p>
            </div>
          </div>

          <div className="sidebar-section">
            <p className="sidebar-label">Workspace</p>
            <div className="nav-item active">Dashboard</div>
            <div className="nav-item">Identities</div>
            <div className="nav-item">Verification</div>
            <div className="nav-item">Audit Trail</div>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="status-pill online">● Hardhat Local</div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Identity Verification DApp</h1>
            <p className="subtitle">
              Secure identity onboarding, verification, and audit tracking
            </p>
          </div>

          <WalletConnect setWallet={setWallet} wallet={wallet} />
        </header>

        <section className="hero-card">
          <div>
            <p className="hero-label">Connected Wallet</p>
            <h3 className="wallet-text">
              {wallet ? wallet : "No wallet connected"}
            </h3>
            <p className="hero-note">
              Connect MetaMask and submit identity details to store them on-chain.
            </p>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <span>Network</span>
              <strong>Hardhat Local</strong>
            </div>
            <div className="stat-card">
              <span>Security</span>
              <strong>Blockchain-backed</strong>
            </div>
            <div className="stat-card">
              <span>Status</span>
              <strong>{wallet ? "Connected" : "Waiting"}</strong>
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="left-column">
            <IdentityForm />
            <IdentityDetails />
          </div>

          <div className="right-column">
            <VerifierPanel />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;