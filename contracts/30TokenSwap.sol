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

    //Swap tokenA to tokenB
    function swapAtoB(uint256 amountA) external {
        require(amountA > 0, "Amount must be greater than 0");
        uint256 amountB = amountA * exchangeRate;

        require(
            tokenA.transferFrom(msg.sender, address(this), amountA),
            "Transfer A failed"
        );
        require(tokenB.transfer(msg.sender, amountB), "Transfer B failed");
        emit Swapped(
            msg.sender,
            address(tokenA),
            address(tokenB),
            amountA,
            amountB,
        );
    }

    //swap tokenB to tokenA
    function swapBtoA(uint256 amount)external{
        require(amountB>0,"Amount must be greater than 0");
        uint256 amountA=amountB/exchangeRate;
        require(amountA>0,"Insufficient amount");

        require(tokenB.transferFrom(msg.sender, address(this), amountB),"Transfer B failed");
        require(tokenA.transfer(msg.sender, amountA),"Transfer failed");

        emit Swapped(msg.sender,address(tokenB), address(tokenA),amountB, amountA);
    }
}
