//SPDX-License-Identifier : Unlicensed
pragma solidity ^0.8.0;

contract Bank {
    address public owner;
    mapping(address => uint256) public balances;

    event Deposited(address indexed sender, uint256 amount);
    event Withdrawn(address indexed receiver, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    //Function to deposit Ether
    function deposit() public payable {
        //check whether deposit val is > 0.
        require(msg.value > 0, "Must send some ether");
        balances[msg.sender] += msg.value;

        emit Deposited(msg.sender, msg.value);
    }

    //Function to withdraw ether
    function withdraw(uint256 _amount) public {
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);

        emit Withdrawn(msg.sender, _amount);
    }

    //View balances
    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}
