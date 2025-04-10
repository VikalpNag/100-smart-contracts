const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Escrow", function () {
  let escrow, buyer, seller, inspector;

  beforeEach(async () => {
    [buyer, seller, inspector] = await ethers.getSigners();

    const Escrow = await ethers.getContractFactory("Escrow");
    escrow = await Escrow.deploy(
      buyer.address,
      seller.address,
      inspector.address
    );
    await escrow.waitForDeployment();
  });

  it("Returns deposit fund", async () => {
    await escrow.connect(buyer).deposit({ value: ethers.parseEther("1") });
    const balance = await ethers.provider.getBalance(escrow.target);
    expect(balance).to.be.equal(ethers.parseEther("1"));
  });
});
