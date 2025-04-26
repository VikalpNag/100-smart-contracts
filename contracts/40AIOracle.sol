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

    constructor() {
        owner = msg.sender;
    }

    function requestDecision() external returns (uint256) {
        decisionCounter++;
        decisions[decisionCounter] = Decision({
            status: DecisionStatus.Pending,
            choice: AIChoice.Unknown
        });
        emit DecisionRequested(decisionCounter);
        return decisionCounter;
    }

    function fulfillDecision(
        uint256 _decisionId,
        AIChoice _choice
    ) external onlyOwner {
        Decision storage decision = decisions[_decisionId];
        require(decision.status == DecisionStatus.Pending, "Already fulfilled");

        decision.status = DecisionStatus.Fulfilled;
        decision.choice = _choice;

        emit DecisionFulfilled(_decisionId, _choice);
    }

    function actBasedOnDecision(
        uint256 _decisionId
    ) external view returns (string memory) {
        Decision storage decision = decisions[_decisionId];
        require(
            decision.status == DecisionStatus.Fulfilled,
            "Decision Not fulfilled yet"
        );

        if (decision.choice == AIChoice.Approve) {
            return "Action: Approved ✅";
        } else if (decision.choice == AIChoice.Reject) {
            return "Action: Rejected ❌";
        } else {
            return "Action: Unknown";
        }
    }
}
