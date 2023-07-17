import { ethers } from "hardhat";

async function main() {
  const Gacert = await ethers.getContractFactory("Gacert");
  const gacert = await Gacert.deploy();

  await gacert.deployed();

  console.log("Gacert was deployed at ", gacert.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
