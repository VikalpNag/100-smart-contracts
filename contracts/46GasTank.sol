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

    // Relayer spends user's gas balance
    function spendGas(address user, uint256 amount) external onlyRelayer {
        require(balances[user] >= amount, "Insufficient balance");

        balances[user] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer to relayer failed");

        emit GasSpent(user, amount, msg.sender);
    }
}
