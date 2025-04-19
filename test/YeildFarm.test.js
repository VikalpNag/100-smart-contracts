const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Yield Farm staking", function () {
  let owner, user;
  let yieldFarm, tokenA, tokenB;

  const initialSupply = ethers.parseEther("100000");
  const stakeAmount = ethers.parseEther("1000");

  const APY_A = 10; //10%
  const APY_B = 20; //20%

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    //Deploy Dummy ERC token
    const ERC20 = await ethers.getContractFactory("CustomERC20");
    tokenA = await ERC20.deploy("Token A", "TKA", initialSupply);
    tokenB = await ERC20.deploy("Token B", "TKB", initialSupply);

    //Deploy yeildfarm contract
    const YieldFarm = await ethers.getContractFactory("YieldFarm");
    yieldFarm = await YieldFarm.deploy(owner.address);
    await yieldFarm.waitForDeployment(); //for v6

    //Add support tokens with apy
    await yieldFarm.addSupportedToken(tokenA.getAddress(), APY_A);
    await yieldFarm.addSupportedToken(tokenB.getAddress(), APY_B);

    //transfer tokens to user and approve
    await tokenA.transfer(user.address, stakeAmount);
    await tokenB.transfer(user.address, stakeAmount);

    await tokenA
      .connect(user)
      .approve(await yieldFarm.getAddress(), stakeAmount);
    await tokenB
      .connect(user)
      .approve(await yieldFarm.getAddress(), stakeAmount);

    // Send some ETH to yieldFarm to fund rewards
    await owner.sendTransaction({
      to: yieldFarm.target,
      value: ethers.parseEther("10"),
    });
  });

  it("Should Allow staking supported token", async () => {
    await yieldFarm.connect(user).stake(tokenA.getAddress(), stakeAmount);
    const stakeInfo = await yieldFarm.stakes(user.address, tokenA.getAddress());
    expect(stakeInfo.amount).to.be.equal(stakeAmount);
  });
});
