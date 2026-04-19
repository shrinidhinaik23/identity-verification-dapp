# Identity Verification DApp 

## Overview
This project is a blockchain-based identity verification system built using Solidity and Hardhat.  
It securely stores identity data and allows verification through smart contracts.

---

## Features
- Identity creation
- Document hash storage
- Identity verification (approve / reject / revoke)
- Multi-verifier approval system
- Verification history tracking
- Role-based access (admin & verifier)
- IPFS-ready document storage (CID)

---

## Tech Stack
- Solidity
- Hardhat
- Ethers.js
- MetaMask

---

## Project Structure
contracts/
scripts/
hardhat.config.js

---

## How to Run

Install dependencies:
npm install

Start local blockchain:
npx hardhat node

Deploy contract:
npx hardhat run scripts/deploy.js --network localhost

Run test:
npx hardhat run scripts/testContract.js --network localhost

---

## Notes
- Only document hash and CID are stored on blockchain
- Actual files should be stored in IPFS or cloud
