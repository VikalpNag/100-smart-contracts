// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("AIOracle", function () {
//   let aiOracle;
//   let owner, otherUser;

//   beforeEach(async () => {
//     [owner, otherUser] = await ethers.getSigners();

//     const AIOracle = await ethers.getContractFactory("AIOracle");
//     aiOracle = await AIOracle.deploy();
//     await aiOracle.waitForDeployment();
//   });

//   it("Should request a decision", async () => {
//     const tx = await aiOracle.requestDecision();
//     const receipt = await tx.wait();

//     const event = receipt.logs.find(
//       (log) => log.fragment.name === "DecisionRequested"
//     );
//     const decisionId = event.args.decisionId;

//     expect(decisionId).to.be.equal(1);

//     const decision = await aiOracle.decisions(decisionId);
//     expect(decision.status).to.equal(0); //pending
//     expect(decision.choice).to.equal(0); //unknown
//   });
// });
