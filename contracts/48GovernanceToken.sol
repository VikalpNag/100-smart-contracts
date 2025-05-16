// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract GovernanceToken is ERC20Votes, ERC20Permit, Ownable(msg.sender) {
    uint256 public maxSupply = 1000000 * 1e18;

    constructor()
        ERC20("GovernanceToken", "GT")
        ERC20Permit("GovernanceToken")
    {
        _mint(msg.sender, maxSupply);
    }
}
