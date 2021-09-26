const VoteToken = artifacts.require("VoteToken");
const ZSC = artifacts.require("ZSC");
const Client = require('../../anonymous.js/src/client.js');

contract("Voting", async (accounts) => {
    let ali;
    let vahid;
    let mahdi;
    let navid;

    let candidate1Secret;
    let candidate2Secret;
    let candidate3Secret;
    let emptyVoteSecret;

    let candidate1Public;
    let candidate2Public;
    let candidate3Public;
    let emptyVotePublic;

    it("Check minting and approving", async () => {
        const vote = await VoteToken.deployed();
        const zsc = await ZSC.deployed();
        await vote.mint(2282670000, accounts[0], {from: accounts[0]});   // Ali
        await vote.mint(2282670001, accounts[1], {from: accounts[0]});   // Vahid
        await vote.mint(2282670002, accounts[2], {from: accounts[0]});   // Mahdi
        await vote.mint(2282670003, accounts[3], {from: accounts[0]});   // navid
        await new Promise((resolve) => setTimeout(resolve, 30000));
        await vote.setMintingStatue(false);

        await vote.approve(zsc.contract._address, 1000, {from: accounts[0]});
        await vote.approve(zsc.contract._address, 1000, {from: accounts[1]});
        await vote.approve(zsc.contract._address, 1000, {from: accounts[2]});
        await vote.approve(zsc.contract._address, 1000, {from: accounts[3]});

        await vote.addCandidate(zsc.address);
        await new Promise((resolve) => setTimeout(resolve, 30000));


        const balanceAli = await vote.balanceOf.call(accounts[0]);
        const balanceVahid = await vote.balanceOf.call(accounts[1]);
        const balanceMahdi = await vote.balanceOf.call(accounts[2]);
        const balanceNavid = await vote.balanceOf.call(accounts[3]);
       
        // assert.equal(
        //     balanceAli,
        //     1,
        //     "Minting failed"
        // );
        // assert.equal(
        //     balanceVahid,
        //     1,
        //     "Minting failed"
        // );
        // assert.equal(
        //     balanceMahdi,
        //     1,
        //     "Minting failed"
        // );
        // assert.equal(
        //     balanceNavid,
        //     1,
        //     "Minting failed"
        // );
    });

    it("should allow candidate registration", async () => {
        const vote = await VoteToken.deployed();
        const zsc = await ZSC.deployed();
        await vote.addCandidate(accounts[4]);
        await vote.addCandidate(accounts[5]);
        await vote.addCandidate(accounts[6]);
        await vote.addCandidate(accounts[7]);
        await new Promise((resolve) => setTimeout(resolve, 30000));

        const candidate1 = new Client(web3, zsc.contract, accounts[4]);
        const candidate2 = new Client(web3, zsc.contract, accounts[5]);
        const candidate3 = new Client(web3, zsc.contract, accounts[6]);
        const emptyVote = new Client(web3, zsc.contract, accounts[7]);
        await new Promise((resolve) => setTimeout(resolve, 30000));

        await candidate1.register();
        await candidate2.register();
        await candidate3.register();
        await emptyVote.register();
        candidate1Secret = candidate1.account.secret();
        candidate2Secret = candidate2.account.secret();
        candidate3Secret = candidate3.account.secret();
        emptyVoteSecret = emptyVote.account.secret();
        candidate1Public = candidate1.account.public();
        candidate2Public = candidate2.account.public();
        candidate3Public = candidate3.account.public();
        emptyVotePublic = emptyVote.account.public();
    });

    it("should allow registration", async () => {
        const zsc = await ZSC.deployed();
        ali = new Client(web3, zsc.contract, accounts[0]);
        vahid = new Client(web3, zsc.contract, accounts[1]);
        mahdi = new Client(web3, zsc.contract, accounts[2]);
        navid = new Client(web3, zsc.contract, accounts[3]);
        await new Promise((resolve) => setTimeout(resolve, 30000));

        await ali.register();
        await vahid.register();
        await mahdi.register();
        await navid.register();
    });

    it("should allow initialization", async () => {
        await ali.initialize(1);
        await vahid.initialize(1);
        await mahdi.initialize(1);
        await navid.initialize(1);
    });

    it("should allow voting", async () => {
        const zsc = await ZSC.deployed();
        const decoy1 = new Client(web3, zsc.contract, accounts[8]);
        const decoy2 = new Client(web3, zsc.contract, accounts[8]);
        const decoy3 = new Client(web3, zsc.contract, accounts[9]);
        const decoy4 = new Client(web3, zsc.contract, accounts[9]);
        const miner = new Client(web3, zsc.contract, accounts[9]);
        await new Promise((resolve) => setTimeout(resolve, 30000));

        await Promise.all([decoy1.register(), decoy2.register(), decoy3.register(), decoy4.register(), miner.register()]);
        ali.friends.add("Candidate 1", candidate1Public);
        vahid.friends.add("Candidate 1", candidate1Public);
        mahdi.friends.add("Candidate 1", candidate1Public);
        navid.friends.add("Candidate 1", candidate1Public);

        ali.friends.add("Candidate 2", candidate2Public);
        vahid.friends.add("Candidate 2", candidate2Public);
        mahdi.friends.add("Candidate 2", candidate2Public);
        navid.friends.add("Candidate 2", candidate2Public);

        ali.friends.add("Candidate 3", candidate3Public);
        mahdi.friends.add("Candidate 3", candidate3Public);
        vahid.friends.add("Candidate 3", candidate3Public);
        navid.friends.add("Candidate 3", candidate3Public);

        ali.friends.add("Empty Vote", emptyVotePublic);
        vahid.friends.add("Empty Vote", emptyVotePublic);
        mahdi.friends.add("Empty Vote", emptyVotePublic);
        navid.friends.add("Empty Vote", emptyVotePublic);

        ali.friends.add("Decoy 1", decoy1.account.public());
        vahid.friends.add("Decoy 1", decoy1.account.public());
        mahdi.friends.add("Decoy 1", decoy1.account.public());
        navid.friends.add("Decoy 1", decoy1.account.public());

        ali.friends.add("Decoy 2", decoy2.account.public());
        vahid.friends.add("Decoy 2", decoy2.account.public());
        mahdi.friends.add("Decoy 2", decoy2.account.public());
        navid.friends.add("Decoy 2", decoy2.account.public());
        
        ali.friends.add("Decoy 3", decoy3.account.public());
        vahid.friends.add("Decoy 3", decoy3.account.public());
        mahdi.friends.add("Decoy 3", decoy3.account.public());
        navid.friends.add("Decoy 3", decoy3.account.public());
        
        ali.friends.add("Decoy 4", decoy4.account.public());
        vahid.friends.add("Decoy 4", decoy4.account.public());
        mahdi.friends.add("Decoy 4", decoy4.account.public());
        navid.friends.add("Decoy 4", decoy4.account.public());

        ali.friends.add("Miner", miner.account.public());
        vahid.friends.add("Miner", miner.account.public());
        mahdi.friends.add("Miner", miner.account.public());
        navid.friends.add("Miner", miner.account.public());

        await ali.castBallot("Candidate 1", 1, ["Decoy 1", "Decoy 2"], "Miner");
        await new Promise((resolve) => setTimeout(resolve, 100000));
        await vahid.castBallot("Candidate 2", 1, ["Decoy 2", "Decoy 3"], "Miner");
        await new Promise((resolve) => setTimeout(resolve, 100000));
        await mahdi.castBallot("Empty Vote", 1, ["Decoy 2", "Decoy 4"], "Miner");
        await new Promise((resolve) => setTimeout(resolve, 100000));
        await navid.castBallot("Candidate 1", 1, ["Decoy 3", "Decoy 4"], "Miner");
        await new Promise((resolve) => setTimeout(resolve, 100000));

        candidate1 = new Client(web3, zsc.contract, accounts[4]);
        candidate2 = new Client(web3, zsc.contract, accounts[5]);
        candidate3 = new Client(web3, zsc.contract, accounts[6]);
        emptyVote = new Client(web3, zsc.contract, accounts[7]);

        await candidate1.register(candidate1Secret);
        await candidate2.register(candidate2Secret);
        await candidate3.register(candidate3Secret);
        await emptyVote.register(emptyVoteSecret);
        await new Promise((resolve) => setTimeout(resolve, 30000));

        assert.equal(
            candidate1.account.balance(),
            2,
            "Casting ballot failed for candidate 1"
        );

        assert.equal(
            candidate2.account.balance(),
            1,
            "Casting ballot failed for candidate 2"
        );

        assert.equal(
            candidate3.account.balance(),
            0,
            "Casting ballot failed for candidate 3"
        );

        assert.equal(
            emptyVote.account.balance(),
            1,
            "Casting ballot failed for empty vote"
        );
        const fee = await zsc.fee.call();
        assert.equal(
            miner.account.balance(),
            fee,
            "Fees failed"
        );
    });

    it("should allow finalize", async () => {
        const vote = await VoteToken.deployed();
        const zsc = await ZSC.deployed();

        candidate1 = new Client(web3, zsc.contract, accounts[4]);
        candidate2 = new Client(web3, zsc.contract, accounts[5]);
        candidate3 = new Client(web3, zsc.contract, accounts[6]);
        emptyVote = new Client(web3, zsc.contract, accounts[7]);

        await candidate1.register(candidate1Secret);
        await candidate2.register(candidate2Secret);
        await candidate3.register(candidate3Secret);
        await emptyVote.register(emptyVoteSecret);

        console.log(candidate1Secret);
        console.log(candidate2Secret);
        console.log(candidate3Secret);
        console.log(emptyVoteSecret);

        await candidate1.withdraw(candidate1.account.balance());
        await new Promise((resolve) => setTimeout(resolve, 10000));
        await candidate2.withdraw(candidate2.account.balance());
        await new Promise((resolve) => setTimeout(resolve, 10000));
        await candidate3.withdraw(candidate3.account.balance());
        await new Promise((resolve) => setTimeout(resolve, 10000));
        await emptyVote.withdraw(emptyVote.account.balance());
        await new Promise((resolve) => setTimeout(resolve, 10000));
        

        await vote.closeVoting();

        const balanceCandidate1 = await vote.balanceOf.call(accounts[4]);
        const balanceCandidate2 = await vote.balanceOf.call(accounts[5]);
        const balanceCandidate3 = await vote.balanceOf.call(accounts[6]);
        const balanceEmptyVote = await vote.balanceOf.call(accounts[7]);

        assert.equal(
            balanceCandidate1,
            2,
            "Withdraw failed for candidate 1"
        );

        assert.equal(
            balanceCandidate2,
            1,
            "Withdraw failed for candidate 2"
        );

        assert.equal(
            balanceCandidate3,
            0,
            "Withdraw failed for candidate 3"
        );

        assert.equal(
            balanceEmptyVote,
            1,
            "Withdraw failed for empty vote"
        );
    });
});