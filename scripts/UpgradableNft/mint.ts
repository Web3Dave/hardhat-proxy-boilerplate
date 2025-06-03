import hre from "hardhat";

import CustomNftV1JSON from "../../artifacts/contracts/UpgradableNft/V1/UpgradableNftV1.sol/UpgradableNftV1.json"

const DEPLOYED_NFT_PROXY_CONTRACT_ADDRESS = process.env.DEPLOYED_NFT_PROXY_CONTRACT_ADDRESS as `0x${string}`

async function main() {

    if (DEPLOYED_NFT_PROXY_CONTRACT_ADDRESS === undefined || !DEPLOYED_NFT_PROXY_CONTRACT_ADDRESS.startsWith(`0x`)) {
        throw Error("Please first add the DEPLOYED_NFT_CONTRACT_ADDRESS to the .env file")
    }

    console.log(`--- Minting NFTs (${DEPLOYED_NFT_PROXY_CONTRACT_ADDRESS}) ---`)

    const [owner, wallet1] = await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();

    const NFT_ARRAY = [
        [wallet1.account.address, 0, "https://example.com/uri.json"],
        [wallet1.account.address, 1, "https://example.com/uri.json"]
    ]


    for (let nftArgs of NFT_ARRAY) {

        await owner.writeContract({
            address: DEPLOYED_NFT_PROXY_CONTRACT_ADDRESS,
            abi: CustomNftV1JSON.abi,
            functionName: "safeMint",
            args: nftArgs,
        });

        const tokenUri = await publicClient.readContract({
            address: DEPLOYED_NFT_PROXY_CONTRACT_ADDRESS,
            abi: CustomNftV1JSON.abi,
            functionName: "tokenURI",
            args: [nftArgs[1]],
        });

        console.log(`- Minted Token '${nftArgs[1]}' with URI '${tokenUri}' to address ${nftArgs[0]}`)
    }

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
