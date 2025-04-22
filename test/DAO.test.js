// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("DAO contract", function () {
//   let token, dao, dummy;
//   let owner, voter1, voter2;

//   beforeEach(async () => {
//     [owner, voter1, voter2] = await ethers.getSigners();

//     //Token
//     const Token = await ethers.getContractFactory("ACustomERC20");
//     token = await Token.deploy(
//       "Governance",
//       "GOV",
//       ethers.parseEther("100000")
//     );
//     await token.transfer(voter1.address, ethers.parseEther("10"));
//     await token.transfer(voter2.address, ethers.parseEther("10"));

//     //Dummy Target
//     const Dummy = await ethers.getContractFactory("DummyTarget");
//     dummy = await Dummy.deploy();

//     //DAO contract
//     const DAO = await ethers.getContractFactory("DAO");
//     dao = await DAO.deploy(token.target);

//     await token.connect(voter1).approve(dao.target, ethers.parseEther("10"));
//     await token.connect(voter2).approve(dao.target, ethers.parseEther("10"));
//   });

//   it("Should Allow creating and voting on a proposal", async () => {
//     const iface = new ethers.Interface(["function setValue(uint256)"]);
//     const data = iface.encodeFunctionData("setValue", [123]);

//     const tx = await dao
//       .connect(voter1)
//       .propose(dummy.target, 0, data, "Set Value to 123");

//     const receipt = await tx.wait();
//     const event = receipt.logs.find(
//       (log) => log.eventName === "ProposalCreated"
//     );
//     const id = event.args[0];

//     await dao.connect(voter1).vote(id, 1); //VoteType.For
//     await dao.connect(voter2).vote(id, 2); //VoteType.Abstain

//     //Fast forward time
//     await ethers.provider.send("evm_increaseTime", [3 * 24 * 60 * 60 + 1]); //3 days
//     await ethers.provider.send("evm_mine");

//     await dao.connect(voter1).executeProposal(id);

//     expect(await dummy.value()).to.equal(123n);
//   });
// });
