const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Multi Sign Wallet", function () {
  let wallet, owner1, owner2, owner3, recipient;

  beforeEach(async () => {
    [owner1, owner2, owner3, recipient] = await ethers.getSigners();

    const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
    wallet = await MultiSigWallet.deploy(
      [owner1.address, owner2.address, owner3.address], //3 owners
      2 //require 2 confirmations
    );
    await wallet.waitForDeployment();

    //fund the wallet with 5 ETH
    await owner1.sendTransaction({
      to: wallet.target,
      value: ethers.parseEther("5"),
    });
  });

  it("Returns Transaction submission", async () => {
    await wallet
      .connect(owner1)
      .submitTransaction(recipient.address, ethers.parseEther("1"), "0x");

    const txn = await wallet.getTransaction(0);

    expect(txn.to).to.be.equal(recipient.address);
    expect(txn.value).to.be.equal(ethers.parseEther("1"));
    expect(txn.executed).to.be.equal(false);
    expect(txn.numConfirmations).to.be.equal(0);
  });

  it("Should confirms and approves a transaction after enough approvals", async () => {
    await wallet
      .connect(owner1)
      .submitTransaction(recipient.address, ethers.parseEther("1"), "0x");

    await wallet.connect(owner1).confirmTransaction(0);
    await wallet.connect(owner2).confirmTransaction(0); //In 2nd approval it triggers and executes

    const txn = await wallet.getTransaction(0);
    expect(txn.executed).to.be.equal(true);
  });

  it("Should fail to execute with insufficient approvals", async () => {
    await wallet
      .connect(owner1)
      .submitTransaction(recipient.address, ethers.parseEther("1"), "0x");

    await wallet.connect(owner1).confirmTransaction(0);

    const txn = await wallet.getTransaction(0);
    expect(txn.executed).to.be.equal(false); // execution fails: still needs one more approval
  });
});
