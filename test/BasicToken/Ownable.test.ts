import { expect } from "chai";
import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { getAddress } from "viem";

import { viem } from "hardhat";
import { deployContracts } from "../../helpers/deploy-contracts";


describe("BasicTokenExample: Ownable", function () {

  it("Should set the owner", async function () {
    const [owner] = await viem.getWalletClients();
    const { basicTokenContract } = await loadFixture(deployContracts);

    expect(await basicTokenContract.owner()).to.equal(
      getAddress(owner.account.address)
    );
  });


});
