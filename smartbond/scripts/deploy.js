// To deploy the SmartContract the ethers version must be over 6.0 because it cant read hre.ethers.parseEther. | npm i ethers@6.0
const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const maturityDate = currentTimestampInSeconds + 5 * 365 * 24 * 60 * 60;

  const faceValue = hre.ethers.parseEther("100");

  const issuerAddress = "0x1234567890123456789012345678901234567890";
  const priceFeedAddress = "0x0987654321098765432109876543210987654321";

  const smartbond = await hre.ethers.deployContract(
    "SmartBond",
    [
      "Musterfirma",
      issuerAddress,
      "Mustermann",
      maturityDate,
      faceValue,
      5,
      0,
      priceFeedAddress,
    ],
    {
      value: faceValue,
    }
  );

  await smartbond.waitForDeployment();

  const issuerSigner = await hre.ethers.getSigner(issuerAddress);
  const smartbondConnected = smartbond.connect(issuerSigner);

  console.log(
    `SmartBond with ${ethers.formatEther(
      faceValue
    )} ETH and unlock timestamp ${maturityDate} deployed to ${smartbond.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
