// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AutoRaffle is Ownable(msg.sender) {
    address[] public participants;
    bool public raffleOpen = true;
    address public recentWinner;

    event Entered(address indexed participant);
    event WinnerPicked(address indexed winner, uint256 amount);

    modifier onlyWhenOpen() {
        require(raffleOpen, "Raffle is closed");
        _;
    }

    function enterRaffle() external payable onlyWhenOpen {
        require(msg.value > 0, "Must send ETH to enter");
        participants.push(msg.sender);

        emit Entered(msg.sender);
    }

    // Simulate Chainlink VRF randomness (admin-only for now)
    function pickWinner(uint256 randomNumber) external onlyOwner {
        require(participants.length > 0, "No participants");

        uint256 winnerIndex = randomNumber % participants.length;
        address winner = participants[winnerIndex];

        uint256 prizeAmount = address(this).balance;
        (bool success, ) = winner.call{value: prizeAmount}("");
        require(success, "Transfer failed");

        recentWinner = winner;
        emit WinnerPicked(winner, prizeAmount);

        // Reset the raffle
        delete participants;
    }
}
