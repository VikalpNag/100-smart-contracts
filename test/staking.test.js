const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Staking contract", function () {
  let staking, stakingToken, rewardToken, user, owner;

  beforeEach(async () => {
    [user, owner] = await ethers.getSigners();

    const ERC20 = await ethers.getContractFactory("PMPToken");
    stakingToken = await ERC20.deploy("StakeToken", "STK");
    rewardToken = await ERC20.deploy("RewardToken", "RWD");

    await stakingToken.mint(user.address, ethers.parseEther("1000"));
    await rewardToken.mint(owner.address, ethers.parseEther("1000"));

    const Staking = await ethers.getContractFactory("Staking");
    staking = await Staking.deploy(stakingToken.target, rewardToken.target);

    //fund staking contract with reward tokens
    await rewardToken.transfer(staking.target, ethers.parseEther("500"));
  });

  it("Allows staking and earning rewards", async () => {
    await stakingToken
      .connect(user)
      .approve(staking.target, ethers.parseEther("100"));
    await staking.connect(user).stake(ethers.parseEther("100"));

    await ethers.provider.send("evm_increaseTime", [10]);
    await ethers.provider.send("evm_mine");

    await staking.connect(user).getReward();

    const reward = await rewardToken.balanceOf(user.address);
    expect(reward).to.be.gt(0);
  });
});
