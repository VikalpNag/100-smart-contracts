// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Flash Loan Receiver", function () {
//   let token, pool, receiver;
//   let deployer;

//   beforeEach(async () => {
//     [deployer] = await ethers.getSigners();

//     const Token = await ethers.getContractFactory("ACustomERC20");
//     token = await Token.deploy("Token", "TOK", ethers.parseEther("100000"));

//     const Pool = await ethers.getContractFactory("LenderPool");
//     pool = await Pool.deploy(token.target);

//     const Receiver = await ethers.getContractFactory("FlashLoanReceiver");
//     receiver = await Receiver.deploy(pool.target);

//     //Fund Pool
//     await token.transfer(pool.target, ethers.parseEther("50000"));
//     //Fund receiver with just enough to pay fee
//     await token.transfer(receiver.target, ethers.parseEther("1000"));
//   });

//   it("Should Execute flash loan and repay with fee", async () => {
//     const loanAmount = ethers.parseEther("10000");
//     const fee = (loanAmount * 5n) / 10000n; //0.05%

//     //pre-approve loan repayment
//     await token.connect(deployer).transfer(receiver.target, fee);

//     const balanceBefore = await token.balanceOf(pool.target);
//     await pool.flashLoan(loanAmount, receiver.target);
//     const balanceAfter = await token.balanceOf(pool.target);

//     expect(balanceAfter).to.equal(balanceBefore + fee);
//   });
// });
