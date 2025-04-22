//SPDX-License_Identifier:MIT
pragma solidity ^0.8.0;

contract DummyTarget {
    uint256 public value;

    function setValue(uint256 _val) public {
        value = _val;
    }
}
