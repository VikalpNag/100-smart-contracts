// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("ChainlinkKeeper contract", function () {
//   let keeperContract;
//   let interval;
//   let owner;

//   beforeEach(async () => {
//     [owner] = await ethers.getSigners();

//     interval = 5;
//     const Keeper = await ethers.getContractFactory("ChainlinkKeeper");
//     keeperContract = await Keeper.deploy(interval);
//     await keeperContract.waitForDeployment();
//   });

//   it("Initial state should be correct", async () => {
//     expect(await keeperContract.counter()).to.equal(0);
//   });

//   it("Should not need upkeep immediately", async () => {
//     const [upkeepNeeded] = await keeperContract.checkUpkeep("0x");
//     expect(upkeepNeeded).to.be.equal(false);
//   });

//   it("Should need upkeep after interval", async () => {
//     // Simulate time passage using evm_increaseTime
//     await ethers.provider.send("evm_increaseTime", [interval + 1]);
//     await ethers.provider.send("evm_mine");

//     const [upkeepNeeded] = await keeperContract.checkUpkeep("0x");
//     expect(upkeepNeeded).to.equal(true);
//   });

//   it("Should perform upkeep and increment counter", async () => {
//     await ethers.provider.send("evm_increaseTime", [interval + 1]);
//     await ethers.provider.send("evm_mine");

//     await keeperContract.performUpkeep("0x");

//     expect(await keeperContract.counter()).to.equal(1);
//   });
// });
