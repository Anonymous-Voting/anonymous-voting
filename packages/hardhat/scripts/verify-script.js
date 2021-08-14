// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const cashTokenAddress = "0x86B60b67EC6Beeb4633e3C47349cf6d2655C80B6"; 
  const innerProductVerifierAddress = "0x73d78d5b4330F02C0699f677e376F84B81A43515"; 
  const zetherVerifierAddress = "0x530Af17eba6888F9887A76ce1008Bae3d7C44792"; 
  const burnVerifierAddress = "0x187ad6DE79f43D28Fb683641af749965263948ed"; 
  const ZSCAddress = "0x9c537BD6ca638Aefa03F749b8E18166160dEF446"; 
  
  await hre.run("verify:verify", {
		address: cashTokenAddress,
		constructorArguments: [],
	});

  await hre.run("verify:verify", {
		address: innerProductVerifierAddress,
		constructorArguments: [],
	});

  await hre.run("verify:verify", {
		address: zetherVerifierAddress,
		constructorArguments: [innerProductVerifierAddress],
	});

  await hre.run("verify:verify", {
		address: burnVerifierAddress,
		constructorArguments: [innerProductVerifierAddress],
	});

  await hre.run("verify:verify", {
		address: ZSCAddress,
		constructorArguments: [cashTokenAddress, zetherVerifierAddress, BurnVerifierAddress, "6"],
	});
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
