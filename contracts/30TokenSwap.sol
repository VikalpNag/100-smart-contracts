//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenSwap {
    IERC20 public tokenA;
    IERC20 public tokenB;
    address public owner;

    uint256 public exchangeRate;

    event Swapped(
        address indexed user,
        address fromToken,
        address toToken,
        uint256 fromAmount,
        uint256 toAmount
    );
    event ExchangeRateUpdated(uint256 newRate);

    modifier onlyOwner() {
        require(msg.sender == owner, "Invalid owner");
        _;
    }

    constructor(address _tokenA, address _tokenB, uint256 _exchangeRate) {
        require(_exchangeRate > 0, "Invalid rate");
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
        exchangeRate = _exchangeRate;
    }

    function setExchangeRate(uint256 _newRate) external onlyOwner {
        require(_newRate > 0, "Rate must be greater than 0");
        exchangeRate = _newRate;
        emit ExchangeRateUpdated(_newRate);
    }
}
