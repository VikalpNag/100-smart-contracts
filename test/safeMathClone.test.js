// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("SafeMathClone via MathWrapper", function () {
//   let math;

//   beforeEach(async () => {
//     const MathWrapper = await ethers.getContractFactory("MathWrapper");
//     math = await MathWrapper.deploy();
//     await math.waitForDeployment();
//   });

//   it("should correctly add two numbers", async () => {
//     const result = await math.testAdd(10, 15);
//     expect(result).to.equal(25);
//   });

//   it("should correctly subtract two numbers", async () => {
//     const result = await math.testSub(20, 5);
//     expect(result).to.equal(15);
//   });

//   it("should revert on subtraction underflow", async () => {
//     await expect(math.testSub(5, 10)).to.be.revertedWith(
//       "Subtraction Underflow"
//     );
//   });
// });
