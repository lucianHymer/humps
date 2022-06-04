// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Humps is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct HumpMeta {
      string dnaFingerprint;
      address mother;
      address father;
    }

    mapping (uint256 => HumpMeta) public metaForHump;

    constructor() ERC721("Humps NFT", "HUMPS") {}

    // function mintNft(address receiver, string memory tokenURI) external onlyOwner returns (uint256) {
    function mintNft(address receiver, string memory dnaFingerprint, address mother, address father) external onlyOwner returns (uint256) {
        _tokenIds.increment();

        uint256 newNftTokenId = _tokenIds.current();
        _mint(receiver, newNftTokenId);
        // _setTokenURI(newNftTokenId, tokenURI);

        metaForHump[newNftTokenId] = HumpMeta(
          dnaFingerprint,
          mother,
          father
        );

        return newNftTokenId;
    }
}
