// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Counter Contract", function () {
//   it("Returns Initial Counter as 0", async () => {
//     const Counter = await ethers.getContractFactory("Counter");
//     const counter = await Counter.deploy();
//     await counter.waitForDeployment();

//     expect(await counter.count()).to.be.equal("0");
//   });

//   it("Returns Increment", async () => {
//     const Counter = await ethers.getContractFactory("Counter");
//     const counter = await Counter.deploy();
//     await counter.waitForDeployment();

//     await counter.increament();
//     expect(await counter.count()).to.be.equal(1);
//   });

//   it("Returns Decreament", async () => {
//     const Counter = await ethers.getContractFactory("Counter");
//     const counter = await Counter.deploy();
//     await counter.waitForDeployment();

//     await counter.decreament();
//     expect(await counter.count()).to.be.equal(-1);
//   });
// });
