import React, { useEffect, useState } from "react";
import WalletConnect from "./components/WalletConnect";
import IdentityForm from "./components/IdentityForm";
import IdentityDetails from "./components/IdentityDetails";
import VerifierPanel from "./components/VerifierPanel";
import { getCurrentWallet } from "./services/web3";
import "./index.css";

function App() {
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        const current = await getCurrentWallet();
        if (mounted && current) {
          setWallet(current);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();

    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        setWallet(accounts?.[0] || "");
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        mounted = false;
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <div className="brand-box">
            <div className="brand-logo">ID</div>
            <div>
              <h2>IdentityVault</h2>
              <p>Blockchain Verification</p>
            </div>
          </div>

          <div className="nav-box">
            <div className="nav-item active">Dashboard</div>
            <div className="nav-item">Identity</div>
            <div className="nav-item">Verification</div>
            <div className="nav-item">Audit</div>
          </div>
        </div>

        <div className="network-pill">● Hardhat Local</div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>Identity Verification DApp</h1>
            <p className="subtitle">
              Secure identity onboarding, verification, and audit tracking
            </p>
          </div>

          <WalletConnect wallet={wallet} setWallet={setWallet} />
        </header>

        <section className="hero-card">
          <div>
            <div className="mini-text">Connected Wallet</div>
            <h3 className="wallet-title">
              {wallet || "No wallet connected"}
            </h3>
            <p className="hero-subtext">
              Connect MetaMask on Hardhat Local and use one action at a time.
            </p>
          </div>

          <div className="hero-stats">
            <div className="stat-box">
              <span>Network</span>
              <strong>Hardhat Local</strong>
            </div>
            <div className="stat-box">
              <span>Mode</span>
              <strong>Development</strong>
            </div>
            <div className="stat-box">
              <span>Wallet</span>
              <strong>{wallet ? "Connected" : "Disconnected"}</strong>
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="column">
            <IdentityForm />
            <IdentityDetails />
          </div>

          <div className="column">
            <VerifierPanel />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;