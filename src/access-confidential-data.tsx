import { FhevmInstance } from 'fhevmjs'
import * as React from 'react'
import { 
    type BaseError, 
    useWaitForTransactionReceipt,
    type UseReadContractReturnType, 
    useReadContract 
  } from 'wagmi'
  import { abi } from './abi'
import { ethers } from 'ethers';

interface AccessConfidentialDataProps {
    instance: FhevmInstance;
    tokenId: string,
    publicKey: Uint8Array,
    signature: string,
    signerAddress: string,
}

export const AccessConfidentialData : React.FC<AccessConfidentialDataProps> = ( {instance, tokenId, publicKey, signature, signerAddress} ) => {
    const { 
        data: reencryptedData,
        error,   
        isPending,
      } : UseReadContractReturnType = useReadContract({
        abi,
        address: '0xF161F15261233Db423ba1D12eDcc086fa37AF4f3',
        functionName: 'getConfidentialData',
        args: [BigInt(tokenId),
                bytesToString(publicKey), 
                `0x${signature.substring(2)}`,],
        account: `0x${signerAddress.substring(2)}`
      })
      //const clearData = reencryptedData ? 
      //instance.decrypt('0xF161F15261233Db423ba1D12eDcc086fa37AF4f3',reencryptedData as string) as unknown as string: ""

    function decryptAndCombineEuint64Array(encryptedData: string[]): bigint {
      return [...encryptedData].reverse().reduce((combined, data) => {
        const decrypted = instance.decrypt('0xF161F15261233Db423ba1D12eDcc086fa37AF4f3', data);
        return (combined << BigInt(64)) + decrypted;
      }, BigInt(0));
    }

      // function decryptAndCombineEuint64Array(encryptedData: string[]): bigint {
      //   let combined = BigInt(0);
      //   for (let i = encryptedData.length -1 ; i >= 0 ; i--) {
      //       const decrypted = instance.decrypt('0xF161F15261233Db423ba1D12eDcc086fa37AF4f3', encryptedData[i]);
      //       combined = (combined << BigInt(64)) + BigInt(decrypted);
      //   }
      //   return combined;
      // }

      return (
        <div>
        {reencryptedData as string && <div> Clear Data: {decryptAndCombineEuint64Array(reencryptedData as string[]).toString(16)} </div>} 
        {isPending && <div>Loading...</div>}
        {error && <div>Error: {(error as unknown as BaseError).details || error.message}</div>}
        </div>
      )

    //   if (isPending) return <div>Loading...</div> 

    //   if (error) 
    //     return ( 
    //       <div> 
    //         Error: {(error as unknown as BaseError).shortMessage || error.message} 
    //       </div> 
    //     )  
    
    //   return (
    //     <div>Balance: {balance?.toString()}</div>
    //   )
} 
function bytesToString(byteArray: Uint8Array): `0x${string}` {
    return  `0x${Array.from(byteArray, byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('')}`;
}
