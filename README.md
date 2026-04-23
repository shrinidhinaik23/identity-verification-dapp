# 🔐 Identity Verification DApp

Blockchain-powered identity system with QR-based verification

---

## 🚀 Overview

A full-stack decentralized identity verification platform that enables secure storage, retrieval, and public verification of identity records using blockchain and IPFS.

This system eliminates centralized trust by leveraging smart contracts + decentralized storage, ensuring tamper-proof and transparent identity validation.

---

## ✨ Key Features

- 🧾 Blockchain Identity Storage
  Store identity data securely on Ethereum (Hardhat network)

- 📡 IPFS Document Storage (Pinata)
  Upload and retrieve documents via decentralized storage

- 🔍 Public Verification System
  Anyone can verify identity using an ID (no login required)

- 📱 QR Code-Based Lookup
  Generate QR codes for instant identity verification

- 👤 Role-Based Access Control
  Admin / User permissions for secure operations

- 📊 Approval Workflow
  Multi-step verification with approval count tracking

- 🌐 Wallet Integration
  MetaMask-based authentication

---

## 🏗️ Architecture

Frontend (React + Vite)
        ↓
Smart Contract (Solidity + Hardhat)
        ↓
IPFS (Pinata)
        ↓
Backend (Node.js Upload Server)

---

## 🛠 Tech Stack

Layer| Technology
Frontend| React, Vite, CSS
Blockchain| Solidity, Hardhat
Web3| Ethers.js
Storage| IPFS (Pinata)
Backend| Node.js (Upload Server)
Wallet| MetaMask

---

## 📂 Project Structure

identity-verification-dapp/
│
├── contracts/        # Smart contracts (Solidity)
├── scripts/          # Deployment scripts
├── frontend/         # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── upload-server/    # Backend for file uploads
├── hardhat.config.js
├── package.json
└── README.md

---

## ⚙️ Setup Instructions

1️⃣ Clone Repository

git clone https://github.com/shrinidhinaik23/identity-verification-dapp.git

cd identity-verification-dapp

---

2️⃣ Install Dependencies

npm install
cd frontend
npm install

---

3️⃣ Run Hardhat Node

npx hardhat node

---

4️⃣ Deploy Smart Contract

npx hardhat run scripts/deploy.js --network localhost

---

5️⃣ Start Backend (Upload Server)

cd upload-server
npm start

---

6️⃣ Start Frontend

cd frontend
npm run dev

---



## 🧠 How It Works

1. User connects wallet via MetaMask
2. Identity data is stored in smart contract
3. Documents are uploaded to IPFS (Pinata)
4. Identity ID is generated
5. QR code is created for quick verification
6. Public users can verify identity via ID or QR

---

## 🔥 Future Improvements

- 🌍 Deploy to Ethereum Testnet (Sepolia)
- 📱 Mobile responsiveness optimization
- 🔐 Zero-Knowledge Proof integration
- ☁️ Cloud deployment (AWS / Vercel)
- 📊 Advanced analytics dashboard

---

## 🎯 Why This Project

- Demonstrates full-stack + blockchain integration
- Solves real-world problem of identity verification
- Showcases Web3 + modern frontend skills
- Production-ready architecture mindset

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork and improve.

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

Shrinidhi Naik
🔗 GitHub: https://github.com/shrinidhinaik23

---

⭐ If you like this project, give it a star!
