import { buildModule } from "@nomicfoundation/ignition-core";

const upgradableNftV2Module = buildModule("UpgradableNftV2", (m) => {

  // Deploy implementation (no proxy)
  const upgradableNftV2 = m.contract("UpgradableNftV2", [], {
    id: "UpgradableNftV2",
  });

  return {
    upgradableNftV2,
  };
});

export default upgradableNftV2Module; 