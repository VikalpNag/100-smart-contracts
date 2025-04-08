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

    function contribute() public payable {
        require(block.timestamp < deadline, "Campaign ended");
        require(msg.value > 0, "Must send ETH");

        contributions[msg.sender] += msg.value;
        totalRaised += msg.value;

        emit Funded(msg.sender, msg.value);
    }

    function withdrawFunds() public {
        require(msg.sender == creator, "Only creator");
        require(block.timestamp >= deadline, "Campaign still active");
        require(totalRaised >= goal, "Funding goal not reached");
        require(!fundsWithdrawn, "Already funds withdrawn");

        fundsWithdrawn = true;
        payable(creator).transfer(totalRaised);

        emit Withdrawn(creator, totalRaised);
    }

    function refund() public {
        require(block.timestamp >= deadline, "Campaign still active");
        require(totalRaised < goal, "Goal was reached");
        uint amount = contributions[msg.sender];
        require(amount > 0, "No funds to refund");

        contributions[msg.sender] = 0;
        payable(msg.sender).transfer(amount);

        emit Refunded(msg.sender, amount);
    }

    function getTimeLeft() public view returns (uint) {
        if (block.timestamp >= deadline) return 0;
        return deadline - block.timestamp;
    }
}
