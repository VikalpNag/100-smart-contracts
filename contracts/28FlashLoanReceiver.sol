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
}
