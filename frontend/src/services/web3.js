import { getEthereum, getProvider } from "./contract";

const HARDHAT_CHAIN_ID_HEX = "0x7a69";

export const connectWallet = async () => {
  const ethereum = getEthereum();

  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });

  return accounts[0];
};

export const getCurrentWallet = async () => {
  const ethereum = getEthereum();

  const accounts = await ethereum.request({
    method: "eth_accounts",
  });

  return accounts[0] || "";
};

export const getCurrentChainId = async () => {
  const ethereum = getEthereum();
  return ethereum.request({ method: "eth_chainId" });
};

export const ensureHardhatNetwork = async () => {
  const ethereum = getEthereum();
  const chainId = await getCurrentChainId();

  if (chainId === HARDHAT_CHAIN_ID_HEX) return true;

  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: HARDHAT_CHAIN_ID_HEX }],
    });
    return true;
  } catch (switchError) {
    if (switchError.code === 4902) {
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: HARDHAT_CHAIN_ID_HEX,
            chainName: "Hardhat Local",
            rpcUrls: ["http://127.0.0.1:8545"],
            nativeCurrency: {
              name: "Ethereum",
              symbol: "ETH",
              decimals: 18,
            },
          },
        ],
      });
      return true;
    }

    throw switchError;
  }
};

export const getReadableStatus = (status) => {
  switch (String(status)) {
    case "0":
      return "Pending";
    case "1":
      return "Verified";
    case "2":
      return "Rejected";
    case "3":
      return "Revoked";
    default:
      return "Unknown";
  }
};

export const getShortError = (error) => {
  return (
    error?.reason ||
    error?.shortMessage ||
    error?.info?.error?.message ||
    error?.message ||
    "Something went wrong"
  );
};

export const waitForWalletReady = async () => {
  await ensureHardhatNetwork();
  await getProvider();
};