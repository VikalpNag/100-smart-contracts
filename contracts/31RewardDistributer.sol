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

    event RewardAssigned(address indexed contributer, uint256 amount);
    event RewardClaimed(address indexed contributer, uint256 amount);

    constructor(address _rewardToken) {
        rewardToken = IERC20(_rewardToken);
    }

    //Assign rewards to contributers
    function assignRewards(address[] callData contributors,uint256[] callData amounts)external onlyOwner{
            require(contributers.length==amounts.length,"Length Mismatch");
            for(uint256 i=0;i<contributors.length;i++){
                rewards[contributors[i]]+=amounts[i];
                emit RewardAssigned(Contributors[i],amounts[i]);
            }
    }
}
