import { expect } from "chai";
import {
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

import { viem } from "hardhat";
import { deployContracts } from "../../helpers/deploy-contracts";

describe("UpgradableNftExample: Transfer", function () {
    it("Should Be Able to transfer an NFT", async function () {
        const [owner, wallet1] = await viem.getWalletClients();
        const { upgradableNftProxyContract } = await loadFixture(deployContracts);

        const tokenId = 0

        /**
         * Mint NFT
         */

        await upgradableNftProxyContract['safeMint(address,uint256)'](owner.account.address, 0);

        const firstOwner = await upgradableNftProxyContract.ownerOf(tokenId);

        // Transfer
        await upgradableNftProxyContract.transferFrom(owner.account.address, wallet1.account.address, tokenId);

        const secondOwner = await upgradableNftProxyContract.ownerOf(tokenId);

        expect(firstOwner.toString().toLowerCase()).to.equal(owner.account.address.toString().toLowerCase());
        expect(secondOwner.toString().toLowerCase()).to.equal(wallet1.account.address.toString().toLowerCase());
    });

});
