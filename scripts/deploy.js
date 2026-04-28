const hre = require("hardhat");

async function main() {
  const IdentityVerification = await hre.ethers.getContractFactory("IdentityVerification");
  const identityVerification = await IdentityVerification.deploy();

  await identityVerification.waitForDeployment();

  console.log("Contract deployed to:", await identityVerification.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});