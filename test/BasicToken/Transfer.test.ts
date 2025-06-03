import { expect } from "chai";
import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { viem } from "hardhat";
import { deployContracts } from "../../helpers/deploy-contracts";

describe("BasicTokenExample: Transfer", function () {
  it("Should be able to transfer tokens", async function () {
    const [owner, wallet1] = await viem.getWalletClients();
    const { basicTokenContract } = await loadFixture(deployContracts);

    /**
     * Mint tokens
     */
    await basicTokenContract.mint(owner.account.address, 100);

    const firstBalance = await basicTokenContract.balanceOf(wallet1.account.address);

    /**
     * Transfer Tokens
     */

    await basicTokenContract.transfer(wallet1.account.address, 50);

    const secondBalance = await basicTokenContract.balanceOf(wallet1.account.address);

    expect(firstBalance).to.equal(BigInt(0));
    expect(secondBalance).to.equal(BigInt(50));
  });
});
