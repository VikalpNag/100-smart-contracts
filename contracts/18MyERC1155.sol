//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

import "@openzepplin/contracts/token/ERC1155/ERC1155.sol";
import "@openzepplin/contracts/access/Ownable.sol";

contract MyERC1155 is ERC1155, Ownable {
    uint256 public constant GOLD = 1;
    uint256 public constant SILVER = 2;

    constructor(string memory _uri) ERC1155(_uri) {}
}
