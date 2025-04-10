const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Pausable contract", function () {
  let owner, pausable, other;

  beforeEach(async () => {
    [owner, other] = await ethers.getSigners();
    const Pausable = await ethers.getContractFactory("Pausable");
    pausable = await Pausable.deploy();
    await pausable.waitForDeployment();
  });
});
