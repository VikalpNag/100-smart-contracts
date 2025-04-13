// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("MyERC1155", function () {
//   let contract, owner, user;
//   const uri = "https://example.com/metadata/{id}.json";

//   beforeEach(async () => {
//     [owner, user] = await ethers.getSigners();
//     const MyERC1155 = await ethers.getContractFactory("MyERC1155");
//     contract = await MyERC1155.deploy(uri);
//     await contract.waitForDeployment();
//   });

//   it("Should Deploy with correct uri", async () => {
//     expect(await contract.uri(1)).to.be.equal(uri);
//   });

//   it("Owner can mint single token", async () => {
//     await contract.connect(owner).mint(user.address, 1, 100, "0x");
//     expect(await contract.balanceOf(user.address, 1)).to.equal(100);
//   });
// });
