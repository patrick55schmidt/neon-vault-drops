const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying NeonVaultDrops contract...");

  // Get the contract factory
  const NeonVaultDrops = await ethers.getContractFactory("NeonVaultDrops");

  // Deploy the contract with a verifier address (you can change this)
  const verifierAddress = "0x1234567890123456789012345678901234567890"; // Replace with actual verifier address
  const neonVaultDrops = await NeonVaultDrops.deploy(verifierAddress);

  await neonVaultDrops.waitForDeployment();

  const contractAddress = await neonVaultDrops.getAddress();
  console.log("NeonVaultDrops deployed to:", contractAddress);
  console.log("Verifier address:", verifierAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
