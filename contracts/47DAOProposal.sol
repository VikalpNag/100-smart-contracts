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

    modifier proposalExists(uint256 _id) {
        require(_id < proposalCount, "Proposal does not exist");
        _;
    }

    function createProposal(string memory _description) external {
        Proposal storage p = proposals[proposalCount];
        p.id = proposalCount;
        p.description = _description;
        p.deadline = block.timestamp + votingPeriod;
        emit ProposalCreated(proposalCount, _description, p.deadline);
        proposalCount++;
    }

    function vote(
        uint256 _id
    ) external proposalExists(_id) onlyBeforeDeadline(_id) {
        Proposal storage p = proposals[_id];
        require(!p.voted[msg.sender], "Already voted");
        p.voted[msg.sender] = true;
        p.voteCount++;
        emit Voted(_id, msg.sender);
    }

    function executeProposal(
        uint256 _id
    ) external proposalExists(_id) onlyAfterDeadline(_id) {
        Proposal storage p = proposals[_id];
        require(!p.executed, "Already executed");
        require(p.voteCount >= quorum, "Not enough votes");
        p.executed = true;
        emit ProposalExecuted(_id);
        // You can add more logic here, like triggering another contract
    }
}
