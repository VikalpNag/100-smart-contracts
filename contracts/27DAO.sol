//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract DAO {
    enum VoteType {
        Against,
        For,
        Abstain
    }

    struct Propasal {
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

    mapping(uint256 => Propasal) public propasals;

    IERC20 public governanceToken;
}
