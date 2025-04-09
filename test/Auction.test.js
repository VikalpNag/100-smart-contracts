const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Auction", function () {
  let auction, seller, bidder1, bidder2;

  beforeEach(async () => {
    [seller, bidder1, bidder2] = await ethers.getSigners();
    const Auction = await ethers.getContractFactory("Auction");
    auction = await Auction.connect(seller).deploy(60); //60 seconds duration
    await auction.waitForDeployment();
    //Fast forward the blockchain to the current time
    await ethers.provider.send("evm_mine", []);
  });

  it("Returns the highest bid", async () => {
    await auction.connect(bidder1).bid({ value: ethers.parseEther("1") });
    expect(await auction.highestBidder()).to.be.equal(bidder1.address);
    expect(await auction.highestBid()).to.be.equal(ethers.parseEther("1"));
  });
});
