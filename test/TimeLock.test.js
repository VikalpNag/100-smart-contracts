const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TimeLock contract", function () {
  let owner, proposer, executor, target;
  let timelock;

  const MIN_DELAY = 3600; //1 hour

  beforeEach(async () => {
    [owner, proposer, executor, target] = await ethers.getSigners();

    const TimeLock = await ethers.getContractFactory("TimeLock");
    timelock = await TimeLock.deploy(owner.address, MIN_DELAY);
    await timelock.waitForDeployment();
  });
});
