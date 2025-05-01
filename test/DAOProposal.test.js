// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("DAOProposal", async () => {
//   let DAO, dao, owner, voter1, voter2;

//   beforeEach(async () => {
//     [owner, voter1, voter2] = await ethers.getSigners();

//     DAO = await ethers.getContractFactory("DAOProposal");
//     dao = await DAO.deploy(2); //quorum=2
//     await dao.waitForDeployment();
//   });

//   it("Should create a new proposal", async () => {
//     await expect(dao.createProposal("Fund open-source devs"))
//       .to.emit(dao, "ProposalCreated")
//       .withArgs(
//         0,
//         "Fund open-source devs",
//         (await dao.getBlockTimestamp()) + 3 * 24 * 60 * 60
//       );

//     const proposal = await dao.proposals(0);
//     expect(proposal.description).to.equal("Fund open-source devs");
//   });
// });
