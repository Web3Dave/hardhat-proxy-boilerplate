export function uint256ToString(value: bigint) {
    if (value === 0n) return "0";
  
    const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ._";
    let result = "";
  
    while (value > 0n) {
      const remainder = value % 38n;
      result = alphabet[Number(remainder)] + result;
      value = value / 38n;
    }
  
    return result;
  }