async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const IdentityVerification = await ethers.getContractFactory("IdentityVerification");
  const contract = await IdentityVerification.attach(contractAddress);

  // Get current account (signer)
  const [signer] = await ethers.getSigners();
  const userAddress = signer.address;

  console.log("User Address:", userAddress);

  // 🔹 Step 1: Add Identity
  console.log("🔹 Adding identity...");
  const tx1 = await contract.addIdentity("Shrinidhi", "ID123", "HASH123");
  await tx1.wait();
  console.log("✅ Identity added");

  // 🔹 Step 2: Verify Identity
  console.log("🔹 Verifying identity...");
  const tx2 = await contract.verifyIdentity(userAddress);
  await tx2.wait();
  console.log("✅ Identity verified");

  // 🔹 Step 3: Fetch Identity
  console.log("🔹 Fetching identity...");
  const result = await contract.getMyIdentity();

  console.log("Name:", result[0]);
  console.log("ID:", result[1]);
  console.log("Hash:", result[2]);
  console.log("Status:", result[3].toString()); // should be 1 after verification
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});