//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract YieldFarm is Ownable {
    struct StakeInfo {
        uint256 amount;
        uint256 startTime;
        uint256 rewardClaimed;
    }

    mapping(address => mapping(address => StakeInfo)) public stakes;
    mapping(address => uint256) public tokenAPY;
    address[] public supportedTokens;

    event Staked(address indexed user, address indexed token, uint256 amount);
    event Withdrawn(
        address indexed user,
        address indexed token,
        uint256 amount,
        uint256 reward
    );

    function addSupportedToken(address token, uint256 apy) external onlyOwner {
        require(tokenAPY[token] == 0, "Token already supported");
        require(apy > 0, "APY must be positive");
        tokenAPY[token] = apy;
        supportedTokens.push(token);
    }

    function stake(address token, uint256 amount) external {
        require(tokenAPY[token] > 0, "Token not supported");
        require(amount > 0, "Amount must be greater than 0");

        IERC20(token).transferFrom(msg.sender, address(this), amount);
        StakeInfo storage stakeData = stakes[msg.sender][token];

        //accumulate previous rewards
        uint256 pending = calculateReward(msg.sender, token);
        stakeData.rewardClaimed += pending;

        stakeData.amount += amount;
        stakeData.startTime = block.timestamp;

        emit Staked(msg.sender, token, amount);
    }

    function withdraw(address token) external {
        StakeInfo storage stakeData = stakes[msg.sender][token];
        require(stakeData.amount > 0, "No tokens staked");

        uint256 reward = calculateReward(msg.sender, token) +
            stakeData.rewardClaimed;
        uint256 totalAmount = stakeData.amount;

        delete stakes[msg.sender][token];

        IERC20(token).transfer(msg.sender, totalAmount);
        payable(msg.sender).transfer(reward);

        emit Withdrawn(msg.sender, token, totalAmount, reward);
    }

    function calculateReward(
        address user,
        address token
    ) public view returns (uint256) {
        StakeInfo memory stakeData = stakes[user][token];
        if (stakeData.amount == 0) return 0;

        uint256 timeElapsed = block.timestamp - stakeData.startTime;
        uint256 apy = tokenAPY[token];

        // reward = amount * APY% * (timeElapsed / 365 days)
        return (stakeData.amount * apy * timeElapsed) / (100 * 365 days);
    }

    //fund this contract with ETH to Pay rewards
    receive() external payable {}
}
