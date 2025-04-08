//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

contract Crowdfunding {
    address public creator;
    uint public deadline;
    uint public goal;
    uint public totalRaised;
    bool public goalReached;
    bool public fundsWithdrawn;

    mapping(address => uint) public contributions;

    event Funded(address indexed backer, uint amount);
    event Refunded(address indexed backer, uint amount);
    event Withdrawn(address indexed creator, uint amount);

    constructor(uint _durationInSeconds, uint _goal) {
        require(_durationInSeconds > 0, "Duration must be positive");
        require(_goal > 0, "Goal must be positive");

        creator = msg.sender;
        deadline = block.timestamp + _durationInSeconds;
        goal = _goal;
    }
}
