//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGaurd.sol";

contract NFTMarketplace is ReentrancyGaurd {
    struct Listing {
        address seller;
        uint256 price;
    }

    //nftaddress => tokenId => Listing
    mapping(address => mapping(uint256 => Listing)) public listings;
}
