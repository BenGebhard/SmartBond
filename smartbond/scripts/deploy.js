// To deploy the SmartContract the ethers version must be over 6.0 because it cant read hre.ethers.parseEther. | npm i ethers@6.0
const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const maturityDate = currentTimestampInSeconds + 5 * 365 * 24 * 60 * 60;

  const faceValue = hre.ethers.parseEther("100");

  const smartbond = await hre.ethers.deployContract(
    "SmartBond",
    [maturityDate, "Mustermann", "Musterfirma", 100, 0, 5],
    {
      value: faceValue,
    }
  );

  await smartbond.waitForDeployment();

  console.log(
    `SmartBond with ${ethers.formatEther(
      faceValue
    )}ETH and unlock timestamp ${maturityDate} deployed to ${smartbond.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
