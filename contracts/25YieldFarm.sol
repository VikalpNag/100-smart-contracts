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
}
