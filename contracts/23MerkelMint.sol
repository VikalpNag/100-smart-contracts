// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MerkleMint is ERC721Enumerable, Ownable {
    bytes32 public merkleRoot;
    mapping(address => bool) public hasClaimed;
    uint256 public nextTokenId;

    constructor(
        address initialOwner,
        bytes32 _merkleRoot
    ) ERC721("Merkle NFT", "MNFT") Ownable(initialOwner) {
        merkleRoot = _merkleRoot;
        nextTokenId = 1;
    }

    function mint(bytes32[] calldata _proof) external {
        require(!hasClaimed[msg.sender], "Already claimed");

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(
            MerkleProof.verify(_proof, merkleRoot, leaf),
            "Not in Allowlist"
        );
        hasClaimed[msg.sender] = true;
        _safeMint(msg.sender, nextTokenId++);
    }

    function setMerkleRoot(bytes32 _newRoot) external onlyOwner {
        merkleRoot = _newRoot;
    }
}
