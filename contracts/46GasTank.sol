// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract GasTank is Ownable(msg.sender) {
    mapping(address => uint256) public balances;
    mapping(address => bool) public relayers;

    event Deposited(address indexed user, uint256 amount);
    event GasSpent(
        address indexed user,
        uint256 amount,
        address indexed relayer
    );
    event RelayerUpdated(address indexed relayer, bool allowed);

    modifier onlyRelayer() {
        require(relayers[msg.sender], "Not an authorized relayer");
        _;
    }

    // Deposit ETH for a user (can be self or others)
    function depositForUser(address user) external payable {
        require(msg.value > 0, "Must send ETH");
        balances[user] += msg.value;
        emit Deposited(user, msg.value);
    }
}
