import { ethers, upgrades, viem } from "hardhat";

export async function deployContracts() {

    const [owner] = await viem.getWalletClients();

    /**
     * ProxyNftExample
     */

    // Define the implementation contract
    const upgradableNftV1Contract = await ethers.getContractFactory("UpgradableNftV1");

    // Deploy the proxy and implementation contract
    let upgradableNftProxyContract = await upgrades.deployProxy(upgradableNftV1Contract, [owner.account.address], { initializer: "initialize" });

    await upgradableNftProxyContract.waitForDeployment()

    /**
     * BasicTokenExample
     */

    // Define the contract
    const basicTokenContract = await ethers.deployContract("BasicToken", [owner.account.address]);

    const publicClient = await viem.getPublicClient();

    return {
        upgradableNftProxyContract,
        basicTokenContract,
        publicClient,
    };
}