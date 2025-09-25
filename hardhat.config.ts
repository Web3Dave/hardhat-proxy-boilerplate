import '@openzeppelin/hardhat-upgrades'
import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import "@nomicfoundation/hardhat-verify";

import * as dotenv from "dotenv"
dotenv.config();

const config: HardhatUserConfig = {
  defaultNetwork: "localhost",
  solidity: {
    version: "0.8.22",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // Default Hardhat network
    hardhat: {
      accounts: [
        { privateKey: process.env.TESTNET_OWNER_PRIVATE as string, balance: "10000000000000000000000" },
        { privateKey: process.env.TESTNET_WALLET_1_PRIVATE as string, balance: "10000000000000000000000" },
      ],
    },
    // Local Hardhat network
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    // Polygon Testnet
    amoy: {
      url: `https://polygon-amoy.infura.io/v3/${process.env.INFURA_KEY}`,
      chainId: 80002,
      accounts: [process.env.TESTNET_OWNER_PRIVATE as string, process.env.TESTNET_WALLET_1_PRIVATE as string], // Private keys for your wallets
    },
    // Polygon Mainnet
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
      chainId: 137,
      accounts: [process.env.MAINNET_OWNER_PRIVATE as string, process.env.MAINNET_WALLET_1_PRIVATE as string], // Private keys for your wallets
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY || "",
  },
  sourcify: {
    enabled: true
  }
};

export default config;
