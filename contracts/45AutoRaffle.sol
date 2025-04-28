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
}
