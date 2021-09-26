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

  
  const voteTokenAddress = "0x63bBe4C4423175BAfFC4E2b505f7687178de1eC9"; 
  const innerProductVerifierAddress = "0xbbd286B463e4Bc651Da63459902175F17c66EF09"; 
  const zetherVerifierAddress = "0xeF88408318Cd5B4Cf5Cd0e2C26Ae2562923e5B07"; 
  const burnVerifierAddress = "0x762D93a6A4614eeD9530820F64C22edC0fBEe0A6"; 
  const ZSCAddress = "0xe4ce84f077a1b8ac383925577eB9Be022B478f96"; 
  
  await hre.run("verify:verify", {
		address: voteTokenAddress,
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
		constructorArguments: [voteTokenAddress, zetherVerifierAddress, burnVerifierAddress, "30"],
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
