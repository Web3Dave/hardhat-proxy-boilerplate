import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const basicTokenModule = buildModule("BasicToken", (m) => {

    // Accounts
    const owner = m.getAccount(0);

    // Deploy the contract
    const basicToken = m.contract("BasicToken", [owner]);

    return {
        basicToken,
    };
});

export default basicTokenModule;