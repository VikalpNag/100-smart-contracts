//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract StorageProxy {
    //EIP-1967 compliant storage slots
    bytes32 private constant IMPLEMENTATION_SLOT =
        keccak256("proxy.implementation");
    bytes32 private constant ADMIN_SLOT = keccak256("proxy.admin");

    constructor(address _implementation) {
        _setAdmin(msg.sender);
        _setImplementation(_implementation);
    }

    fallback() external payable {
        address impl = _getImplementation();
        require(impl != address(0), "Implementation not set");

        assembly {
            calldatacopy(0, 0, calldatasize());
            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0);
            returndatacopy(0, 0, returndatasize());
            switch result ;
            case 0 {revert (0,returndatasize())};
            default{return(0,returndatasize())};

        }
    }

    function upgradeTo(address newImplementation) external onlyAdmin{
        _setImplementation(newImplementation);
    }

    function Implementation() external view returns(address){
        return _getImplementation();
    }

    function admin() external view returns(address){
        return _getAdmin();
    }

    modifier onlyAdmin(){
        require(msg.sender==_getAdmin(),"Not admin");
    }

    function _getImplementation() internal view returns(address impl){
        bytes32 slot=IMPLEMENTATION_SLOT;
        assembly{
            impl:=sload(slot);
        }
    }

    function _setImplementation(address newImpl) internal{
        bytes32 slot=IMPLEMENTATION_SLOT;
        assembly{
            sstore(slot,newImpl);
        }
    }
}
