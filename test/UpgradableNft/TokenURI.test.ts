import { expect } from "chai";
import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

import { deployContracts } from "../../helpers/deploy-contracts";
import { viem } from "hardhat";

describe("UpgradableNftExample: TokenURI", function () {

  it("Should return the correct token URI", async function () {
    const [owner] = await viem.getWalletClients();
    const { upgradableNftProxyContract } = await loadFixture(deployContracts);

    const tokenId = 0
    const tokenURI = "https://example.com/uri.json"

    /**
     * Mint NFT
     */
    await upgradableNftProxyContract['safeMint(address,uint256,string)'](owner.account.address, 0, tokenURI);

    // Fetch the token URI from contract
    const fetchedTokenURI = await upgradableNftProxyContract.tokenURI(tokenId);

    expect(fetchedTokenURI).to.equal(tokenURI);
  });

  it("Should revert when querying a non-existent token URI", async function () {
    const { upgradableNftProxyContract } = await loadFixture(deployContracts);

    // Attempt to get the URI of a token that doesn't exist
    await expect(
      upgradableNftProxyContract.tokenURI(0)
    ).to.be.rejected;
  });

});
