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
    signerAdress: string,
}

export const AccessConfidentialData : React.FC<AccessConfidentialDataProps> = ( {instance, tokenId, publicKey, signature, signerAdress} ) => {
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
        account: `0x${signerAdress.substring(2)}`
      })
      //const clearData = reencryptedData ? 
      //instance.decrypt('0xF161F15261233Db423ba1D12eDcc086fa37AF4f3',reencryptedData as string) as unknown as string: ""


      return (
        <div>
        {reencryptedData as string && <div> Clear Data: {String(instance.decrypt('0xF161F15261233Db423ba1D12eDcc086fa37AF4f3',reencryptedData as string))} </div>} 
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
