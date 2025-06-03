/**
 * The following Contract is here to force external openzeppelin contracts to build (ones that are not inherited by the custom contracts)
 */

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

/**
 * ProxyAdmin.sol is used to manage the proxy contract.
 */
import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
/**
 * TransparentUpgradableProxy.sol is the proxy contract deployed as the main interface contract (redirects to current implementation contract)
 */
import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
