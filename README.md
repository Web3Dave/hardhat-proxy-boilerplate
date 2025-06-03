# Hardhat Proxy Boilerplate

This project demonstrates the following common contracts, patterns and libraries along with their associated tests, deployment modules and scripts:

## BasicToken
A basic ERC20 token contract utilizing openzeppelin contracts.

## UpgradableNft
A customized ERC721 NFT smart contract that is upgradable, utilizing openzeppelin contracts along with an example implementation of the upgraded contract, along with deployment modules.

# Prerequisites

- Node `>=20.0.0`
- Yarn `>=1.22.0`

### Env File (create `.env` from `.env.example`)
- `INFURA_KEY`: You can get an Infura key from [infura.io](https://infura.io/)
- `POLYGONSCAN_API_KEY`: You can get a Polygonscan API key from [polyscan.com](https://polygonscan.com)

- `TESTNET_OWNER_PRIVATE` and `TESTNET_WALLET_1_PRIVATE`:
 - You can generate wallets using many different tools. A common tool is [https://vanity-eth.tk/](https://vanity-eth.tk/)

    - Click `Generate` -> Press `Private key: Click to reveal` -> Paste private key into `.env` file.
 
    - For extra security disconnect wifi or download local version before generating if you are using this wallet for a mainnet.


# Networks

## Running a local network

To run your own local EVM blockchain for test deployments etc run:
```shell
npx hardhat node
```

## Testnet Amoy

This project uses the Amoy testnet, which is a testnet for Polygon. You can use a [faucet](https://faucet.polygon.technology/) to topup your wallet and deploy to the testnet.

## Mainnet Polygon

This project uses the Amoy testnet, which is a testnet for Polygon. You can use a [faucet](https://faucet.polygon.technology/) to topup your wallet and deploy to the testnet.

# Compiling and Testing
When developing smart contracts you write tests to test the functionality of your contracts and as a way of interfacing with the contracts during development.

Each time you make a change to your smart contract:
- Write tests for the functionality you are adding `/test/.`
- Make the changes in the contract `/contracts/.`

Once you are ready, recompile the contracts and run the tests using:
```
npx hardhat compile && npx hardhat test
```

# Deploying

Hardhat has a builtin system for managing deployments called ignition. You write modules for each set of deployment steps and run them incrementally.

For example, `0_FirstDeploymentSteps.ts` and then `1_SecondDeploymentSteps.ts`

When deploying a contract be sure to define the network for example `--network localhost`.

The networks configured in this repo are:
- `localhost` - a local network
- `amoy` - testnet network for polygon
- `polygon` - the mainnet for polygon

## Deploying BasicToken

Deploy the BasicToken:
```shell
npx hardhat ignition deploy ./ignition/modules/BasicToken/0_BasicToken.ts --network <network>
```

## Deploying UpgradableNft

Deploy the UpgradableNftV1 with the Proxy Contract:
```shell
npx hardhat ignition deploy ./ignition/modules/UpgradableNft/0_UpgradableNftProxy.ts --network <network>
```

Upgrade the proxy contract to UpgradableNftV2:
```shell
npx hardhat ignition deploy ./ignition/modules/UpgradableNft/UpgradeV2/1_UpgradableNftV2.ts --network <network> &&
npx hardhat ignition deploy ./ignition/modules/UpgradableNft/UpgradeV2/2_UpgradableNftV2_Upgrade.ts --network <network>
```

## Locating Deployed Contract Addresses

The addresses are displayed in the console once deployed and can be located in the `deployed_addresses.json` file of `ignition/deployments/chain-<chain_id>`

# Verifying

After deploying to a network that contains an explorer. For example [Polygon Amoy](https://amoy.polygonscan.com/) or [Polygon Mainnet](https://polygonscan.com/) you can verify your contract. This means submitting the contract code to the explorer so that it can be used to verify the contract's bytecode. Once a contracts source code is verified you can interact with it on the explorer by connecting your wallet.

- See [Documentation](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify#usage)

## Verify BasicToken

### Values:

- `<network>`: The network you deployed the contract to (must be a network that contains an explorer, for example `amoy` or `polygon`)

- `<owner_address>`: The address that the contract was initialized with (in this case the owner address)

- `<contract_address>`: The deployed contract address

  - See `BasicToken#BasicToken` of `deployed_addresses.json`

### Run:

```shell
`npx hardhat verify  --network <network> <contract_address> <owner_address>`
```

## Verify UpgradableNft

### Values:

- `<network>`: The network you deployed the contract to (must be a network that contains an explorer, for example `amoy` or `polygon`)

- `<owner_address>`: The address that the contract was initialized with (in this case the owner address)

- `<proxy_admin_contract>`: The proxy admin contract (contract that can upgrade the proxy contract)

  - See `UpgradableNftProxy#UpgradableNftV1` of `deployed_addresses.json`

- See `<implementation_contract>`: The contract containing the main logic (not the proxy contract)

  - See `UpgradableNftProxy#UpgradableNftV1` of `deployed_addresses.json`
  or `UpgradableNftV2#UpgradableNftV2` (if you want to verify the upgraded implementation contract)

### Run: 

1. Verify Implementation Contract
`npx hardhat verify --network <network> <implementation_contract>`

2. Verify Proxy Admin
`npx hardhat verify  --network <network> <proxy_admin_contract> <owner_address>`

3. Verify Proxy
`npx hardhat verify  --network <network> <proxy_admin_contract> <implementation_address> <owner_address> 0x`

# Running Scripts

You can run scripts to interact with the contracts once they are deployed. Unlike modules, the result is not saved in your project and you can easily re-run them.

## BasicToken - Mint Tokens to `Wallet 1`

```shell
npx hardhat run scripts/BasicToken/mint.ts --network <network>
```

## UpgradableNft - Mint NFTs to `Wallet 1`

```shell
npx hardhat run scripts/UpgradableNft/mint.ts --network <network>
```

# Additional Resources

## Hardhat

Documentation [here](https://hardhat.org/docs)

## Openzeppelin
For extending openzeppelin contracts, checkout:

- [Documentation](https://docs.openzeppelin.com/contracts/5.x/)
- [Contracts wizard](https://docs.openzeppelin.com/contracts/5.x/wizard)

Also see:

- [Access control API](https://docs.openzeppelin.com/contracts/5.x/api/access)