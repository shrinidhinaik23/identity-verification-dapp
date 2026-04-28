import { useEffect, useState } from "react";
import { getContract } from "../services/contract";
import { getCurrentWallet } from "../services/web3";

function HistoryViewer() {
  const [wallet, setWallet] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const currentWallet = await getCurrentWallet();
    setWallet(currentWallet);

    const contract = await getContract();

    const count = await contract.getHistoryCount(currentWallet);

    const items = [];
    for (let i = 0; i < Number(count); i++) {
      const h = await contract.getHistory(currentWallet, i);

      items.push({
        verifier: h[0],
        oldStatus: h[1].toString(),
        newStatus: h[2].toString(),
        timestamp: new Date(Number(h[3]) * 1000).toLocaleString(),
        remark: h[4],
      });
    }

    setHistory(items.reverse());
  };

  return (
    <div>
      <h2>My Identity History</h2>
      <p>Wallet: {wallet}</p>

      {history.length === 0 ? (
        <p>No history found</p>
      ) : (
        history.map((item, index) => (
          <div key={index}>
            <p><b>Verifier:</b> {item.verifier}</p>
            <p><b>Old Status:</b> {item.oldStatus}</p>
            <p><b>New Status:</b> {item.newStatus}</p>
            <p><b>Time:</b> {item.timestamp}</p>
            <p><b>Remark:</b> {item.remark}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default HistoryViewer;