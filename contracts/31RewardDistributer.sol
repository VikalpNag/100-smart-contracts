//SPDX-License_Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardDistributer is Ownable {
    IERC20 public rewardToken;

    //Mapping for contributer address to reward amount
    mapping(address => uint256) public rewards;

    //Track if user has claimed
    mapping(address => bool) public hasClaimed;
}
