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
});
