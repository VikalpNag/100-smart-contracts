//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract DAO {
    enum VoteType {
        Against,
        For,
        Abstain
    }

    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        address target;
        uint256 value;
        bytes callData;
        uint256 startTime;
        uint256 endTime;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 abstainVotes;
        bool executed;
        mapping(address => bool) hasVoted;
    }

    uint256 public proposalCount;
    uint256 public votingPeriod = 3 days;
    uint256 public quorumVotes = 1 ether; //Example:1 token=1 vote(based on balance)

    mapping(uint256 => Proposal) public proposals;

    IERC20 public governanceToken;

    event ProposalCreated(uint256 id, address proposer);
    event Voted(uint256 id, address voter, VoteType vote);
    event ProposalExecuted(uint256 id);

    constructor(address _token) {
        governanceToken = IERC20(_token);
    }

    modifier onlyTokenHolders() {
        require(
            governanceToken.balanceOf(msg.sender) > 0,
            "Must be token holder"
        );
        _;
    }

    function propose(
        address target,
        uint256 value,
        bytes calldata callData,
        string memory description
    ) external onlyTokenHolders returns (uint256) {
        proposalCount++;
        Proposal storage p = proposals[proposalCount];
        p.id = proposalCount;
        p.proposer = msg.sender;
        p.description = description;
        p.target = target;
        p.value = value;
        p.callData = callData;
        p.startTime = block.timestamp;
        p.endTime = block.timestamp + votingPeriod;

        emit ProposalCreated(proposalCount, msg.sender);
        return proposalCount;
    }

    function vote(
        uint256 proposalId,
        VoteType voteType
    ) external onlyTokenHolders {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp >= proposal.startTime, "Voting not started");
        require(block.timestamp <= proposal.endTime, "Voting ended");
        require(!proposal.hasVoted[msg.sender], "Already Voted");

        uint256 votes = governanceToken.balanceOf(msg.sender);
        proposal.hasVoted[msg.sender] = true;

        if (voteType == VoteType.For) {
            proposal.forVotes += votes;
        } else if (voteType == VoteType.Against) {
            proposal.againstVotes += votes;
        } else {
            proposal.abstainVotes += votes;
        }

        emit Voted(proposalId, msg.sender, voteType);
    }

    function executeProposal(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp > proposal.endTime, "Voting not ended");
        require(!proposal.executed, "Already Executed");

        uint256 totalVotes = proposal.forVotes +
            proposal.againstVotes +
            proposal.abstainVotes;
        require(totalVotes >= quorumVotes, "Quorom not reached ");
        require(
            proposal.forVotes > proposal.againstVotes,
            "Proposal not passed"
        );
        (bool success, ) = proposal.target.call{value: proposal.value}(
            proposal.callData
        );
        require(success, "Execution Failed");

        proposal.executed = true;
        emit ProposalExecuted(proposalId);
    }

    receive() external payable {}
}

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}
