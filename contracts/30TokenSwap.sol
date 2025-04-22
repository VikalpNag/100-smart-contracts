//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenSwap {
    IERC20 public tokenA;
    IERC20 public tokenB;

    uint256 public exchangeRate;

    event Swapped(
        address indexed user,
        address fromToken,
        address toToken,
        uint256 fromAmount,
        uint256 toAmount
    );
    event ExchangeRateUpdated(uint256 newRate);
}
