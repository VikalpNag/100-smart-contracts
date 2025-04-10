// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Escrow", function () {
//   let escrow, buyer, seller, inspector;

//   beforeEach(async () => {
//     [buyer, seller, inspector] = await ethers.getSigners();

//     const Escrow = await ethers.getContractFactory("Escrow");
//     escrow = await Escrow.deploy(
//       buyer.address,
//       seller.address,
//       inspector.address
//     );
//     await escrow.waitForDeployment();
//   });

//   it("Returns deposit fund", async () => {
//     await escrow.connect(buyer).deposit({ value: ethers.parseEther("1") });
//     const balance = await ethers.provider.getBalance(escrow.target);
//     expect(balance).to.be.equal(ethers.parseEther("1"));
//   });

//   it("Returns funds withrawal", async () => {
//     //depositing funds by buyer
//     await escrow.connect(buyer).deposit({ value: ethers.parseEther("1") });
//     const balanceBefore = await ethers.provider.getBalance(escrow.target);

//     // Inspector releases funds to seller
//     await escrow.connect(inspector).releaseFunds();
//     const balanceAfter = await ethers.provider.getBalance(escrow.target);

//     expect(balanceBefore).to.be.equal(ethers.parseEther("1"));
//     expect(balanceAfter).to.be.equal(ethers.parseEther("0"));
//   });

//   it("Refunds buyer", async () => {
//     //depositing funds by buyer
//     await escrow.connect(buyer).deposit({ value: ethers.parseEther("1") });
//     const balanceBefore = await ethers.provider.getBalance(escrow.target);

//     await escrow.connect(inspector).refundBuyer();
//     const balanceAfter = await ethers.provider.getBalance(escrow.target);

//     expect(balanceBefore).to.be.equal(ethers.parseEther("1"));
//     expect(balanceAfter).to.be.equal(ethers.parseEther("0"));
//   });
// });
