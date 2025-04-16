// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Payment Splitter", function () {
//   let owner, contract, vikalp, ruby;

//   beforeEach(async () => {
//     [owner, vikalp, ruby] = await ethers.getSigners();

//     const Splitter = await ethers.getContractFactory("PaymentSplitterContract");
//     contract = await Splitter.deploy(
//       [vikalp.address, ruby.address],
//       [70, 30] //70% Vikalp 30% Ruby
//     );
//     await contract.waitForDeployment();

//     //send 1 ETH to the contract
//     await owner.sendTransaction({
//       to: contract.target,
//       value: ethers.parseEther("1.0"),
//     });
//   });

//   it("Should release correct share to Vikalp", async () => {
//     const initial = await ethers.provider.getBalance(vikalp.address);
//     await contract.connect(vikalp).release(vikalp.address);
//     const finalBalance = await ethers.provider.getBalance(vikalp.address);
//     expect(finalBalance).to.be.gt(initial);
//   });

//   it("Should release correct share to Ruby", async () => {
//     const initial = await ethers.provider.getBalance(ruby.address);
//     await contract.connect(ruby).release(ruby.address);
//     const finalBalance = await ethers.provider.getBalance(ruby.address);
//     expect(finalBalance).to.be.gt(initial);
//   });
// });
