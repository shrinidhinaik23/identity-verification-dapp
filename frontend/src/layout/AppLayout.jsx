import React, { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { getCurrentWallet } from "../services/web3";
import { getUserRole } from "../services/roles";

function AppLayout() {
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const current = await getCurrentWallet();
        setWallet(current || "");
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
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, []);

  const role = useMemo(() => getUserRole(wallet), [wallet]);

  return (
    <div className="app-shell">
      <Sidebar role={role} />
      <main className="main-content">
        <Topbar wallet={wallet} setWallet={setWallet} role={role} />
        <Outlet context={{ wallet, setWallet, role }} />
      </main>
    </div>
  );
}

export default AppLayout;