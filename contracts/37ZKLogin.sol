// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract ZKLogin is Ownable {
    bytes32 public merkleRoot;
    mapping(address => bool) public verifiedUsers;

    event Verified(address indexed user);

    constructor(bytes32 _merkleRoot) {
        merkleRoot = _merkleRoot;
    }
}
