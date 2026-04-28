import { getEthereum, getProvider } from "./contract";

const GANACHE_CHAIN_ID_HEX = "0x539"; // 1337

export const connectWallet = async () => {
  const ethereum = getEthereum();

  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });

  return accounts[0] || "";
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
  return await ethereum.request({ method: "eth_chainId" });
};

export const ensureHardhatNetwork = async () => {
  const ethereum = getEthereum();
  const chainId = await getCurrentChainId();

  if (chainId === GANACHE_CHAIN_ID_HEX) return true;

  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: GANACHE_CHAIN_ID_HEX }],
    });
    return true;
  } catch (switchError) {
    if (switchError.code === 4902) {
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: GANACHE_CHAIN_ID_HEX,
            chainName: "Ganache 5777",
            rpcUrls: ["http://127.0.0.1:7545"],
            nativeCurrency: {
              name: "Ether",
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
  const value = Number(status);

  switch (value) {
    case 0:
      return "Pending";
    case 1:
      return "Verified";
    case 2:
      return "Rejected";
    case 3:
      return "Revoked";
    default:
      return "Unknown";
  }
};

export const getShortError = (error) => {
  const message =
    error?.reason ||
    error?.shortMessage ||
    error?.info?.error?.message ||
    error?.error?.message ||
    error?.message ||
    "Something went wrong";

  if (message.includes("user rejected")) {
    return "Transaction rejected in MetaMask";
  }

  if (message.includes("Identity not found")) {
    return "Identity not found";
  }

  if (message.includes("Identity already exists")) {
    return "Identity already exists for this wallet";
  }

  if (
    message.includes("Not authorized") ||
    message.includes("not verifier") ||
    message.includes("not admin") ||
    message.includes("Only admin") ||
    message.includes("Only verifier")
  ) {
    return "You are not authorized for this action";
  }

  if (message.includes("execution reverted")) {
    return "Transaction reverted. Check wallet role, wallet address, and whether identity exists.";
  }

  return message.replace("Error: ", "");
};

export const waitForWalletReady = async () => {
  await ensureHardhatNetwork();
  await getProvider();
};