import React from "react";
import { useOutletContext, Link } from "react-router-dom";

function DashboardPage() {
  const { wallet, role } = useOutletContext();

  return (
    <div className="dashboard-sections">
      <section className="hero-card">
        <div>
          <div className="mini-text">Connected Wallet</div>
          <h3 className="wallet-title">{wallet || "No wallet connected"}</h3>
          <p className="hero-subtext">
            Navigate through dedicated modules instead of using one crowded dashboard.
          </p>
        </div>

        <div className="hero-stats">
          <div className="stat-box">
            <span>Network</span>
            <strong>Hardhat Local</strong>
          </div>
          <div className="stat-box">
            <span>Role</span>
            <strong>{role.toUpperCase()}</strong>
          </div>
          <div className="stat-box">
            <span>Status</span>
            <strong>{wallet ? "Connected" : "Disconnected"}</strong>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-title-wrap">
          <h2 className="section-title">Quick Access</h2>
          <p className="section-subtitle">Open the exact module you want to use</p>
        </div>

        <div className="grid-3">
          <Link to="/identity" className="nav-item panel-card">My Identity</Link>
          <Link to="/verify-requests" className="nav-item panel-card">Verify Requests</Link>
          
          <Link to="/search" className="nav-item panel-card">Search Identity</Link>
          <Link to="/history" className="nav-item panel-card">History</Link>
          
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;