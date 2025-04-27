// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CrossChainBridge is Ownable {
    IERC20 public token;

    event BridgeRequest(
        address indexed user,
        uint256 amount,
        uint256 targetChild,
        address targetAddress
    );
    event TokensMinted(address indexed user, uint256 amount);

    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
    }

    //Called on Source Chain(Chain A)
    function bridgeTokens(
        uint256 amount,
        uint256 targetChainId,
        address targetAddress
    ) external {
        require(amount > 0, "Amount must be greater than 0");
        require(targetAddress != address(0), "Invalid target address");

        //Burn user's tokens (transfer to bridge)
        require(
            token.transferFrom(msg.sender, address(this), amount),
            "Transfer Failed"
        );
        emit BridgeRequest(msg.sender, amount, targetChainId, targetAddress);
    }

    //Called on Destination chain (Chain B) by Admin/Multisig only
    function mintTokens(address user, uint256 amount) external onlyOwner {
        require(user != address(0), "Invalid user address");
        require(amount > 0, "Amount must be greater than 0");

        // Mint new tokens to user
        // Here we assume the Token has a mint function (ERC20Mintable).
        // If not, you'd need a custom ERC20 that allows minting.
        MintableERC20(address(token)).mint(user, amount);

        emit TokensMinted(user, amount);
    }
}
