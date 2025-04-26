// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "@chainlink/contracts/src/vrf/interfaces/KeeperCompatibleInterface.sol";
import "@chainlink/contracts/src/v0.8/automation/KeeperCompatible.sol";

contract ChainlinkKeeper is KeeperCompatible {
    uint256 public lastTimeStamp;
    uint256 public interval;
    uint256 public counter;
}
