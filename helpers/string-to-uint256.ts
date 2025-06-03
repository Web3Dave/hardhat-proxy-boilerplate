export function stringToUint256(base38String: string) {
    const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ._";
    let value = 0n;
  
    for (let i = 0; i < base38String.length; i++) {
      const char = base38String[i];
      const digit = BigInt(alphabet.indexOf(char));
      if (digit < 0n) {
        throw new Error(`Invalid character "${char}" in Base-38 string`);
      }
      value = value * 38n + digit;
    }

    return value;
  }