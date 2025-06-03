import { buildModule } from "@nomicfoundation/ignition-core";
import upgradableNftProxyModule from "../0_UpgradableNftProxy";
import upgradableNftV2Module from "./1_UpgradableNftV2";

const upgradableNftV2UpgradeModule = buildModule("UpgradableNftV2Upgrade", (m) => {

  // Accounts
  const deployer = m.getAccount(0);

  // Get the existing proxy and proxy admin from original modules
  const { upgradableNftProxy, proxyAdminUpgradableNft } = m.useModule(upgradableNftProxyModule);

  // Get the new implementation from V2 module
  const { upgradableNftV2 } = m.useModule(upgradableNftV2Module);

  // Encode the initialize call for the logic contract
  const initializeCall = m.encodeFunctionCall(upgradableNftV2, "initializeV2", [
    deployer
  ]);


  // Upgrade the proxy using the proxy admin
  m.call(proxyAdminUpgradableNft, "upgradeAndCall", [upgradableNftProxy, upgradableNftV2, initializeCall], {
    id: "UpgradableNftV2Upgrade",
    from: deployer
  });

  return {};
});

export default upgradableNftV2UpgradeModule; 