import { ethers, upgrades } from "hardhat";

export async function upgradeContract({
    upgradeContractName,
    proxyContractAddress
}: {
    upgradeContractName: string,
    proxyContractAddress: any,
}){
    const upgradeContract = await ethers.getContractFactory(upgradeContractName);
    const upgradedContract = await upgrades.upgradeProxy(proxyContractAddress, upgradeContract);

    return upgradedContract;
}