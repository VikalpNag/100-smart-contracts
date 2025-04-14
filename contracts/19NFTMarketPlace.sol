// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTMarketplace is ReentrancyGuard {
    struct Listing {
        address seller;
        uint256 price;
    }

    // nftAddress => tokenId => Listing
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
        require(IERC721(nft).ownerOf(tokenId) == spender, "Not the NFT owner");
        _;
    }

    modifier isListed(address nft, uint256 tokenId) {
        require(listings[nft][tokenId].price > 0, "NFT not listed");
        _;
    }

    // List NFT
    function listNFT(
        address nft,
        uint256 tokenId,
        uint256 price
    ) external isOwner(nft, tokenId, msg.sender) {
        require(price > 0, "Price must be greater than 0");
        IERC721(nft).transferFrom(msg.sender, address(this), tokenId);
        listings[nft][tokenId] = Listing(msg.sender, price);
        emit Listed(nft, tokenId, msg.sender, price);
    }

    // Cancel listing
    function cancelListing(
        address nft,
        uint256 tokenId
    )
        external
        isOwner(nft, tokenId, listings[nft][tokenId].seller)
        isListed(nft, tokenId)
    {
        IERC721(nft).transferFrom(address(this), msg.sender, tokenId);
        delete listings[nft][tokenId];
        emit Canceled(nft, tokenId, msg.sender);
    }

    // Buy NFT
    function buyNFT(
        address nft,
        uint256 tokenId
    ) external payable isListed(nft, tokenId) nonReentrant {
        Listing memory item = listings[nft][tokenId];
        require(msg.value >= item.price, "Insufficient payment");

        delete listings[nft][tokenId];
        IERC721(nft).transferFrom(address(this), msg.sender, tokenId);
        payable(item.seller).transfer(item.price);

        emit Bought(nft, tokenId, msg.sender, item.price);
    }

    // Get listing
    function getListing(
        address nft,
        uint256 tokenId
    ) external view returns (Listing memory) {
        return listings[nft][tokenId];
    }
}
