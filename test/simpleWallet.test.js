const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Simple Wallet", function () {
  let wallet, owner, addr1;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();
    const Wallet = await ethers.getContractFactory("SimpleWallet");
    wallet = await Wallet.deploy();
    await wallet.waitForDeployment();
  });

  it("Returns Balance and accepts ETH", async () => {
    //Sends 1 ETH to Wallet
    await owner.sendTransaction({
      to: await wallet.getAddress(),
      value: ethers.parseEther("1"),
    });

    const balance = await wallet.getBalance();
    expect(balance).to.be.equal(ethers.parseEther("1"));
  });

  it("Returns Withdraw Balance", async () => {
    //Deposit 1 ETH
    await owner.sendTransaction({
      to: await wallet.getAddress(),
      value: ethers.parseEther("1"),
    });

    const initialOwnerBalance = await ethers.provider.getBalance(owner);

    //Withdraws 0.5 ETH
    const tx = await wallet.withdraw(ethers.parseEther("0.5"));
    const receipt = await tx.wait();

    const finalBalance = await wallet.getBalance();
    expect(finalBalance).to.be.equal(ethers.parseEther("0.5"));
  });
});
