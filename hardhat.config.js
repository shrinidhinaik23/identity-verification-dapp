require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.24",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      chainId: 1337,
      accounts: [
        "0x0070facc1d0608c9361d4fa4d53f0162174ae0bb943c2f2f8828b7eefa6684d0"
      ],
    },
  },
};