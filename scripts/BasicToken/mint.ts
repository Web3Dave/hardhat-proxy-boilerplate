import hre from "hardhat";

import BasicTokenJSON from "../../artifacts/contracts/BasicToken/BasicToken.sol/BasicToken.json"

const DEPLOYED_TOKEN_CONTRACT_ADDRESS = process.env.DEPLOYED_TOKEN_CONTRACT_ADDRESS as `0x${string}`

async function main() {

    if (DEPLOYED_TOKEN_CONTRACT_ADDRESS === undefined || !DEPLOYED_TOKEN_CONTRACT_ADDRESS.startsWith(`0x`)) {
        throw Error("Please first add the DEPLOYED_NFT_CONTRACT_ADDRESS to the .env file")
    }

    console.log(`--- Minting Tokens (${DEPLOYED_TOKEN_CONTRACT_ADDRESS}) ---`)

    const [owner, wallet1] = await hre.viem.getWalletClients();
    const publicClient = await hre.viem.getPublicClient();

    const MINT_ARRAY = [
        [wallet1.account.address, 100000000000],
    ]


    for (let mintArgs of MINT_ARRAY) {

        await owner.writeContract({
            address: DEPLOYED_TOKEN_CONTRACT_ADDRESS,
            abi: BasicTokenJSON.abi,
            functionName: "mint",
            args: mintArgs,
        });

        const tokenUri = await publicClient.readContract({
            address: DEPLOYED_TOKEN_CONTRACT_ADDRESS,
            abi: BasicTokenJSON.abi,
            functionName: "balanceOf",
            args: [mintArgs[0]],
        });

        console.log(`- Minted '${mintArgs[1]}' Tokens to address ${mintArgs[0]}`)
    }

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
