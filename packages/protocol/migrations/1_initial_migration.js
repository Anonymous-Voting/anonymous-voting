var Migrations = artifacts.require("./Migrations.sol");

module.exports = (deployer) => {
    deployer.deploy(Migrations, {gas: 6721975, overwrite: false});
};