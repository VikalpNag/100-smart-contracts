const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Bank Transactions", function () {
  let bank, owner, user;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners(); // getting some accounts to test transactions
    const Bank = await ethers.getContractFactory("Bank"); //Importing Contract
    bank = await Bank.deploy();
    await bank.waitForDeployment();
  });
  it("Returns Ethereum deposit and updates balance", async () => {
    //deposit Ether
    const depositAmount = await ethers.parseEther("1"); //deposit amount = 1 ETH

    //connect with user and deposit 1 ETH
    await bank.connect(user).deposit({ value: depositAmount });
    //get balance of user from contract
    const balance = await bank.balances(user.address);

    expect(balance).to.be.equal(depositAmount);
  });
});
