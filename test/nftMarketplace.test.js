// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("NFT MarketPlace", function () {
//   let NFT, nft, MarketPlace, marketplace, owner, seller, buyer;

//   beforeEach(async () => {
//     [owner, seller, buyer] = await ethers.getSigners();

//     NFT = await ethers.getContractFactory("MyERC721");
//     nft = await NFT.deploy("TestNFT", "TNFT");
//     await nft.waitForDeployment();

//     Marketplace = await ethers.getContractFactory("NFTMarketplace");
//     marketplace = await Marketplace.deploy();
//     await marketplace.waitForDeployment();

//     // Mint and approve NFT
//     await nft.connect(seller).mint("ipfs://token1.json");
//     await nft.connect(seller).setApprovalForAll(marketplace.target, true);
//   });
// });
