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

    event VoteSubmitted(address voter, uint256 proposalId, bool support);

    constructor() EIP712(NAME, VERSION) {}

    function submitVote(
        address voter,
        uint256 proposalId,
        bool support,
        uint256 nonce,
        bytes calldata signature
    ) external {
        require(nonce == nonces[voter], "Invalid nonce");
        require(!hasVoted[proposalId][voter], "Already voted");

        bytes32 structHash = keccak256(
            abi.encode(VOTE_TYPEHASH, voter, proposalId, support, nonce)
        );

        bytes32 digest = _hashTypedDataV4(structHash);
        address signer = ECDSA.recover(digest, signature);
        require(signer == voter, "Invalid signature");

        // Mark vote
        hasVoted[proposalId][voter] = true;
        nonces[voter]++;

        if (support) {
            yesVotes[proposalId]++;
        } else {
            noVotes[proposalId]++;
        }

        emit VoteSubmitted(voter, proposalId, support);
    }

    function getVotes(
        uint256 proposalId
    ) external view returns (uint256 yes, uint256 no) {
        return (yesVotes[proposalId], noVotes[proposalId]);
    }
}
