const hre = require("hardhat");

async function main() {
  // Get the example accounts we'll be working with.
  const [, newOwner] = await hre.ethers.getSigners();

  // We get the contract to deploy.
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();

  // Deploy the contract.
  await buyMeACoffee.deployed();
  console.log("BuyMeACoffee deployed to:", buyMeACoffee.address);

  // Change the owner
  const originalOwner = await buyMeACoffee.showOwner();
  console.log("Original owner is: " + originalOwner);
  await buyMeACoffee.changeOwner(newOwner.address);
  const modifiedOwner = await buyMeACoffee.showOwner();
  console.log("New owner is: " + modifiedOwner);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
