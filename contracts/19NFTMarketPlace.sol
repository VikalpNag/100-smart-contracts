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

    event Listed(
        address indexed nft,
        uint256 indexed tokenId,
        address seller,
        uint256 price
    );
    event Canceled(
        address indexed nft,
        uint256 indexed tokenId,
        address seller
    );
    event Bought(
        address indexed nft,
        uint256 indexed tokenId,
        address buyer,
        uint256 price
    );
}
