const { expect } = require("chai");
const { ethers } = require("ethers");

describe("Yeild Farm staking", function () {
  let owner, user;
  let yeildfarm, tokenA, tokenB;

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
    yieldFarm = await YieldFarm.deploy();
    await yieldFarm.waitForDeployment();

    //Add support tokens with apy
    await yieldFarm.addSupportedToken(tokenA.target, APY_A);
    await yieldFarm.addSupportedToken(tokenB.target, APY_B);

    //transfer tokens to user and approve
    await tokenA.transfer(user.address, stakeAmount);
    await tokenB.transfer(user.address, stakeAmount);

    await tokenA.connect(user).approve(yeildfarm.target, stakeAmount);
    await tokenB.connect(user).approve(yieldFarm.target, stakeAmount);

    // Send some ETH to yieldFarm to fund rewards
    await owner.sendTransaction({
      to: yieldFarm.target,
      value: ethers.parseEther("10"),
    });
  });
});
