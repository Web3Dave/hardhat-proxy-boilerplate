import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const upgradableNftProxyModule = buildModule("UpgradableNftProxy", (m) => {

    // Accounts
    const owner = m.getAccount(0);

    // Deploy the logic contracts
    const upgradableNftV1 = m.contract("UpgradableNftV1");

    // Encode the initialize function call for proxy deployment
    const initializeFunctionCallUpgradableNft = m.encodeFunctionCall(upgradableNftV1, "initialize", [
        owner
    ]);

    /**
     * Deploy UpgradableNftProxy
     */
    const upgradableNftProxy = m.contract("TransparentUpgradeableProxy",
        [
            upgradableNftV1,
            owner,
            initializeFunctionCallUpgradableNft
        ], {
        id: "UpgradableNftProxy"
    });

    /**
     * Deploy UpgradableNft ProxyAdmin
     */
    const proxyAdminUpgradableNft = m.contractAt("ProxyAdmin", m.readEventArgument(
        upgradableNftProxy,
        "AdminChanged",
        "newAdmin",
        { id: "UpgradableNftProxyAdminFunction" }
    ), { id: "UpgradableNftProxyAdmin" });


    return {
        // Proxy Contracts
        upgradableNftProxy,
        // Proxy Admin Contracts
        proxyAdminUpgradableNft
    };
});

export default upgradableNftProxyModule;