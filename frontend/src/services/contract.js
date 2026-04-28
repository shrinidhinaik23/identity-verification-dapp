import { ethers } from "ethers";

export const contractAddress = "0x43Ba88249A3b57F5270C52861E06F247537cD40f";

export const contractABI = [
  "function addIdentity(string _name,string _idNumber,string _documentHash,string _documentCID)",
  "function addVerifier(address verifier)",
  "function removeVerifier(address verifier)",
  "function approveIdentity(address user,string remark)",
  "function rejectIdentity(address user,string remark)",
  "function revokeIdentity(address user,string reason)",
  "function getMyIdentity() view returns (uint256,address,string,string,string,string,uint8,uint256)",
  "function getIdentity(address user) view returns (uint256,address,string,string,string,string,uint8,uint256)",
  "function getIdentityById(uint256 _identityId) view returns (uint256,address,string,string,string,string,uint8,uint256)",
  "function getHistoryCount(address user) view returns (uint256)",
  "function getHistory(address user,uint256 index) view returns (address,uint8,uint8,uint256,string)",
  "function grantAccess(address viewer)",
  "function revokeAccess(address viewer)"
];

export const getEthereum = () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }
  return window.ethereum;
};

export const getProvider = async () => {
  const ethereum = getEthereum();
  return new ethers.BrowserProvider(ethereum);
};

export const getSigner = async () => {
  const provider = await getProvider();
  return provider.getSigner();
};

export const getContract = async () => {
  const signer = await getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};