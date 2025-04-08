//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

contract MultiSignWallet {
    address[] public owners;
    mapping(address => bool) public isOwner;
    uint public required;

    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
        uint numConfirmations;
    }

    Transaction[] public transactions;
    mapping(uint => mapping(address => bool)) isConfirmed;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not owner");
        _;
    }

    constructor(address memory _owner, uint _required) {
        require(_owner.length > 0, "Owners Required");
        require(
            _required > 0 && _required <= _owner.length,
            "Invalid requirement"
        );

        for (uint i = 0; i < _owner.length; i++) {
            address owner = _owner[i];
            require(owner != address(0) && !isOwner[owner], "Invalid Owner");

            isOwner[owner] = true;
            owners.push(owner);
        }
        required = _required;
    }

    receive() external payable{};


//Sumit transaction details
    function submitTransaction(address _to,uint _value,bytes memory _data)public onlyOwner{
        transactions.push(Transaction({
            to:_to,
            value:_value,
            data:_data,
            executed:false,
            numConfirmation:0,
        }));
    }

    //confirm transactions
    function confirmTransactions(uint _txIndex) public onlyOwner{
            Transaction storage transaction=transactions[_txIndex];

            require(!transaction.executed,"Already executed");
            require(!isConfirmed[_txIndex][msg.sender],"Already Confirmed");

            transaction.numConfirmations+=1;
            isConfirmed[_txIndex][msg.sender]=true;

            if(transaction.numConfirmations >= required){
                executeTransaction(_txIndex);
            }
    }

    function executeTransaction(uint _txIndex) internal{
        Transaction storage transaction = transactions[_txIndex];

        require(!transaction.executed,"Already executed");
        require(transaction.numConfirmations >=required,"Not enough confirmations");

        transactions.executed=true;
        (bool success,)=transaction.to.call{value:transaction.value}(transaction.data);
        require(success,"Transaction failed");
    }

}
