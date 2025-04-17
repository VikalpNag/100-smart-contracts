//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

// Missing the file ERC20PresetMinterPauser.sol is not
// found in the specified path because OpenZeppelin v5.x+ removed the presets/ directory.

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";

contract TestToken is ERC20Burnable, Ownable, ERC20Capped, ERC20Pausable {
    constructor(
        string memory name,
        string memory symbol,
        uint256 cap
    ) ERC20(name, symbol) ERC20Capped(cap) Ownable(msg.sender) {
        _mint(msg.sender, cap);
    }

    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }
}
