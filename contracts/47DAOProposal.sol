// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DAOProposal {
    address public owner;
    uint256 public proposalCount;
    uint256 public quorum; //Minimum votes to pass a proposal
    uint256 public votingPeriod = 3 days;

    struct Proposal {
        uint256 id;
        string description;
        uint256 voteCount;
        uint256 deadline;
        bool executed;
        mapping(address => bool) voted;
    }

    mapping(uint256 => Proposal) public proposals;

    event ProposalCreated(uint256 id, string description, uint256 deadline);
    event Voted(uint256 id, address voter);
    event ProposalExecuted(uint256 id);

    constructor(uint256 _quorum) {
        owner = msg.sender;
        quorum = _quorum;
    }

    modifier onlyBeforeDeadline(uint256 _id) {
        require(block.timestamp < proposals[_id].deadline, "Voting ended");
        _;
    }
    modifier onlyAfterDeadline(uint256 _id) {
        require(block.timestamp >= proposals[_id].deadline, "Voting ongoing");
        _;
    }
}
