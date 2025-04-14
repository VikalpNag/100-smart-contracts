//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract StorageProxy {
    //EIP-1967 compliant storage slots
    bytes32 private constant IMPLEMENTATION_SLOT =
        keccak256("proxy.implementation");
    bytes32 private constant ADMIN_SLOT = keccak256(proxy.admin);
}
