const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ChainlinkKeeper contract", function () {
  let keeperContract;
  let interval;
  let owner;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();

    interval = 5;
    const Keeper = await ethers.getContractFactory("ChainlinkKeeper");
    keeperContract = await Keeper.deploy(interval);
    await keeperContract.waitForDeployment();
  });
});
