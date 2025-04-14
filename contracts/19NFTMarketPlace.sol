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

    modifier isOwner(
        address nft,
        uint256 tokenId,
        address spender
    ) {
        require(IERC721(nft).ownerOf(tokenId) == spender, "Not the nft owner");
        _;
    }

    modifier isListed(address nft, uint256 tokenId) {
        require(listings[nft][tokenId].price > 0;"NFT not listed");
        _;
    }
}
