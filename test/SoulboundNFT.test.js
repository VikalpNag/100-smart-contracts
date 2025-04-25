// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("SouldBound Contract", function () {
//   let soulbound, owner, user;

//   beforeEach(async () => {
//     [owner, user] = await ethers.getSigners();

//     const SouldBound = await ethers.getContractFactory("SoulBoundNFT");
//     soulbound = await SouldBound.deploy("Soulbound", "SBT");
//     await soulbound.waitForDeployment();
//   });

//   it("Should allow owner to mint", async () => {
//     await soulbound.mint(user.address);
//     expect(await soulbound.ownerOf(1)).to.be.equal(user.address);
//   });

//   it("Should prevent non-owner from minting",async()=>{

//   });
// });
