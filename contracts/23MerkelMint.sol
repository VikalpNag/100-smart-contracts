// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MerkleMint is ERC721Enumerable, Ownable {
    bytes32 public merkleRoot;
    mapping(address => bool) public hasClaimed;
    uint256 public nextTokenId;

    constructor(
        string memory name,
        string memory symbol,
        bytes32 _merkleRoot
    ) ERC721(name, symbol) {
        merkleRoot = _merkleRoot;
        nextTokenId = 1;
    }
}
