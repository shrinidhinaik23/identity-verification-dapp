export const ADMIN_WALLETS = [
  "0xb8108A6FcfB8b4c61714901bCFF40C6B422C8315".toLowerCase()
];

export const VERIFIER_WALLETS = [
  "0xb8108A6FcfB8b4c61714901bCFF40C6B422C8315".toLowerCase(),
  "0xBf64df84590D573BC963f814946eBEB33870705E".toLowerCase()
];

export const getUserRole = (wallet) => {
  if (!wallet) return "guest";

  const normalized = wallet.toLowerCase();

  if (ADMIN_WALLETS.includes(normalized)) return "admin";
  if (VERIFIER_WALLETS.includes(normalized)) return "verifier";

  return "user";
};