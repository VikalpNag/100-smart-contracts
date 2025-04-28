// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
contract ProofOfHumanity is Ownable {
    mapping(address => bool) public isRegistered;
    uint256 public totalHumans;

    event Registered(address indexed human);

    function register() external {
        require(!isRegistered[msg.sender], "Already Registered");

        isRegistered[msg.sender] = true;
        totalHumans++;

        emit Registered(msg.sender);
    }
}
