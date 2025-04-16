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
// });
