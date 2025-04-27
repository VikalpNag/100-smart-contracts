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
}
