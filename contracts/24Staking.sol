//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Staking is Ownable {
    IERC20 public immutable stakingToken;
    IERC20 public immutable rewardToken;

    uint256 public rewardRate = 100; //Tokens per second
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;

    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;

    uint256 public totalStaked;
    mapping(address => uint256) public balanceOf;

    constructor(address _stakingToken, address _rewardToken) {
        stakingToken = IERC20(_stakingToken);
        rewardToken = IERC20(_rewardToken);
    }

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;

        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }
        _;
    }

    function rewardPerToken() public view returns (uint256) {
        if (totalStaked == 0) return rewardPerTokenStored;
        return
            rewardPerTokenStored +
            (((block.timestamp - lastUpdateTime) * rewardRate * 1e18) /
                totalStaked);
    }
    function earned(address account) public view returns (uint256) {
        return
            (balanceOf[account] *
                (rewardPerToken() - userRewardPerTokenPaid[account])) /
            1e18 +
            rewards[account];
    }

    function stake(uint256 amount) external updateReward(msg.sender) {
        require(amount > 0, "Cannot stake 0");

        totalStaked += amount;
        balanceOf[msg.sender] += amount;
        stakingToken.transferFrom(msg.sender, address(this), amount);
    }
}
