// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract IdentityNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    mapping(address => bool) public verifiers;
}
