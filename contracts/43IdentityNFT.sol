// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.18;

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// contract IdentityNFT is ERC721URIStorage, Ownable {
//     uint256 public nextTokenId;
//     mapping(address => bool) public verifiers;

//     constructor(
//         string memory _name,
//         string memory _symbol
//     ) ERC721(_name, _symbol) {}

//     modifier onlyVerifier() {
//         require(verifiers[msg.sender], "Not authorized verifier");
//         _;
//     }

//     function setVerifier(address _verifier, bool _status) external onlyOwner {
//         verifiers[_verifier] = _status;
//     }

//     function mint(address to, string memory uri) external onlyVerifier {
//         uint256 tokenId = nextTokenId;
//         nextTokenId++;

//         _safeMint(to, tokenId);
//         _setTokenURI(tokenId, uri);
//     }

//     // Override transfer hook to make it soulbound
//     function _beforeTokenTransfer(
//         address from,
//         address to,
//         uint256 tokenId
//     ) internal override {
//         if (from != address(0) && to != address(0)) {
//             revert("Soulbound: Transfers not allowed");
//         }
//         super._beforeTokenTransfer(from, to, tokenId);
//     }
// }
