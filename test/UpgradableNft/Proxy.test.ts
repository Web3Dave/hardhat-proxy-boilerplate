import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { deployContracts } from "../../helpers/deploy-contracts";
import { expect } from "chai";
import { upgradeContract } from "../../helpers/upgrade-contract";

const TEST_VERSION_NUMBER = "2.0.0"

describe("UpgradableNftExample: Proxy", function () {
  it("Deploys Proxy", async function () {
    const { upgradableNftProxyContract } = await loadFixture(deployContracts);

    const upgradableNftProxyAddress = await upgradableNftProxyContract.getAddress()

    const contractVersion1 = await upgradableNftProxyContract.getVersion();

    expect(contractVersion1).to.not.equal(TEST_VERSION_NUMBER)

    const upgradableNftProxyV2Contract = await upgradeContract({
      upgradeContractName: "UpgradableNftV2",
      proxyContractAddress: upgradableNftProxyAddress
    })

    const contractVersion2 = await upgradableNftProxyV2Contract.getVersion();

    expect(contractVersion2).to.equal(TEST_VERSION_NUMBER)

  });

});
