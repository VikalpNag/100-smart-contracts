// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("MyERC721", function () {
//   let nft, owner, user;

//   beforeEach(async () => {
//     [owner, user] = await ethers.getSigners();

//     const MyERC721 = await ethers.getContractFactory("MyERC721");
//     nft = await MyERC721.deploy("MyNFT", "MNFT");
//     await nft.waitForDeployment();
//   });

//   it("Should mint nft with correct URI", async () => {
//     const uri = "ipfs://QmSomeCID";

//     await nft.connect(owner).mint(user.address, uri);

//     expect(await nft.ownerOf(0)).to.be.equal(user.address);
//     expect(await nft.tokenURI(0)).to.equal(uri);
//   });

//   it("Should not allow non owner to mint", async () => {
//     const uri = "ipfs://QmAnotherCID";

//     await expect(nft.connect(user).mint(user.address, uri)).to.be.reverted;
//   });

//   it("Should return token URI using getTokenURI()", async () => {
//     const uri = "ipfs://QmCID123";
//     await nft.connect(owner).mint(user.address, uri);

//     const storedURI = await nft.getTokenURI(0);
//     expect(storedURI).to.be.equal(uri);
//   });
// });
