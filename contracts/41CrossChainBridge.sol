// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CrossChainBridge is Ownable {
    IERC20 public token;

    event BridgeRequest(
        address indexed user,
        uint256 amount,
        uint256 targetChild,
        address targetAddress
    );
    event TokensMinted(address indexed user, uint256 amount);

    constructor(address tokenAddress) Ownable(msg.sender) {
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
        DummyToken(address(token)).mint(user, amount);

        emit TokensMinted(user, amount);
    }

    //In case of Emergency,Admin can withdraw tokens accidentally sent
    function emergencyWithdraw(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Invalid address");
        token.transfer(to, amount);
    }
}

// interface MintableERC20 is IERC20 {
//     function mint(address to, uint256 amount) external;
// }

contract DummyToken is ERC20 {
    address public admin;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        admin = msg.sender;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == admin, "Only admin can mint");
        _mint(to, amount);
    }
}
