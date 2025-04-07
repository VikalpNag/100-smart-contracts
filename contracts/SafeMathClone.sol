// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./SafeMathClone.sol";

contract MathWrapper {
    using SafeMathClone for uint256;

    function testAdd(uint256 a, uint256 b) public pure returns (uint256) {
        return a.add(b);
    }

    function testSub(uint256 a, uint256 b) public pure returns (uint256) {
        return a.sub(b);
    }
}
