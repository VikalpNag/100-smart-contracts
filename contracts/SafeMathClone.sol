// SPDX-License-Identifier : Unlicense
pragma solidity ^0.8.0;

library SafeMathClone {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "addition overFLow");
        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a - b;
        require(b <= a, "Subtraction Underflow");
        return c;
    }
}
