import { ethers, Provider, Signer } from "ethers";
//import type { ethers } from "ethers";
import { FhevmInstance, createInstance} from "fhevmjs";
// import { ethers as hethers } from "hardhat";
export const FHE_LIB_ADDRESS = "0x000000000000000000000000000000000000005d";


// const HARDHAT_NETWORK = process.env.HARDHAT_NETWORK;

let publicKey: string | undefined;
let chainId: number;

export const createFhevmInstance = async (contractAddress: string, account: Signer, provider: Provider) => {
  try {
    const network = await provider.getNetwork();
    chainId = +network.chainId.toString(); // Need to be a number
    try {
      // Get blockchain public key
      const ret = await provider.call({
        to: FHE_LIB_ADDRESS,
        // first four bytes of keccak256('fhePubKey(bytes1)') + 1 byte for library
        data: "0xd9d47bb001",
      });
      const decoded = ethers.AbiCoder.defaultAbiCoder().decode(["bytes"], ret);
      publicKey = decoded[0];
    } catch (e) {
      console.error("Error getting blockchain public key:", e);
      publicKey = undefined;
    }

    if (publicKey) {
      // Return a new Promise
      return new Promise<FhevmInstance>(async (resolve, reject) => {
        // Wait for 2 seconds before creating the instance
        setTimeout(async () => {
          try {
            const instance = await createInstance({ chainId, publicKey: publicKey! });

            try {
              await generatePublicKey(contractAddress, account, instance);
            } catch (e) {
              console.error("Error generating public key:", e);
            }
            // Resolve the Promise with the instance
            resolve(instance);
          } catch (e) {
            // Reject the Promise with the error
            reject(e);
          }
        }, 2000);
      });
    } else {  
      console.error("Public key is undefined");
      throw new Error("Public key is undefined");
    }
    // if (publicKey) {
    //   const instance = await createInstance({ chainId, publicKey });

    //   try {
    //     await generatePublicKey(contractAddress, account, instance);
    //   } catch (e) {
    //     console.error("Error generating public key:", e);
    //   }
    //   return instance;
    // } else {  
    //   console.error("Public key is undefined");
    //   throw new Error("Public key is undefined");
    // }
  } catch (e) {
    console.error("Error creating Fhevm instance:", e);
  }
};

const generatePublicKey = async (contractAddress: string, signer: Signer, instance: FhevmInstance) => {
  try {
    // Generate token to decrypt
    const generatedToken = instance.generatePublicKey({
      verifyingContract: contractAddress,
    });
    // Sign the public key
    const signature = await signer.signTypedData(
      generatedToken.eip712.domain,
      { Reencrypt: generatedToken.eip712.types.Reencrypt }, // Need to remove EIP712Domain from types
      generatedToken.eip712.message,
    );
    instance.setSignature(contractAddress, signature);
  } catch (e) {
    console.error("Error in generatePublicKey:", e);
  }
};

// export const createFhevmInstance = async (contractAddress: string, account: Signer, provider: Provider) => {
//     const network = await provider.getNetwork();
//     chainId = +network.chainId.toString(); // Need to be a number
//     try {
//       // Get blockchain public key
//       const ret = await provider.call({
//         to: FHE_LIB_ADDRESS,
//         // first four bytes of keccak256('fhePubKey(bytes1)') + 1 byte for library
//         data: "0xd9d47bb001",
//       });
//       const decoded = ethers.AbiCoder.defaultAbiCoder().decode(["bytes"], ret);
//       publicKey = decoded[0];
//     } catch (e) {
//       publicKey = undefined;
//     }
  
//     const instance = await createInstance({ chainId, publicKey });
  
//     await generatePublicKey(contractAddress, account, instance);
  
//     return instance;
//   };
  
//   const generatePublicKey = async (contractAddress: string, signer: Signer, instance: FhevmInstance) => {
//     // Generate token to decrypt
//     const generatedToken = instance.generatePublicKey({
//       verifyingContract: contractAddress,
//     });
//     // Sign the public key
//     const signature = await signer.signTypedData(
//       generatedToken.eip712.domain,
//       { Reencrypt: generatedToken.eip712.types.Reencrypt }, // Need to remove EIP712Domain from types
//       generatedToken.eip712.message,
//     );
//     instance.setSignature(contractAddress, signature);
//   };