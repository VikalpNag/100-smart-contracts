//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

contract Counter {
    int256 public count;

    function increament() public {
        count += 1;
    }

    function decreament() public {
        count -= 1;
    }
}
