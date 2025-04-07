const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CustomERC20", function () {
  let erc, deployer;

  beforeEach(async () => {
    //defines owner
    const [owner] = await ethers.getSigners();
    deployer = owner;

    const ERC20 = await ethers.getContractFactory("CustomERC20");
    erc = await ERC20.deploy(1000);
    await erc.waitForDeployment();
  });

  //Intial value test
  it("Returns initial Supply", async () => {
    const totalSupply = await erc.totalSupply();
    const deployerBalance = await erc.balanceOf(deployer.address);
    const decimals = await erc.decimals();

    const expected = ethers.parseUnits("1000", decimals); //returns 1000*10**18

    expect(totalSupply).to.be.equal(expected);
    expect(deployerBalance).to.be.equal(expected);
  });

  //Transferring tokens test
  it("Returns transfer of token", async () => {
    const [owner, recipient] = await ethers.getSigners();
    const decimals = await erc.decimals();
    const amount = ethers.parseUnits("100", decimals);

    //Transfer token from owner to recipient
    await erc.transfer(recipient.address, amount);

    const ownerBalance = await erc.balanceOf(owner.address);
    const recipientBalance = await erc.balanceOf(recipient.address);

    expect(ownerBalance).to.be.equal(ethers.parseUnits("900", decimals));
    expect(recipientBalance).to.be.equal(amount);
  });

  //approve token
  it("Approves tokens", async () => {
    const [owner, spender] = await ethers.getSigners();
    const decimals = await erc.decimals();
    const amount = ethers.parseUnits("100", decimals);

    // Call approve() to allow 'spender' to spend 100 tokens on behalf of 'owner'
    const tx = await erc.approve(spender.address, amount);
    await tx.wait(); // Wait for transaction to be mined

    // Check the allowance
    const allowance = await erc.allowance(owner.address, spender.address);
    expect(allowance).to.equal(amount);
  });

  it("Allows spender to transfer tokens via transferFrom", async () => {
    const [owner, spender] = await ethers.getSigners();
    const decimals = await erc.decimals();
    const amount = ethers.parseUnits("50", decimals);

    await erc.approve(spender.address, amount);

    const ercConnectedToSpender = erc.connect(spender);
    await ercConnectedToSpender.transferFrom(
      owner.address,
      spender.address,
      amount
    );

    const spenderBalance = await erc.balanceOf(spender.address);
    expect(spenderBalance).to.equal(amount);
  });
});
