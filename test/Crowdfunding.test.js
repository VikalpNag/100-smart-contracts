const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Crowd funding", function () {
  let crowdfunding;
  let creator, backer1, backer2;
  const goalAmount = ethers.parseEther("3"); // 3 ETH
  const duration = 60 * 60 * 24; // 1 Day in seconds

  beforeEach(async () => {
    [creator, backer1, backer2] = await ethers.getSigners();

    const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
    crowdfunding = await Crowdfunding.connect(creator).deploy(
      duration,
      goalAmount
    );
    await crowdfunding.waitForDeployment();
  });

  it("Should initialize with correct value", async () => {
    expect(await crowdfunding.creator()).to.be.equal(creator.address);
    expect(await crowdfunding.goal()).to.be.equal(goalAmount);
  });

  it("Should not accept zero contribution", async () => {
    await expect(
      crowdfunding.connect(backer1).contribute({ value: 0 })
    ).to.be.revertedWith("Must send ETH");
  });
});
