const readline = require("readline");

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const IdentityVerification = await ethers.getContractFactory("IdentityVerification");
  const contract = await IdentityVerification.attach(contractAddress);

  const [admin, verifier1] = await ethers.getSigners();

  console.log("Admin Address:", admin.address);
  console.log("Verifier Address:", verifier1.address);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

  const name = await ask("Enter Name: ");
  const idNumber = await ask("Enter ID Number: ");
  const documentHash = await ask("Enter Document Hash: ");
  const documentCID = await ask("Enter Document CID: ");

  rl.close();

  console.log("🔹 Adding verifier...");
  const tx0 = await contract.addVerifier(verifier1.address);
  await tx0.wait();
  console.log("✅ Verifier added");

  console.log("🔹 Adding identity...");
  const tx1 = await contract.addIdentity(name, idNumber, documentHash, documentCID);
  await tx1.wait();
  console.log("✅ Identity added");

  console.log("🔹 Approving identity...");
  const contractAsVerifier = contract.connect(verifier1);
  const tx2 = await contractAsVerifier.approveIdentity(admin.address, "Verified by verifier");
  await tx2.wait();
  console.log("✅ Approval recorded");

  console.log("🔹 Fetching identity...");
  const result = await contract.getIdentity(admin.address);

  console.log("Identity ID:", result[0].toString());
  console.log("Wallet:", result[1]);
  console.log("Name:", result[2]);
  console.log("ID Number:", result[3]);
  console.log("Document Hash:", result[4]);
  console.log("Document CID:", result[5]);
  console.log("Status:", result[6].toString());
  console.log("Approval Count:", result[7].toString());

  console.log("🔹 Fetching history count...");
  const historyCount = await contract.getHistoryCount(admin.address);
  console.log("History Count:", historyCount.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});