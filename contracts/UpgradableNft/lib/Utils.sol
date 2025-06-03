// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

/**
 * @title Utils
 * @notice Example Utils Contract - This example allows you to convert a tokenId into a base36 string representation
 */
contract Utils {
    // Converts a uint256 to a base-38 string (numbers + uppercase letters + '_')
    function getStringId(uint256 value) internal pure returns (string memory) {
        bytes memory alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ._"; // Base-38 alphabet
        bytes memory result = new bytes(64); // Max size for base-38 of uint256
        uint256 length = 0;

        // Handle zero case
        if (value == 0) {
            return "0";
        }

        // Convert to base-38
        while (value != 0) {
            result[length++] = alphabet[value % 38]; // Use modulus 38 for base-38
            value /= 38; // Divide by 38
        }

        // Reverse the result
        bytes memory reversed = new bytes(length);
        for (uint256 i = 0; i < length; i++) {
            reversed[i] = result[length - i - 1];
        }

        return string(reversed);
    }

    // Converts a base-38 string (numbers + uppercase letters + '_') to uint256
    function getTokenId(string memory str) internal pure returns (uint256) {
        bytes memory input = bytes(str);
        bytes memory alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ._"; // Base-38 alphabet
        uint256 base = 38;
        uint256 result = 0;

        for (uint256 i = 0; i < input.length; i++) {
            uint256 value = 0;
            bool found = false;

            // Find the numeric value of the current character in the base-38 alphabet
            for (uint256 j = 0; j < alphabet.length; j++) {
                if (input[i] == alphabet[j]) {
                    value = j;
                    found = true;
                    break;
                }
            }

            require(found, "Invalid character in input string"); // Handle invalid characters
            result = result * base + value; // Add the value to the result
        }

        return result;
    }
}
