const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CrossChainBridge", function () {
  let owner, user, bridge, token;

  const initialSupply = ethers.parseEther("100000");
  const amountToBridge = ethers.parseEther("1000");

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();

    const ERC20Mintable = await ethers.getContractFactory("DummyToken");
    token = await ERC20Mintable.deploy("Test Token", "TTK");
    await token.waitForDeployment();
    await token.mint(user.address, initialSupply);

    const Bridge = await ethers.getContractFactory("CrossChainBridge");
    bridge = await Bridge.deploy(token.target);
    await bridge.waitForDeployment();
  });

  it("Should emit BridgeRequest event on bridgeTokens", async () => {
    await token.connect(user).approve(bridge.target, amountToBridge);

    await expect(
      bridge.connect(user).bridgeTokens(amountToBridge, 137, user.address) //137=polygon chainId
    )
      .to.emit(bridge, "BridgeRequest")
      .withArgs(user.address, amountToBridge, 137, user.address);
  });
});
