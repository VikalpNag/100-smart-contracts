// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Tokenswap contract", function () {
//   let Token, tokenA, tokenB, swap, owner, user;
//   const rate = 2; //1A=2B
//   const supply = ethers.parseEther("100000");

//   beforeEach(async () => {
//     [owner, user] = await ethers.getSigners();

//     const ERC20 = await ethers.getContractFactory("ACustomERC20");
//     tokenA = await ERC20.deploy("Token A", "TKA", supply);
//     tokenB = await ERC20.deploy("Token B", "TKB", supply);

//     const Swap = await ethers.getContractFactory("TokenSwap");
//     swap = await Swap.deploy(tokenA.target, tokenB.target, rate);

//     //Fund Swap with tokenB
//     await tokenB.transfer(swap.target, ethers.parseEther("10000"));

//     //Transfer tokenA to user
//     await tokenA.transfer(user.address, ethers.parseEther("1000"));
//     await tokenA.connect(user).approve(swap.target, ethers.parseEther("1000"));
//     await tokenB.connect(user).approve(swap.target, ethers.parseEther("1000"));
//   });

//   it("It should Swap A to B correctly", async () => {
//     await swap.connect(user).swapAtoB(ethers.parseEther("1"));
//     const tokenBBalance = await tokenB.balanceOf(user.address);
//     expect(tokenBBalance).to.be.equal(ethers.parseEther("2"));
//   });
// });
