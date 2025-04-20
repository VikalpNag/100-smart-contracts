//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract TimeLock {
    address public admin;
    uint256 public delay;

    mapping(bytes32 => bool) public queuedTransactions;

    event Queued(
        bytes32 txHash,
        address target,
        uint256 value,
        string signature,
        bytes data,
        uint eta
    );
    event Executed(
        bytes32 txHash,
        address target,
        uint256 value,
        string signature,
        bytes data,
        uint256 eta
    );
    event Cancelled(bytes32 txHash);

    constructor(address _admin, uint256 _delay) {
        require(_delay >= 1 hours, "Delay must be at least 1 hour");
        admin = _admin;
        delay = _delay;
    }

    receive() external payable {}

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not the real admin");
        _;
    }

    function queueTransaction(
        address target,
        uint256 value,
        string memory signature,
        bytes memory data,
        uint256 eta
    ) public onlyAdmin returns (bytes32) {
        require(eta >= block.timestamp + delay, "ETA must satisfy delay");

        bytes32 txHash = getTxHash(target, value, signature, data, eta);
        queuedTransactions[txHash] = true;

        emit Queued(txHash, target, value, signature, data, eta);
        return txHash;
    }
}
