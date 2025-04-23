// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("RewardDistributer contract", function () {
//   let owner, vikalp, ruby, token, distributer;
//   const rewardAmount = ethers.parseEther("1000");

//   beforeEach(async () => {
//     [owner, vikalp, ruby] = await ethers.getSigners();

//     const ERC20 = await ethers.getContractFactory("ACustomERC20");
//     token = await ERC20.deploy("Reward Token", "RWD", rewardAmount);

//     const Distributer = await ethers.getContractFactory("RewardDistributor");
//     distributer = await Distributer.deploy(token.target);

//     await token.transfer(distributer.target, rewardAmount);
//   });
// });
