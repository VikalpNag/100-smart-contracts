const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Staking contract", function () {
  let staking, stakingToken, rewardToken, user, owner;

  beforeEach(async () => {
    [user, owner] = await ethers.getSigners();

    const ERC20 = await ethers.getContractFactory("ERC20PresetMinterPauser");
    stakingToken = await ERC20.deploy("StakeToken", "STK");
    rewardToken = await ERC20.deploy("RewardToken", "RWD");

    await stakingToken.mint(user.address, ethers.parseEther("1000"));
    await rewardToken.mint(owner.address, ethers.parseEther("1000"));

    const Staking = await ethers.getContractFactory("Staking");
    staking = await Staking.deploy(stakingToken.target, rewardToken.target);

    //fund staking contract with reward tokens
    await rewardToken.transfer(staking.target, ethers.parseEther("500"));
  });
});
