// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("RewardDistributer contract", function () {
//   let owner, vikalp, ruby, token, distributer;
//   const rewardAmount = ethers.parseEther("1000");

//   beforeEach(async () => {
//     [owner, vikalp, ruby] = await ethers.getSigners();

//     const ERC20 = await ethers.getContractFactory("ACustomERC20");
//     token = await ERC20.deploy("Reward Token", "RWD", rewardAmount);

//     const Distributer = await ethers.getContractFactory("RewardDistributer");
//     distributer = await Distributer.deploy(token.target);

//     await token.transfer(distributer.target, rewardAmount);
//   });

//   it("Should assign and allow claim", async () => {
//     await distributer.assignRewards(
//       [vikalp.address, ruby.address],
//       [ethers.parseEther("100"), ethers.parseEther("200")]
//     );

//     await distributer.connect(vikalp).claimReward();
//     expect(await token.balanceOf(vikalp.address)).to.equal(
//       ethers.parseEther("100")
//     );

//     await distributer.connect(ruby).claimReward();
//     expect(await token.balanceOf(ruby.address)).to.be.equal(
//       ethers.parseEther("200")
//     );
//   });

//   it("Should Prevent double claim", async () => {
//     await distributer.assignRewards(
//       [vikalp.address],
//       [ethers.parseEther("50")]
//     );
//     await distributer.connect(vikalp).claimReward();

//     await expect(distributer.connect(vikalp).claimReward()).to.be.revertedWith(
//       "Already claimed"
//     );
//   });
// });
