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
});
