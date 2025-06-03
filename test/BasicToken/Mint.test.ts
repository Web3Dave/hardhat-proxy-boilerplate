import { expect } from "chai";
import {
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { viem } from "hardhat";
import { deployContracts } from "../../helpers/deploy-contracts";

describe("BasicTokenExample: Mint", function () {
    it("Should be able to mint tokens", async function () {
        const [owner] = await viem.getWalletClients();
        const { basicTokenContract } = await loadFixture(deployContracts);

        /**
         * Mint tokens
         */
        await basicTokenContract.mint(owner.account.address, 100);

        const totalSupply = await basicTokenContract.totalSupply();
        expect(totalSupply).to.equal(BigInt(100));
    });
});
