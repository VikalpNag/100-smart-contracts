//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UpgradeableStorage {
    //Slot 0:uint256 value
    uint256 public value;
    //Slot 1 :address admin(Only used in  logic for simulation,not needed in minimal proxy)
    address public admin;

    function setValue(uint256 _value) external {
        value = _value;
    }
}
