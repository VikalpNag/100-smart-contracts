//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract TimeLock {
    address public admin;
    uint256 public delay;

    mapping(bytes32 => bool) public queuedTransactions;
}
