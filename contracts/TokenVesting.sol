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

    constructor(
        address _token,
        address _beneficiary,
        uint256 _start,
        uint256 _duration,
        uint256 _amount
    ) {
        require(_token != address(0), "Invalid token address");
        require(_beneficiary != address(0), "Invalid beneficiary address");
        require(_duration > 0, "Duration must be 0");

        token = IERC20(_token);
        beneficiary = _beneficiary;
        start = _start;
        duration = _duration;
        totalAmount = _amount;
    }

    function release() public {
        uint256 unreleased = vestedAmount() - released;
        require(unreleased > 0, "No tokens to release");

        released += unreleased;
        require(token.transfer(beneficiary, unreleased), "Transfer failed");
    }
}
