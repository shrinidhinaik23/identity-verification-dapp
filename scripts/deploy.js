async function main() {
  const IdentityVerification = await ethers.getContractFactory("IdentityVerification");
  const contract = await IdentityVerification.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("✅ Contract deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});