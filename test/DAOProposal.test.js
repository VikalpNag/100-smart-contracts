const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DAOProposal", async () => {
  let DAO, dao, owner, voter1, voter2;

  beforeEach(async () => {
    [owner, voter1, voter2] = await ethers.getSigners();

    DAO = await ethers.getContractFactory("DAOProposal");
    dao = await DAO.deploy(2); //quorum=2
    await dao.waitForDeployment();
  });
});
