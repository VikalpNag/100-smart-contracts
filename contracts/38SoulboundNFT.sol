// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SoulBound is ERC721, Ownable {
    uint256 private _tokenIdCounter;

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) Ownable(msg.sender) {}

    function mint(address to) external onlyOwner {
        _tokenIdCounter++;
        _mint(to, _tokenIdCounter);
    }

    //Disable all transfer:transfer , safeTransfer
    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal pure override {
        revert("SoulBound Tokens are non-transferable");
    }

    function approve(address to, uint256 tokenId) public pure override {
        revert("SoulBound Token cannot be approved");
    }

    function setApprovalForAll(
        address operator,
        bool approved
    ) public pure override {
        revert("SoulBound tokens cannot be approved");
    }
}
