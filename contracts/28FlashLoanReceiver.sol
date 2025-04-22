//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FlashLoanReceiver {
    address public pool;
    address public owner;

    constructor(address _pool) {
        pool = _pool;
        owner = msg.sender;
    }

    function executeOperation(
        address token,
        uint256 amount,
        uint256 fee
    ) external {
        require(msg.sender == pool, "Caller must be Pool");

        //Simulate arbitrage or some profit logic
        //For now just approve+repay loan
        uint256 totalRepayment = amount + fee;
        IERC20(token).transfer(pool, totalRepayment);
    }
}
