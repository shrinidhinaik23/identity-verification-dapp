export const ADMIN_WALLETS = [
  "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266".toLowerCase()
];

export const VERIFIER_WALLETS = [
  "0x70997970c51812dc3a010c7d01b50e0d17dc79c8".toLowerCase()
];

export const getUserRole = (wallet) => {
  if (!wallet) return "guest";

  const normalized = wallet.toLowerCase();

  if (ADMIN_WALLETS.includes(normalized)) {
    return "admin";
  }

  if (VERIFIER_WALLETS.includes(normalized)) {
    return "verifier";
  }

  return "user";
};