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
//     await nft.mint(seller.address, "ipfs://token1.json");
//     await nft.connect(seller).setApprovalForAll(marketplace.target, true);
//   });

//   it("Should list a NFT", async () => {
//     await marketplace
//       .connect(seller)
//       .listNFT(nft.target, 0, ethers.parseEther("1"));
//     const listing = await marketplace.getListing(nft.target, 0);
//     expect(listing.price).to.equal(ethers.parseEther("1"));
//     expect(listing.seller).to.be.equal(seller.address);
//   });
// });
