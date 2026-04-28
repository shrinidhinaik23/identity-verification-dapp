import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
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
          <NavLink to="/" end className="nav-item">Dashboard</NavLink>
          <NavLink to="/identity" className="nav-item">My Identity</NavLink>
          <NavLink to="/verify-requests" className="nav-item">Verify Requests</NavLink>
          
          <NavLink to="/search" className="nav-item">Search Identity</NavLink>
          <NavLink to="/history" className="nav-item">History</NavLink>
          <NavLink to="/verify" className="nav-item">Public Verify</NavLink>
        </div>
      </div>

      <div className="network-pill">● Hardhat Local</div>
    </aside>
  );
}

export default Sidebar;