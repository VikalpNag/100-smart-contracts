// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CredentialVerifier {
    mapping(address => bytes32) public credentials;

    event CredintialStored(address indexed user, bytes32 credentialHash);
    event CredentialVerified(address indexed user);

    function storeCredential(bytes32 _credentialHash) external {
        credentials[msg.sender] = _credentialHash;
        emit CredentialStored(msg.sender, _credentialHash);
    }

    function verifyCredential(
        string calldata _credential
    ) external view returns (bool) {
        bytes32 providedHash = keccak256(abi.encodePacked(_credential));
        return providedHash == credentials[msg.sender];
    }
}
