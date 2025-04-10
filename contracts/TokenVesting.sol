//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenVesting {
    address public immutable beneficiary;
    IERC20 public immutable token;

    uint256 public immutable start;
    uint256 public immutable duration;
    uint256 public immutable totalAmount;

    uint256 public released;
}
