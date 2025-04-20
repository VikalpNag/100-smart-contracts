// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("TimeLock contract", function () {
//   let owner, proposer, executor, target;
//   let timelock;

//   const MIN_DELAY = 3600; //1 hour

//   beforeEach(async () => {
//     [owner, proposer, executor, target] = await ethers.getSigners();

//     const TimeLock = await ethers.getContractFactory("TimeLock");
//     timelock = await TimeLock.deploy(owner.address, MIN_DELAY);
//     await timelock.waitForDeployment();
//   });

//   it("Should deploy with correct admin and delay", async () => {
//     expect(await timelock.admin()).to.be.equal(owner.address);
//     expect(await timelock.delay()).to.be.equal(MIN_DELAY);
//   });

//   it("Should queue a transaction", async () => {
//     const eta = Math.floor(Date.now() / 1000) + MIN_DELAY + 100;
//     const txData = ethers.AbiCoder.defaultAbiCoder().encode(["uint256"], [42]);
//     const txHash = await timelock.getTxHash(target.address, 0, "", txData, eta);

//     await expect(timelock.queueTransaction(target.address, 0, "", txData, eta))
//       .to.emit(timelock, "Queued")
//       .withArgs(txHash, target.address, 0, "", txData, eta);

//     expect(await timelock.queuedTransactions(txHash)).to.be.true;
//   });

//   it("Should cancel a queued transaction", async () => {
//     const eta = Math.floor(Date.now() / 1000) + MIN_DELAY + 100;
//     const txData = ethers.AbiCoder.defaultAbiCoder().encode(["uint256"], [42]);
//     const txHash = await timelock.getTxHash(target.address, 0, "", txData, eta);

//     await timelock.queueTransaction(target.address, 0, "", txData, eta);
//     await expect(timelock.cancelTransaction(target.address, 0, "", txData, eta))
//       .to.emit(timelock, "Cancelled")
//       .withArgs(txHash);

//     expect(await timelock.queuedTransactions(txHash)).to.be.false;
//   });
// });
