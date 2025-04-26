// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol";

contract ChainlinkKeeper is AutomationCompatibleInterface {
    uint256 public lastTimeStamp;
    uint256 public interval;
    uint256 public counter;

    constructor(uint256 _interval) {
        interval = _interval;
        lastTimeStamp = block.timestamp;
        counter = 0;
    }

    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
        performData = "";
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        if ((block.timestamp - lastTimeStamp) > interval) {
            lastTimeStamp = block.timestamp;
            counter++;
        }
    }
}
