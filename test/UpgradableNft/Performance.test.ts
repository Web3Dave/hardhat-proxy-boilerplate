import {
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import hre from "hardhat";
import { deployContracts } from "../../helpers/deploy-contracts";
import { viem } from "hardhat";

describe("UpgradableNftExample: Performance", function () {

    it("Example of associated gas costs", async function () {
        const [owner] = await viem.getWalletClients();
        const { upgradableNftProxyContract } = await loadFixture(deployContracts);

        /**
        * Mint NFT without URI
        */

        console.log("--- Minting Without URI")

        const noUriMintTx = await upgradableNftProxyContract['safeMint(address,uint256)'](owner.account.address, 0);

        const noUriTransactionCost = await returnGasCosts(noUriMintTx);

        console.log("Gas Distribution:", noUriTransactionCost); // To see the entire trace
        console.log("Est Gas Price:", noUriTransactionCost.TOTAL_POL)

        /**
        * Mint NFT without URI
        */

        console.log("--- Minting With URI")

        const uriMintTx = await upgradableNftProxyContract['safeMint(address,uint256,string)'](owner.account.address, 1, "https://example.com.uri.json");

        const uriTransactionCost = await returnGasCosts(uriMintTx);

        console.log("Gas Distribution:", uriTransactionCost); // To see the entire trace
        console.log("Est Gas Price:", uriTransactionCost.TOTAL_POL)

    });

});

async function returnGasCosts(tx: any) {
    const trace = await hre.network.provider.send('debug_traceTransaction', [tx.hash]);

    const totalGasUsed = {
        SSTORE: 0,
        SLOTS: 0,
        OTHER: 0,
        PROXY: 0,
        TOTAL: trace.gas,
        TOTAL_POL: gasToPol(trace.gas)
    }

    // Iterate through the logs and calculate gas used per operation
    for (let i = 0; i < trace.structLogs.length - 1; i++) {
        const gasBefore = trace.structLogs[i].gas;
        const gasAfter = trace.structLogs[i + 1].gas;

        // Calculate the gas used for this operation
        const gasUsed = gasBefore - gasAfter;
        if (trace.structLogs[i].op === "SSTORE") {
            totalGasUsed.SSTORE = totalGasUsed.SSTORE + gasUsed;
            totalGasUsed.SLOTS++
        }
        else totalGasUsed.OTHER = totalGasUsed.OTHER + gasUsed
        // totalGasUsed += gasUsed;
    }
    totalGasUsed.PROXY = trace.gas - (totalGasUsed.SSTORE + totalGasUsed.OTHER)
    return totalGasUsed
}

function gasToPol(gas: number) {
    const costGwei = 26
    return gas * (costGwei / 1000000000)
}