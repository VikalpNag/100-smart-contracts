//SPDX-License-Identifier:Unlicensed
pragma solidity ^0.8.0;

///@title Ownable clone:openzepplin's ownable library clone

contract OwnableClone {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );
}
