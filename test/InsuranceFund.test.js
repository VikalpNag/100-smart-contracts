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

//   it("Should approve and pay claim", async () => {
//     await fund.connect(user1).deposit({ value: ethers.parseEther("2") });
//     await fund.connect(user2).submitClaim(ethers.parseEther("1"), "Rugpull");

//     await fund.connect(owner).approveClaim(0);
//     await fund.connect(user2).payClaim(0);

//     const claim = await fund.claims(0);
//     expect(claim.paid).to.be.equal(true);
//   });

//   it("Should reject invalid claim", async () => {
//     await fund.connect(user1).submitClaim(ethers.parseEther("1"), "Not real");

//     await fund.connect(owner).rejectClaim(0);

//     const claim = await fund.claims(0);

//     expect(claim.claimant).to.equal(ethers.ZeroAddress);
//     expect(claim.amount).to.equal(0n);
//     expect(claim.paid).to.equal(false);
//     expect(claim.approved).to.equal(false);
//   });
// });
