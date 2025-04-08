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

  it("Should not accept contribution after deadline", async () => {
    await ethers.provider.send("evm_increaseTime", [duration + 1]);
    await ethers.provider.send("evm_mine");
    await expect(
      crowdfunding
        .connect(backer1)
        .contribute({ value: ethers.parseEther("1") })
    ).to.be.revertedWith("Campaign ended");
  });

  it("should allow user to withdraw funds when goal reached after deadline", async () => {
    //contribute
    await crowdfunding
      .connect(backer1)
      .contribute({ value: ethers.parseEther("1.5") });
    await crowdfunding
      .connect(backer2)
      .contribute({ value: ethers.parseEther("1.5") });

    //move time forward to exceed deadline
    await ethers.provider.send("evm_increaseTime", [duration + 1]);
    await ethers.provider.send("evm_mine");

    const balanceBefore = await ethers.provider.getBalance(creator.address);

    const tx = await crowdfunding.connect(creator).withdrawFunds();
    const receipt = await tx.wait();
    const gasUsed = receipt.gasUsed * receipt.gasPrice;

    const balanceAfter = await ethers.provider.getBalance(creator.address);
    expect(balanceAfter).to.be.above(balanceBefore);
  });
});
