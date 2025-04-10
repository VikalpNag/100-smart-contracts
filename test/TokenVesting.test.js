// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("TokenVesting", function () {
//   let token, vesting, owner, beneficiary;
//   const totalAmount = ethers.parseEther("10000");
//   const duration = 60 * 60 * 24 * 365; // 1 year
//   let startTime;

//   beforeEach(async () => {
//     [owner, beneficiary] = await ethers.getSigners();

//     // Deploy ERC20 Token
//     const Token = await ethers.getContractFactory("ERC20PresetMinterPauser");
//     token = await Token.deploy("TestToken", "TTK");
//     await token.waitForDeployment();

//     // Mint tokens to owner
//     await token.mint(owner.address, totalAmount);

//     // Deploy Vesting Contract
//     startTime = (await ethers.provider.getBlock("latest")).timestamp + 10; // start in 10 sec
//     const TokenVesting = await ethers.getContractFactory("TokenVesting");
//     vesting = await TokenVesting.deploy(
//       token.target,
//       beneficiary.address,
//       startTime,
//       duration,
//       totalAmount
//     );
//     await vesting.waitForDeployment();

//     // Transfer tokens to vesting contract
//     await token.transfer(vesting.target, totalAmount);
//   });

//   it("Should not release tokens before start", async () => {
//     await expect(vesting.connect(beneficiary).release()).to.be.revertedWith(
//       "No tokens to release"
//     );
//   });

//   it("Should release partial tokens during vesting", async () => {
//     // Fast forward half the duration
//     await ethers.provider.send("evm_setNextBlockTimestamp", [
//       startTime + duration / 2,
//     ]);
//     await ethers.provider.send("evm_mine");

//     const releasable = await vesting.vestedAmount();
//     await expect(vesting.connect(beneficiary).release()).to.changeTokenBalances(
//       token,
//       [vesting, beneficiary],
//       [releasable * -1n, releasable]
//     );
//   });

//   it("Should release all tokens after vesting period", async () => {
//     // Fast forward to end
//     await ethers.provider.send("evm_setNextBlockTimestamp", [
//       startTime + duration,
//     ]);
//     await ethers.provider.send("evm_mine");

//     const releasable = await vesting.vestedAmount();
//     await expect(vesting.connect(beneficiary).release()).to.changeTokenBalances(
//       token,
//       [vesting, beneficiary],
//       [releasable * -1n, releasable]
//     );
//   });

//   it("Should not release tokens twice", async () => {
//     // Fast forward to end
//     await ethers.provider.send("evm_setNextBlockTimestamp", [
//       startTime + duration,
//     ]);
//     await ethers.provider.send("evm_mine");

//     await vesting.connect(beneficiary).release();
//     await expect(vesting.connect(beneficiary).release()).to.be.revertedWith(
//       "No tokens to release"
//     );
//   });
// });

// ** TO MAKE SOME IMPROVEMENTS IN THIS FILE BEFORE TEST **
//NOT PROPER TEST FILE
