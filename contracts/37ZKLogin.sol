// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract ZKLogin is Ownable {
    bytes32 public merkleRoot;
    mapping(address => bool) public verifiedUsers;

    event Verified(address indexed user);

    constructor(bytes32 _merkleRoot) Ownable(msg.sender) {
        merkleRoot = _merkleRoot;
    }

    function setMerkleRoot(bytes32 _newRoot) external onlyOwner {
        merkleRoot = _newRoot;
    }

    function verify(bytes32[] calldata proof) external {
        require(!verifiedUsers[msg.sender], "Already Verified");

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(MerkleProof.verify(proof, merkleRoot, leaf), "Invalid Proof");

        verifiedUsers[msg.sender] = true;
        emit Verified(msg.sender);
    }

    modifier onlyVerified() {
        require(verifiedUsers[msg.sender], "Not verified");
        _;
    }

    //Restricted function
    function accessRestrictedArea()
        external
        view
        onlyVerified
        returns (string memory)
    {
        return "Welcome to secret zone!";
    }
}
