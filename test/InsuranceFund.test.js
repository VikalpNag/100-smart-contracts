// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("InsuranceFund Contract", function () {
//   let fund, owner, user1, user2;

//   beforeEach(async () => {
//     [owner, user1, user2] = await ethers.getSigners();

//     const InsuranceFund = await ethers.getContractFactory("InsuranceFund");
//     fund = await InsuranceFund.deploy();
//   });

//   it("Should accept deposits", async () => {
//     await fund.connect(user1).deposit({ value: ethers.parseEther("1") });
//     const contractBalance = await ethers.provider.getBalance(fund.target);
//     expect(contractBalance).to.be.equal(ethers.parseEther("1"));
//   });

//   it("Should allow claim submission", async () => {
//     await fund
//       .connect(user1)
//       .submitClaim(ethers.parseEther("0.5"), "Contract Hack");
//     const claim = await fund.claims(0);
//     expect(claim.claimant).to.be.equal(user1.address);
//     expect(claim.amount).to.be.equal(ethers.parseEther("0.5"));
//   });
// });
