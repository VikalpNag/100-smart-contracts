// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Bank Transactions", function () {
//   let bank, owner, user;

//   beforeEach(async () => {
//     [owner, user] = await ethers.getSigners(); // getting some accounts to test transactions
//     const Bank = await ethers.getContractFactory("Bank"); //Importing Contract
//     bank = await Bank.deploy();
//     await bank.waitForDeployment();
//   });
//   it("Returns Ethereum deposit and updates balance", async () => {
//     //deposit Ether
//     const depositAmount = await ethers.parseEther("1"); //deposit amount = 1 ETH

//     //connect with user and deposit 1 ETH
//     await bank.connect(user).deposit({ value: depositAmount });
//     //get balance of user from contract
//     const balance = await bank.balances(user.address);

//     expect(balance).to.be.equal(depositAmount);
//   });

//   it("Return Ethereum withdrawal", async () => {
//     const depositAmount = await ethers.parseEther("1"); //deposit amount = 1 ETH
//     const withdrawalAmount = await ethers.parseEther("0.5"); //withdraw amount = 0.5 ETH

//     //connect with user and deposit ETH
//     await bank.connect(user).deposit({ value: depositAmount });

//     //connect with user and withdraw ETH
//     await bank.connect(user).withdraw(withdrawalAmount);

//     //balance after withdrawal
//     const balance = await bank.balances(user.address); //now the balance available should = 0.5 ETH to pass the test
//     expect(balance).to.be.equal(withdrawalAmount);
//   });
// });
