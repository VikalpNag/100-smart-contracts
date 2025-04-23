const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Tokenswap contract", function () {
  let Token, tokenA, tokenB, swap, owner, user;
  const rate = 2; //1A=2B
  const supply = ethers.parseEther("100000");
});
