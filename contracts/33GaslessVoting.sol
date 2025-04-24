//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

contract GaslessVoting is EIP712 {
    using ECDSA for bytes32;

    string public constant NAME = "GaslessVoting";
    string public constant VERSION = "1";

    bytes32 public constant VOTE_TYPEHASH =
        keccak256(
            "Vote(address voter,uint256 proposalId,bool support,uint256  nonce)"
        );

    struct Vote {
        address voter;
        uint256 proposalId;
        bool support;
        uint256 nonce;
    }

    mapping(address => uint256) public nonces;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(uint256 => uint256) public yesVotes;
    mapping(uint256 => uint256) public noVotes;
}
