// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("GasTank", function () {
//   let gasTank, owner, user1, user2, relayer;

//   beforeEach(async () => {
//     [owner, user1, user2, relayer] = await ethers.getSigners();

//     const GasTank = await ethers.getContractFactory("GasTank");
//     gasTank = await GasTank.deploy();
//     await gasTank.waitForDeployment();
//   });

//   it("Allows users to deposit ETH", async () => {
//     await gasTank
//       .connect(user1)
//       .depositForUser(user1.address, { value: ethers.parseEther("1") });

//     const balance = await gasTank.userBalance(user1.address);
//     expect(balance).to.equal(ethers.parseEther("1"));
//   });
// });
