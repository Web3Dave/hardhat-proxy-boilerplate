import { expect } from "chai";
import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { viem } from "hardhat";
import { deployContracts } from "../../helpers/deploy-contracts";

describe("UpgradableNftExample: Stats", function () {
  it("Should return total supply of NFTS", async function () {
    const [owner] = await viem.getWalletClients();
    const { upgradableNftProxyContract } = await loadFixture(deployContracts);

    /**
     * Mint NFTs
     */

    await upgradableNftProxyContract['safeMint(address,uint256)'](owner.account.address, 0);
    await upgradableNftProxyContract['safeMint(address,uint256)'](owner.account.address, 1);
    await upgradableNftProxyContract['safeMint(address,uint256)'](owner.account.address, 2);
    await upgradableNftProxyContract['safeMint(address,uint256)'](owner.account.address, 3);
    await upgradableNftProxyContract['safeMint(address,uint256)'](owner.account.address, 4);

    const totalSupply = await upgradableNftProxyContract.totalSupply();
    expect(totalSupply).to.equal(BigInt(5));
  });
});
