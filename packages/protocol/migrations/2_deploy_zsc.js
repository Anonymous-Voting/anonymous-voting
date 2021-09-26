var InnerProductVerifier = artifacts.require("InnerProductVerifier");
var BurnVerifier = artifacts.require("BurnVerifier");
var ZetherVerifier = artifacts.require("ZetherVerifier");
var VoteToken = artifacts.require("VoteToken");
var ZSC = artifacts.require("ZSC");

module.exports = (deployer) => {
    return Promise.all([
        deployer.deploy(VoteToken, {gas: 6721975, overwrite: false }),
        deployer.deploy(InnerProductVerifier, { gas: 6721975, overwrite: false}).then(() => Promise.all([
            deployer.deploy(ZetherVerifier, InnerProductVerifier.address, { gas: 6721975, overwrite: false }),
            deployer.deploy(BurnVerifier, InnerProductVerifier.address, { gas: 6721975, overwrite: false })
        ]))
    ]).then(() => deployer.deploy(ZSC, VoteToken.address, ZetherVerifier.address, BurnVerifier.address, 30, {gas: 6721975, overwrite: false }));
}