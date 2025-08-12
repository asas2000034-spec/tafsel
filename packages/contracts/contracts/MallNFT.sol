// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MallNFT extends ERC721URIStorage, Ownable {
    uint256 public nextId;

    constructor() ERC721("TafseelNFT", "TAF") Ownable(msg.sender) {}

    function mint(address to, string memory uri) external onlyOwner {
        _safeMint(to, nextId);
        _setTokenURI(nextId, uri);
        nextId++;
    }
}
