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

//   it("should fulfill a decision ", async () => {
//     //Request
//     const txRequest = await aiOracle.requestDecision();
//     const receiptRequest = await txRequest.wait();
//     const decisionId = receiptRequest.logs.find(
//       (log) => log.fragment.name === "DecisionRequested"
//     ).args.decisionId;

//     // Fulfill
//     const txFulfill = await aiOracle.fulfillDecision(decisionId, 1); // 1 = Approve
//     await txFulfill.wait();

//     const decision = await aiOracle.decisions(decisionId);
//     expect(decision.status).to.equal(1); // Fulfilled
//     expect(decision.choice).to.equal(1); // Approve
//   });

//   it("should return correct action based on decision", async function () {
//     // Request
//     const txRequest = await aiOracle.requestDecision();
//     const receiptRequest = await txRequest.wait();
//     const decisionId = receiptRequest.logs.find(
//       (log) => log.fragment.name === "DecisionRequested"
//     ).args.decisionId;

//     // Fulfill with Approve
//     const txFulfill = await aiOracle.fulfillDecision(decisionId, 1); // Approve
//     await txFulfill.wait();

//     const action = await aiOracle.actBasedOnDecision(decisionId);
//     expect(action).to.equal("Action: Approved");
//   });

//   it("should reject non-owner trying to fulfill decision", async function () {
//     // Request
//     const txRequest = await aiOracle.requestDecision();
//     const receiptRequest = await txRequest.wait();
//     const decisionId = receiptRequest.logs.find(
//       (log) => log.fragment.name === "DecisionRequested"
//     ).args.decisionId;

//     // Try fulfill from otherUser (should fail)
//     await expect(
//       aiOracle.connect(otherUser).fulfillDecision(decisionId, 1)
//     ).to.be.revertedWith("Only owner can call");
//   });
// });
