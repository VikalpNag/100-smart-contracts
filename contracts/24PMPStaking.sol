// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PMPToken is ERC20Burnable, ERC20Capped, ERC20Pausable, Ownable {
    constructor(
        string memory name,
        string memory symbol,
        uint256 cap
    ) ERC20(name, symbol) ERC20Capped(cap) Ownable(msg.sender) {}

    // Pausable transfer logic
    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20, ERC20Pausable, ERC20Capped) {
        super._update(from, to, value);
    }

    // Do NOT override _mint anymore!
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount); // ERC20Capped internally checks cap
    }
}
