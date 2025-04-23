// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InsuranceFund {
    struct Claim {
        address claimant;
        uint256 amount;
        string reason;
        bool approved;
        bool paid;
    }

    mapping(uint256 => Claim) public claims;
    uint256 public claimCount;

    mapping(address => uint256) public deposits;
    uint256 public totalPool;
}
