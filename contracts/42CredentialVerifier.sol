// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CredentialVerifier {
    mapping(address => bytes32) public credentials;

    event CredintialStored(address indexed user, bytes32 credentialHash);
    event CredentialVerified(address indexed user);
}
