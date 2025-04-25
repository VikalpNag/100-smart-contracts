// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

contract ChainlinkKeeper is KeeperCompatibleInterface {
    uint256 public lastTimeStamp;
    uint256 public interval;
    uint256 public counter;
}
