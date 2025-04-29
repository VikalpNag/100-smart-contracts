// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DAOProposal {
    address public owner;
    uint256 public proposalCount;
    uint256 public quorum; //Minimum votes to pass a proposal
    uint256 public votingPeriod = 3 days;
}
