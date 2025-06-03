// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import {ERC721EnumerableUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {ERC721URIStorageUpgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import {Utils} from "../lib/Utils.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/**
 * @title Upgradable NFT V1 (ERC721)
 * @notice Example Upgrade for ERC721 contract
 */
contract UpgradableNftV2 is
    Initializable,
    ERC721Upgradeable,
    ERC721EnumerableUpgradeable,
    ERC721URIStorageUpgradeable,
    OwnableUpgradeable,
    Utils
{
    /**
     * Storage Slots - DO NOT CHANGE ORDER, THIS WILL BREAK THE MAPPING
     * START
     */

    // Insert any custom variables here

    /**
     * END
     * Storage Slots
     */

    // Custom Mint Event
    event CustomMintEvent(
        address indexed to,
        uint256 indexed tokenId,
        uint256 indexed timestamp
    );

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /**
     * @dev Initialize function to replace constructor.
     * @custom:oz-upgrades-validate-as-initializer
     */
    function initializeV2(address initialOwner) public reinitializer(2) {
        __ERC721_init("Upgradable NFT V2", "UNFT2");
        __ERC721Enumerable_init();
        __ERC721URIStorage_init();
        __Ownable_init(initialOwner);
    }

    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    )
        internal
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721Upgradeable, ERC721EnumerableUpgradeable) {
        super._increaseBalance(account, value);
    }

    function tokenURI(
        uint256 tokenId
    )
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(
            ERC721Upgradeable,
            ERC721EnumerableUpgradeable,
            ERC721URIStorageUpgradeable
        )
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /**
     * End of solidity required overrides
     */

    /**
     * Get Proxy Contract Version
     */
    function getVersion() public pure returns (string memory) {
        return "2.0.0";
    }

    /**
     * Check if a token exists
     * @param tokenId NFT token id
     */
    function isValidToken(uint256 tokenId) internal view returns (bool) {
        try this.ownerOf(tokenId) {
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Minting
     */

    /**
     * Safe Mint - Without URI
     * @param to The address that will receive the NFT
     * @param tokenId The token ID of the NFT to be minted
     */
    function safeMint(address to, uint256 tokenId) public onlyOwner {
        super._safeMint(to, tokenId);
        emit CustomMintEvent(to, tokenId, block.timestamp);
    }

    /**
     * Safe Mint - With URI
     * @param to The address that will receive the NFT
     * @param tokenId The token ID of the NFT to be minted
     * @param tokenUri The token URI of the NFT to be minted
     */
    function safeMint(
        address to,
        uint256 tokenId,
        string memory tokenUri
    ) public onlyOwner {
        super._safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenUri);
        emit CustomMintEvent(to, tokenId, block.timestamp);
    }
}
