import { ethers } from "ethers";

export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const contractABI = [
  "function addIdentity(string _name,string _idNumber,string _documentHash,string _documentCID)",
  "function addVerifier(address verifier)",
  "function approveIdentity(address user,string remark)",
  "function rejectIdentity(address user,string remark)",
  "function revokeIdentity(address user,string reason)",
  "function getMyIdentity() view returns (uint256,address,string,string,string,string,uint8,uint256)",
  "function getIdentity(address user) view returns (uint256,address,string,string,string,string,uint8,uint256)",
  "function getHistoryCount(address user) view returns (uint256)",
  "function grantAccess(address viewer)",
  "function revokeAccess(address viewer)"
];

export const getContract = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(contractAddress, contractABI, signer);
};