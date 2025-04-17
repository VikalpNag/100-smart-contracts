//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract YielFarm is Ownable {
    struct StakeInfo {
        uint256 amount;
        uint256 startTime;
        uint256 rewardClaimed;
    }

    mapping(address => mapping(address => StakeInfo)) public stakes;
    mapping(address => uint256) public tokenAPY;
    address[] public supportedTokens;
}
