// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AIOracle {
    enum DecisionStatus {
        Pending,
        Fulfilled
    }
    enum AIChoice {
        Unknown,
        Approve,
        Reject
    } //Example choices made by ai

    struct Decision {
        DecisionStatus status;
        AIChoice choice;
    }

    address public owner;
    mapping(uint256 => Decision) public decisions;
    uint256 public decisionCounter;

    event DecisionRequested(uint256 decisionId);
    event DecisionFulfilled(uint256 decisionId, AIChoice choice);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call");
        _;
    }
}
