//Be name khoda

// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract VoteToken is ERC20, AccessControl {

    mapping(address => bool) public isCandidate;
    mapping(uint => bool) public isVoteTokenMinted;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant SET_MINTING_STATUS_ROLE = keccak256("SET_MINTING_STATUS_ROLE");
    bytes32 public constant CLOSE_VOTING_ROLE = keccak256("CLOSE_VOTING_ROLE");

    bool public isMintingPauesd = false;
    bool public isVotingClose = false;

	constructor() ERC20("Vote Token", "VOTE") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        grantRole(MINTER_ROLE, msg.sender);
        grantRole(ADMIN_ROLE, msg.sender);
        grantRole(SET_MINTING_STATUS_ROLE, msg.sender);
        grantRole(CLOSE_VOTING_ROLE, msg.sender);
        _setupDecimals(0);
	}

	function mint(uint nationalCode, address to) external {
        require(!isMintingPauesd, "ERR: Minting is paused");
        require(hasRole(MINTER_ROLE, msg.sender), "ERR: Caller is not a minter");
        require(!isVoteTokenMinted[nationalCode], "ERR: Vote Token was minted for you");
        _mint(to, 1);
        emit MintVote(nationalCode, to, 1);
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(isCandidate[recipient], "ERR: You can only send your vote token to candidates' wallets");
        require(!isVotingClose, "ERR: Voting is closed");
        return super.transfer(recipient, amount);
    }

    function addCandidate(address candidate) external {
        require(hasRole(ADMIN_ROLE, msg.sender), "ERR: Caller is not an admin");
        isCandidate[candidate] = true;
		emit CandidateAdded(candidate);
	}

	function removeCandidate(address candidate) external {
        require(hasRole(ADMIN_ROLE, msg.sender), "ERR: Caller is not an admin");
        delete isCandidate[candidate];
		emit CandidateRemoved(candidate);
	}

    function setMintingStatue(bool newStatus) external {
        require(hasRole(SET_MINTING_STATUS_ROLE, msg.sender), "ERR: You can not toggle minting status");
        isMintingPauesd = newStatus;
		emit MintingToggled(newStatus);
	}

    function closeVoting() external {
        require(hasRole(CLOSE_VOTING_ROLE, msg.sender), "ERR: You can not close voting");
        require(!isVotingClose, "ERR: Voting have not been already closed");
        isVotingClose = true;
		emit VotingClosed(block.timestamp);
	}

    event MintVote(uint nationalCode, address to, uint amount);
    event CandidateRemoved(address candidate);
    event CandidateAdded(address candidate);
    event MintingToggled(bool newMintingStatus);
    event VotingClosed(uint time);
}

//Dar panah khoda