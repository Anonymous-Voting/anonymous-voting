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

  const cashTokenAddress = "0x6190CaFbFC010b94e21678534c6259204E015B86"; 
  const innerProductVerifierAddress = "0x207eb5A12045e5e203A214646a2ba55733C78079"; 
  const zetherVerifierAddress = "0x97E34472320bfdb1714e5C6943816cb8a1ca599a"; 
  const burnVerifierAddress = "0x7e3c3b125Bc6Afd4C78EdB516E7740BB584DaD0f"; 
  const ZSCAddress = "0x327822092B19D55248D0F6A745828Fc90c99953E"; 
  
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
		constructorArguments: [cashTokenAddress, zetherVerifierAddress, burnVerifierAddress, "6"],
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
