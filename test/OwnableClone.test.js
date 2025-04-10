const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ownable Clone", function () {
  let ownable, owner, addr1;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();
    const OwnableClone = await ethers.getContractFactory("OwnableClone");
    ownable = await OwnableClone.connect(owner).deploy();
    await ownable.waitForDeployment();
  });

  it("Set the deployer as owner", async () => {
    expect(await ownable.owner()).to.be.equal(owner.address);
  });

  it("Allows owner to transfer ownership", async () => {
    await ownable.transferOwnership(addr1.address);
    expect(await ownable.owner()).to.be.equal(addr1.address);
  });

  it("Allows the owner to renounce ownership ", async () => {
    await ownable.renounceOwnership();
    expect(await ownable.owner()).to.be.equal(ethers.ZeroAddress);
  });
});
