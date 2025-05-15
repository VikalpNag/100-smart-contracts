const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DAOProposal", () => {
  let DAO, dao, owner, voter1, voter2;

  beforeEach(async () => {
    [owner, voter1, voter2] = await ethers.getSigners();

    DAO = await ethers.getContractFactory("DAOProposal");
    dao = await DAO.deploy(2); // quorum = 2
    await dao.waitForDeployment();
  });

  it("Should create a new proposal", async () => {
    const description = "Fund open-source devs";

    const tx = await dao.createProposal(description);
    const receipt = await tx.wait();

    const event = receipt.events.find(e => e.event === "ProposalCreated");
    const [id, desc, deadline] = event.args;

    expect(id).to.equal(0);
    expect(desc).to.equal(description);

    const proposal = await dao.proposals(0);
    expect(proposal.description).to.equal(description);

    // Check that deadline is approx 3 days from now (allowing ±2s diff)
    const currentBlock = await ethers.provider.getBlock(receipt.blockNumber);
    const expectedDeadline = BigInt(currentBlock.timestamp) + BigInt(3 * 24 * 60 * 60);
    const actualDeadline = deadline;

    expect(actualDeadline).to.be.closeTo(expectedDeadline, 2n); // ±2 seconds tolerance
  });
});
