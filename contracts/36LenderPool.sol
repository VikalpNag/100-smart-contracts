//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IFlashLoanReceiver {
    function executeOperation(
        address token,
        uint256 amount,
        uint256 fee
    ) external;
}

contract LenderPool {
    IERC20 public token;
    uint256 public feeBasisPoints = 5; //0.05% fee

    constructor(address _token) {
        token = IERC20(_token);
    }
}
