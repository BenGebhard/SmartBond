const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  console.log("st");
  const [deployer] = await ethers.getSigners();

  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const maturityDate = currentTimestampInSeconds + 60;

  const bondholder = "0x4e18965ce3c6e6a3d47ba283724f52a1826d4380";
  const faceValue = ethers.utils.parseEther("100");
  const duration = 10000;
  const interestRate = 5;

  const SmartBond = await ethers.getContractFactory("SmartBond");
  const smartbond = await SmartBond.deploy(
    bondholder,
    faceValue,
    duration,
    interestRate
  );

  await smartbond.deployed();

  console.log("SmartBond deployed to:", smartbond.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
