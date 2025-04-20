//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract TimeLock {
    address public admin;
    uint256 public delay;

    mapping(bytes32 => bool) public queuedTransactions;

    event Queued(
        bytes32 txHash,
        address target,
        uint256 value,
        string signature,
        bytes data,
        uint eta
    );
    event Executed(
        bytes32 txHash,
        address target,
        uint256 value,
        string signature,
        bytes data,
        uint256 eta
    );
    event Cancelled(bytes32 txHash);
}
